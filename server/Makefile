all: linux

BUILDER := "unknown"
VERSION := "unknown"

ifeq ($(origin FS_BUILDER),undefined)
	BUILDER = $(shell git config --get user.name);
else
	BUILDER = ${FS_BUILDER};
endif

ifeq ($(origin FS_VERSION),undefined)
	VERSION = $(shell git rev-parse HEAD);
else
	VERSION = ${FS_VERSION};
endif

linux:
	GOOS=linux GOARCH=amd64 go build -v -ldflags "-X 'main.Version=${VERSION}' -X 'main.Unix=$(shell date +%s)' -X 'main.User=${BUILDER}'" -o bin/server .

lint:
	staticcheck ./...
	go vet ./...
	golangci-lint run

deps:
	go mod download
	go install honnef.co/go/tools/cmd/staticcheck@latest
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest

test:
	go test -count=1 -cover ./...
