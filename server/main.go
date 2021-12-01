package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"os/signal"
	"path"
	"strings"
	"syscall"

	"github.com/valyala/fasthttp"
	"github.com/valyala/fasttemplate"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const MetaTags = `<meta name="og:description" content="%s"><meta name="og:image" content="%s"><meta name="og:image:type" content="%s"><meta name="theme-color" content="#0288D1"><link type="application/json+oembed" href="%s">`

type GQLEmoteResponse struct {
	Data struct {
		Emote struct {
			Name  string `json:"name"`
			Owner struct {
				DisplayName string `json:"display_name"`
			} `json:"owner"`
			Links        [][]string `json:"links"`
			Animated     bool       `json:"animated"`
			ChannelCount int32      `json:"channel_count"`
		} `json:"emote"`
	} `json:"data"`
}

type OEmbedData struct {
	AuthorName   string `json:"author_name"`
	AuthorURL    string `json:"author_url"`
	ProviderName string `json:"provider_name"`
	ProviderURL  string `json:"provider_url"`
	Type         string `json:"type"`
	URL          string `json:"url"`
}

func main() {
	root := os.Getenv("FS_ROOT")
	if root == "" {
		root = "./public"
	}

	gqlApiURL := os.Getenv("GQL_API_URL")
	websiteURL := os.Getenv("WEBSITE_URL")

	// Setup FS handler
	fs := &fasthttp.FS{
		Root: root,
	}

	index, err := os.ReadFile(path.Join(root, "index.html"))
	if err != nil {
		panic(err)
	}

	template := fasttemplate.New(string(index), "{{", "}}")

	addr := "0.0.0.0:3000"

	// Start HTTP server.
	log.Printf("Starting HTTP server on %q\n", addr)
	go func() {
		handler := fs.NewRequestHandler()
		if err := fasthttp.ListenAndServe(addr, func(ctx *fasthttp.RequestCtx) {
			pth := string(ctx.Path())
			if strings.HasPrefix(pth, "/assets/") {
				handler(ctx)
			} else {
				if strings.HasPrefix(pth, "/emotes/") {
					id := strings.Split(strings.TrimPrefix(pth, "/emotes/"), "?")[0]
					emoteID, err := primitive.ObjectIDFromHex(id)
					if err == nil {
						// handle emote route
						query := url.Values{}
						query.Set("query", fmt.Sprintf(`{emote(id:"%s"){name owner{display_name} links animated channel_count}}`, emoteID.Hex()))

						req, err := http.NewRequestWithContext(ctx, "GET", fmt.Sprintf("%s?%s", gqlApiURL, query.Encode()), nil)
						if err == nil {
							resp, err := http.DefaultClient.Do(req)
							if err == nil {
								defer resp.Body.Close()
								data, err := ioutil.ReadAll(resp.Body)
								if err == nil {
									gqlResp := GQLEmoteResponse{}
									if err := json.Unmarshal(data, &gqlResp); err == nil {
										emote := gqlResp.Data.Emote
										bigURL := ""
										for _, link := range emote.Links {
											if link[0] == "4" {
												bigURL = link[1]
											}
										}
										if bigURL != "" {
											imageType := ""
											if emote.Animated {
												bigURL += ".gif"
												imageType = "image/gif"
											} else {
												bigURL += ".webp"
												imageType = "image/webp"
											}

											oembed, _ := json.Marshal(OEmbedData{
												AuthorName:   fmt.Sprintf("%s by %s (%d Channels)", emote.Name, emote.Owner.DisplayName, emote.ChannelCount),
												AuthorURL:    fmt.Sprintf("%s/emotes/%s", websiteURL, emoteID.Hex()),
												ProviderName: "7TV.APP - It's like a third party thing",
												ProviderURL:  websiteURL,
												Type:         "image",
												URL:          bigURL,
											})

											obj := base64.StdEncoding.EncodeToString(oembed)

											ctx.Response.Header.Set("Content-Type", "text/html; charset=utf-8")
											ctx.SetBodyString(template.ExecuteString(map[string]interface{}{
												"META": fmt.Sprintf(MetaTags,
													fmt.Sprintf("uploaded by %s", emote.Owner.DisplayName), // og:description
													bigURL,    // og:image
													imageType, // og:image:type
													fmt.Sprintf("%s/services/oembed/%s.json", websiteURL, obj), // oembed url
												),
											}))
											return
										} else {
											log.Printf("unable to get big link")
										}
									} else {
										log.Printf("failed to unmarshal response: %e\n", err)
									}
								} else {
									log.Printf("failed to read response: %e\n", err)
								}
							} else {
								log.Printf("failed to do request: %e\n", err)
							}
						} else {
							log.Printf("failed to make request: %e\n", err)
						}
					}
				} else if strings.HasPrefix(pth, "/services/oembed/") && strings.HasSuffix(pth, ".json") {
					out, err := base64.StdEncoding.DecodeString(strings.TrimSuffix(strings.TrimPrefix(pth, "/services/oembed/"), ".json"))
					if err == nil {
						data := OEmbedData{}
						if err = json.Unmarshal(out, &data); err == nil {
							out, _ = json.Marshal(data)
							ctx.Response.Header.Set("Content-Type", "application/json; charset=utf-8")
							ctx.SetBody(out)
							return
						}

					}

					ctx.SetStatusCode(404)
					return
				}

				ctx.Response.Header.Set("Content-Type", "text/html; charset=utf-8")
				ctx.SetBodyString(template.ExecuteString(map[string]interface{}{
					"META": "",
				}))
			}
		}); err != nil {
			log.Fatalf("error in ListenAndServe: %s", err)
		}
	}()

	log.Printf("Serving files from directory %s\n", root)

	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGINT, syscall.SIGTERM)

	// Wait forever.
	<-sig
}
