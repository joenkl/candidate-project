## Setup

In order to get the basic setup we have provided a shell script to install packages and setup MongoDB. You can run the following script in your shell:

```sh
sh setup.sh
```

### Prerequisites

You should have the following installed on your machine:

- Golang (version 1.14.4 preferably)
- Node (version 12 preferably)
- Docker

### Overview

Provided in the repo are found different sub-folders of importance:

- client
- server-go
- server-js


The `client` folder is the front-end, which is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The `server-js` folder is the server, which is bootstrapped with [Express](https://expressjs.com/), that runs on port `8000` and will connect to MongoDB on `localhost:27017` (which is set up with docker). This contains some pre-existing data that is stored in the `data` folder.

The `server-go` folder is the server, which is bootstrapped with [ Gin-Gonic](https://github.com/gin-gonic/gin), that runs on port `8000` and will connect to MongoDB on `localhost:27017` (which is set up with docker). This contains some pre-existing data that is stored in the `data` folder.


### To be done before interview

Before the interview, please go ahead with running the setup script.

In order to validate that you are properly setup after running the setup script you can perform the following steps:

- Open two terminal windows (one for the client, one for the server)
- NOTE: You will be asked to pick either the Go or JS server as part of the coding practice. It's your choice.

Window 1: (if Go)
```sh
cd server-go
./server-go
```

Window 1: (if JS)
```sh
cd server-js
npm start
```

Window 2:
```sh
cd client
npm run start
```

At this point you should have a server running on port `localhost:8000` and a client running on `localhost:3000`

You should now be able to navigate to `localhost:3000/` in your browser. The browsers console should print the resutl from the health endpoint if everything is working

### Go installation for Mac
    
 Install Golang  
    ```sh 
        brew update 
    ```
    ```sh 
        brew install go
    ```
 Copy and Paste the following environment values to ~/.bash_profile 
    ```sh
        export GOPATH=$HOME/go 
    ```    
    ```sh 
        export GOROOT=/usr/local/opt/go/libexec
    ```
    ```sh
        export PATH=$PATH:$GOPATH/bin
    ```
    ```sh 
        export PATH=$PATH:$GOROOT/bin
    ```
 Update your environment values 
    ```sh 
        source ~/.bash_profile
    ```
 Make a directory for your Golang projects with this exact path
    ```sh 
        mkdir -p ~/go/src/crownsterlingllc/
    ```
 Change directory into ~/go/src/crownsterlingllc/
    ```sh 
        cd ~/go/src/crownsterlingllc/
    ```
 Clone this project
    ```sh  
        git clone https://github.com/PROJECT_URL
    ```

### Questions or Issues
If you have any issues or questions about the project set up, feel free to email me at <jl@crownsterling.io>.


