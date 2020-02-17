FROM node:12.14.0-alpine as base

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY public public
COPY src src

CMD ["npm", "run", "start"]
