FROM node:18-alpine

WORKDIR /app_server

COPY package.json .

RUN npm install

COPY . .

RUN apk add --no-cache bash

EXPOSE 3001

CMD ["npm", "start"]
