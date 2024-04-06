FROM oven/bun:1

RUN apt update
RUN apt -y upgrade

RUN apt install -y git

WORKDIR /app

ENTRYPOINT ["bun"]