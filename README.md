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
    touch Dockerfile
    ```
- add the following contents and save with :wq

  ```bash
    # base image
    FROM node:12.2.0-alpine

    # set working directory
    WORKDIR /app

    # add `/app/node_modules/.bin` to $PATH
    ENV PATH /app/node_modules/.bin:$PATH

    # install and cache app dependencies
    COPY package.json /app/package.json
    RUN npm install --silent
    RUN npm install react-scripts@3.0.1 -g --silent

    # start app
    CMD ["npm", "start"]
  ```

  - replace the "eject" script wit the following scripts in package.json

  ```bash
    "docker:build": "docker build -t dockerisedcrats:dev .",
    "docker:run": "docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm dockerisedcrats:dev"
  ```

- then run
  ```bash
    rm -r node_modules
    npm run docker:build
  ```
- open localhost:3001

