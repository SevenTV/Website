FROM ubuntu:20.04 as final
WORKDIR /app

COPY dist public
COPY server/out/server .

ENTRYPOINT ["./server"]
