FROM node:14-alpine as builder

WORKDIR /tmp/website

COPY package.json .
COPY yarn.lock .

RUN yarn && apk add --no-cache make

COPY . .

ARG MODE=production

RUN make ${MODE}

FROM golang:1.17.2-alpine as server

WORKDIR /tmp/server

RUN apk add --no-cache make

COPY server/* .

ARG BUILDER
ARG VERSION

ENV FS_BUILDER=${BUILDER}
ENV FS_VERSION=${VERSION}

RUN make

FROM alpine:latest

WORKDIR /app

COPY --from=builder /tmp/website/dist /app/public
COPY --from=server /tmp/server/bin/server /app/server

ENTRYPOINT ["./server"]
