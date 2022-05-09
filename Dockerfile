FROM node:18 as node-builder
	WORKDIR /tmp/website

	COPY package.json .
	COPY yarn.lock .

	RUN yarn && apk add --no-cache make

	COPY . .

	ARG MODE=production

	RUN make ${MODE}

FROM golang:1.18.1 as go-builder
	WORKDIR /tmp/server

	RUN apk add --no-cache make

	COPY server/* .

	ARG BUILDER
	ARG VERSION

	ENV FS_BUILDER=${BUILDER}
	ENV FS_VERSION=${VERSION}

	RUN make

FROM ubuntu:21.10 as final
	WORKDIR /app

	COPY --from=node-builder /tmp/website/dist /app/public
	COPY --from=go-builder /tmp/server/bin/server /app/server

	ENTRYPOINT ["./server"]
