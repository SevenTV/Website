FROM node:18 as node-builder
	WORKDIR /tmp/build

	COPY package.json .
	COPY yarn.lock .

	RUN yarn && apk add --no-cache make

	COPY . .

	ARG MODE=production

	RUN make ${MODE}

FROM golang:1.18.1 as go-builder
	WORKDIR /tmp/build

	RUN apt-get update && \
        apt-get install -y \
            build-essential \
            make \
            git && \
        apt-get autoremove -y && \
        apt-get clean -y && \
        rm -rf /var/cache/apt/archives /var/lib/apt/lists/*

	COPY server/* .

	ARG BUILDER
	ARG VERSION

	ENV FS_BUILDER=${BUILDER}
	ENV FS_VERSION=${VERSION}

	RUN make

FROM ubuntu:21.10 as final
	WORKDIR /app

	COPY --from=node-builder /tmp/build/dist /app/public
	COPY --from=go-builder /tmp/build/out/server /app/server

	ENTRYPOINT ["./server"]
