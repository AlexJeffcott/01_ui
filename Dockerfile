FROM node:12.16.1-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY public public
COPY src src
CMD ["npm", "run", "start"]
