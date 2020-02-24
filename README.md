# 01_UI
## Scope and aims of the 01 project
- To create a frame project which encompasses a 'true' end to end development with production/scaling ready code, infra and archetecture
- Acceptance criteria:
    1. React application with all the benefits of CRA plus:
        1. client-side routing
        1. auth routes (guest-first-approach)
        1. SEO optimisation
        1. style theming and layouting
        1. e2e and API testing (local and in ci)
        1. unit testing (local and in ci)
        1. linting (local and in ci)
        1. dockerised (local and in ci)
        1. all dependencies and env vars passed through top level of app and provided via context
        1. has it's own repo (01_ui)
        1. all api calls have mocks controlled via env var
        1. responsive design
        1. onboarding/tutorial mechanic
        1. translation-ready
        1. accessible
        1. text content and images and svg icons are served by cdn
        1. error boundaries
        1. error logging via, for example, Sentry
        1. tracking
        1. has 3 main branches plus 'story' branches:
            - master
            - develop_static (up-to-date with master plus Gatsby, for example)
            - develop_ssr (up-to-date with master plus ssr)
    1. auth service
    1. tracking service
    1. API
    1. user service
        1. has own database
    1. entity service
        1. has own database
        1. has caching (for example Redis)
        
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
- go to https://docs.docker.com/docker-for-mac/install/ and install docker client
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

- go to https://www.virtualbox.org/wiki/Downloads and install the latest
  # https://kubernetes.io/docs/tasks/tools/install-minikube/
    brew install kubectl
    kubectl version --client
    brew install minikube
    minikube start --vm-driver=virtualbox
    minikube status
  # should get:
    # host: Running
    # kubelet: Running
    # apiserver: Running
    # kubeconfig: Configured
    kubectl create deployment hello-minikube --image=k8s.gcr.io/echoserver:1.10
    # deployment.apps/hello-minikube created
    kubectl expose deployment hello-minikube --type=NodePort --port=8080
    # service/hello-minikube exposed
    kubectl get pod
    # hello-minikube-3383150820-vctvh   0/1       ContainerCreating   0          3s
    minikube service hello-minikube --url
    # paste the url into the browser to view the service info 
    minikube dashboard
    