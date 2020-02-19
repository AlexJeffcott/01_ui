# 01_UI

## This is the web UI part of project 01

## Steps to reproduce
1. Create the project
	```bash
	npx create-react-app 01_ui
	```
2. Setup Docker
    ```bash
    touch .dockerignore
    echo "node_modules" >> .dockerignore
    vim Dockerfile
    ```
- add the following contents and save with :wq
  ```bash
    FROM node:12.14.0-alpine
    WORKDIR /app 
    COPY package.json package-lock.json ./
    RUN npm install
    COPY public public
    COPY src src
    CMD ["npm", "run", "start"]
  ```
    ```bash
    vim dockerfile-compose.yml
    ```
- add the following contents and save with :wq
  ```bash
    version: "0.1"
    services:
      01_ui_eu:
        build:
          context: .
        image: "01_ui"
        ports:
          - "3000:3000"
        environment:
          REACT_APP_LOCALE: "eu"
      01_ui_us:
        build:
          context: .
        image: "01_ui"
        ports:
          - "3001:3000"
        environment:
          REACT_APP_LOCALE: "us"
  ```
  - replace the "eject" script wit the following scripts in package.json

  ```bash
    "docker:build:eu": "docker-compose --file docker-compose.yml build 01_ui_eu",
    "docker:run:eu": "docker-compose up 01_ui_eu",
    "docker:build:us": "docker-compose --file docker-compose.yml build 01_ui_us",
    "docker:run:us": "docker-compose up 01_ui_us"
  ```

- then run
  ```bash
    rm -r node_modules
    docker:build:eu
    docker:run:eu
  ```
- open localhost:3000

