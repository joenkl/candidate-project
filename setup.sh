#!bin/bash
cd ./client
npm install

cd ../server
go build .

cd ../data
tar -xf data.tar.gz
docker run --name db -p 27017:27017 -v $PWD/data:/data/db -d mongo

cd ..


