# 01_UI

## This is the web UI part of project 01
### Pre-requestites
- install the following if you haven't yet
    ```bash
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    brew doctor
    touch ~/.bash_profile
    brew install node
    source ~/.bash_profile
    sudo npm i n -g
    brew install git
    brew install hub
    cp /Library/Developer/CommandLineTools/usr/share/git-core/git-completion.bash ~/.git_completion.bash
    cp /Library/Developer/CommandLineTools/usr/share/git-core/git-prompt.sh ~/.git_prompt.sh
    ```
- add the following to ~/.bash_profile
    ```bash
    source ~/.git_completion.bash
    source ~/.git_prompt.sh
    if [ -f /path/to/hub.bash_completion ]; then
      . /path/to/hub.bash_completion
    fi
    GIT_PS1_SHOWDIRTYSTATE=1
    GIT_PS1_SHOWUPSTREAM="auto"
    GIT_PS1_SHOWCOLORHINTS=1
    GIT_PS1_STATESEPARATOR=" "
    PROMPT_COMMAND='__git_ps1 "\[\033[3;36m\]\W\[\033[0;30m\]" " ""\[\033[0;35m\]"'
    ```
- check to see what ssh files you have
  ```bash
  ls -al ~/.ssh
  ```
- if you have a id_rsa.pub then go to 4, else generate one with the following
  ```bash
  ssh-keygen -t rsa -b 4096
  enter
  enter
  enter
  ```
- Add ssh key to your user agent
  ```bash
  eval "\$(ssh-agent -s)"
  ssh-add -K ~/.ssh/id_rsa
  ```
- add the key to github as per [this](https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account) then do the following
  ```bash
  ssh -T git@github.com
  yes
  ```
  If the above gives you an auth error then you may need to add a personal access token to your github account (settings/developer settings/personal access tokens).
  
  
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
    ```yaml
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
    ```yaml
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

- check it works by opening localhost:3000 in your browser.

- put it in a github repo
    ```bash
    hub create
    git push -u origin HEAD
    ```
