.PHONY: build lint deps dev_deps test

build:
	GOOS=linux GOARCH=amd64 go build -v -o out/server .

lint:
	golangci-lint run

deps:
	go mod download

dev_deps:
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@v1.50.0

test:
	go test -count=1 -cover ./...
