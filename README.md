##Truck Truck Moose

This is a web app to enhance your meetups with a food truck experience and weather alerts. This web app is a side project to experiment with KnockoutJS, NodeJS, and Various 3rd Party APIs.

Prerequisites to running the app:
you will need npm to manage the various grunt dependencies

How to run the web app via a terminal:
1. Create a project folder
2. cd into it
3. Clone the repository
    git clone https://github.com/garrettbryan/udacity-project-5.git
4. Install the npm dependencies
    npm install
5. Install the bower dependencies
    bower install
6. Serve the app for local development
    grunt serve
7. Build the app for deployment (optional)
    grunt build
8. Copy the food truck images to the dist folder
    cp app/images/*.png dist/images/

Test the deployed site. Static files are served via github. Async request to simple NodeJS backend on Heroku.
http://garrettbryan.github.io/udacity-project-5/dist/
