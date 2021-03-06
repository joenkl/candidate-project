## Technical Interview 

This will be simulation of the type of work that you would get working at Crown Sterling.  The panel will present a ticket that lists out the Acceptance/Technical/Testing criteria for the problem.  The team will work with the candidate in a paired but autonomous manner to work through the problem (much like they would while working on the same team).  After an hour or so we’ll take a break and determine to let the candidate continue on the problem or expand on the coding problem by letting the candidate do something of their own and further demonstrate their skills.


### Prerequisites

You should have the following installed on your machine:

- [Go](https://golang.org)(version 1.14.4 preferably, see Go installation for Mac below for installation troubleshooting)
- [Node](https://nodejs.org/en/) (version 12 preferably)
- [Docker](https://www.docker.com)


## Setup

In order to get the basic setup we have provided a shell script to install packages and setup MongoDB. You can run the following script in your shell:

```sh
sh setup.sh
```

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

- Open two terminal windows (one for the client, one for the server).
- NOTE: You will be asked to pick either the Go or JS server as part of the coding practice. It's your choice.

Window 1: (NOTE: if Go)
```sh
cd server-go
go build .
./server-go
```

Window 1: (NOTE: if JS)
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

You should now be able to navigate to `localhost:3000/` in your browser. The browsers console should print the result from the health endpoint if everything is working.

### Go installation for Mac
Copy and paste the following in you terminal.
NOTE: last command needs the project url: 
 
```sh 
brew update    
brew install go
export GOPATH=$HOME/go   
export GOROOT=/usr/local/opt/go/libexec
export PATH=$PATH:$GOPATH/bin
export PATH=$PATH:$GOROOT/bin
source ~/.bash_profile
mkdir -p ~/go/src/crownsterlingllc/
cd ~/go/src/crownsterlingllc/
git clone https://github.com/PROJECT_URL 
```

### Questions or Issues
If you have any issues or questions about the project set up, feel free to email me at <jl@crownsterling.io>.


