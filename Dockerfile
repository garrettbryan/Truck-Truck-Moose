FROM node:6.17.1 as build

# make directory
RUN mkdir /source
# Create a user group
RUN addgroup --system cgroup
# Create a user in group -S -D -h
RUN adduser --system --disabled-password --ingroup cgroup cuser

COPY app /source/app
COPY bower.json /source
COPY package.json /source
COPY Gruntfile.js /source

WORKDIR /source
RUN ["npm", "install", "-g", "bower"]
RUN ["npm", "install", "-g", "grunt"]
RUN ["npm", "install"]

# Chown all the files to the user
RUN chown -R cuser:cgroup /source

USER cuser:cgroup

RUN ["bower", "install"]
RUN ["grunt", "build"]


FROM nginx:mainline-alpine as production
COPY --from=build /source/dist /usr/share/nginx/html