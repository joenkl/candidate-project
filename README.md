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
- server


The `client` folder is the front-end, which is the basic skeleton of a React app generated using `npx create-react-app`.

The `server` folder is a basic Go API built using Gin-Gonic `https://github.com/gin-gonic/gin`  which runs on port `8000` and will connect to MongoDB on `localhost:27017` (which is set up with docker). This contains some pre-existing data that is stored in the `data` folder.

### To be done before interview

Before the interview, please go ahead with running the setup script.

In order to validate that you are properly setup after running the setup script you can perform the following steps:

- Open two terminal windows (one for the client, one for the server)

Window 1:
```sh
cd server
./server
```

Window 2:
```sh
cd client
npm run start
```

At this point you should have a server running on port `localhost:8000` and a client running on `localhost:3000`

You should now be able to navigate to `localhost:3000/` in your browser.


### Troubleshooting

If you have any issues getting the project set up, feel free to send me an email at <jl@crownsterling.io>.
