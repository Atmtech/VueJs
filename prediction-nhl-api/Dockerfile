FROM alpine:3.11
RUN apk add --update nodejs npm bash
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]


# FROM node:13
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 8080
# CMD [ "node", "server.js" ]
