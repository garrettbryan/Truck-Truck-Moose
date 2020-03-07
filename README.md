# Truck Truck Moose
This is a web app to enhance your meetups with a food truck experience and weather alerts. This web app is a side project to experiment with KnockoutJS, NodeJS, and Various 3rd Party APIs.

---
## Setting up the dev environment
1. Install [Docker](https://www.docker.com/products/docker-desktop)
1. Install [GNU Make](https://www.gnu.org/software/make/)
    - MacOS - GNU Make comes with developer tools or xcode

---
## Building the release candidate image
1. `make` or `make build`
1. `make push`

## Testing the release candidate image
1. `docker-compose up`
1. Open a browser to localhost

---
## Tagging the release image
1. `make release`
1. `make push`

---
## Contributors (not mentioned in package.json)
1. [Moose Head - Created By Hayley Parke](https://thenounproject.com/search/?q=moose&i=251377)
1. [Food Trucks - Created By MiniStock](https://www.vecteezy.com/members/ministock)
1. [Open Meetups - Meetup Organizers](https://www.meetup.com/)
1. [Weather Overlays - Weather Underground](https://www.wunderground.com)

