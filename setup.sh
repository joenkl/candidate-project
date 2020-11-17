#!bin/bash
cd ./client
npm install

cd ../server-js
npm install 

cd ../server-go 
go build .

cd ..
tar -xf data.zip
docker pull mongo:latest
docker run --name db -p 27017:27017 -v $PWD/data:/data/db -d mongo:latest
