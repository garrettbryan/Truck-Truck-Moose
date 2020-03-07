FROM node:6.17.1 as build

WORKDIR /source

COPY . /source

RUN ["npm", "install"]
RUN ["npm", "install", "bower"]
RUN ["bower", "install"]
RUN ["npm", "install", "grunt"]


