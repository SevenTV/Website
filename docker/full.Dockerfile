FROM node:18 as node-builder
	WORKDIR /tmp/build
	ARG FA_TOKEN="<none>"
	ENV FA_TOKEN=${FA_TOKEN}

	COPY package.json .
	COPY yarn.lock .

	RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
	RUN npm config set '//npm.fontawesome.com/:_authToken' $(echo ${FA_TOKEN})

	RUN yarn && apt-get update && \
        apt-get install -y \
            make && \
        apt-get autoremove -y && \
        apt-get clean -y && \
        rm -rf /var/cache/apt/archives /var/lib/apt/lists/*

	COPY . .
	ARG MODE=production

	RUN make ${MODE}

FROM golang:1.18.3 as go-builder
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

	RUN make

FROM ubuntu:22.04 as final
	WORKDIR /app

	COPY --from=node-builder /tmp/build/dist /app/public
	COPY --from=go-builder /tmp/build/out/server /app/server

	ENTRYPOINT ["./server"]
