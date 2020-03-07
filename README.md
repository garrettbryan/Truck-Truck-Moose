## Truck Truck Moose

This is a web app to enhance your meetups with a food truck experience and weather alerts. This web app is a side project to experiment with KnockoutJS, NodeJS, and Various 3rd Party APIs.

### Important! This app uses Grunt build tools!
I included the built final deliverable files which can be run from your local machine. However; if you need to interact with the development files, The best way will be to setup a development environment to host the local development files. Which I detail below.

### Run the built final deliverable files
    1. from the terminal - Create a project folder
        1. mkdir /project/folder/
    2. Navigate into it
        1. cd /project/folder/
    3. Clone the repository
        1. git clone https://github.com/garrettbryan/udacity-project-5.git
    4. Navigate to the dist index file
        1. cd /project/folder/udacity-project-5/dist/index.html
    5. Open the index file in Chrome or FireFox


### Run the app in development
Prerequisites to running the app:
you will need npm to manage the various dependencies

### 1. How to run the web app via the terminal:
    1. Create a project folder
    2. cd into it
    3. Clone the repository
        1. git clone https://github.com/garrettbryan/udacity-project-5.git
    4. Navigate to the cloned folder
        1. cd /project/folder/udacity-project-5/
    5. Install the npm dependencies
        1. npm install
    6. Install the bower dependencies
        1. bower install
    7. Serve the app for local development
        1. grunt serve
    8. Open Chrome and navigate to:
        1. http://localhost:9000/


###How to build the web app via the terminal:
    1. Create a project folder
    2. cd into it
    3. Clone the repository
        1. git clone https://github.com/garrettbryan/udacity-project-5.git
    4. Navigate to the cloned folder
        1. cd /project/folder/udacity-project-5/
    5. Install the npm dependencies
        1. npm install
    6. Install the bower dependencies
        1. bower install
    7. Build the app for deployment (optional)
        1. grunt build
    8. Navigate to the dist folder and open the index.html file in Chrome or Firefox.

Test the deployed site. Static files are served via github. Async request to simple NodeJS backend on Heroku.
https://garrettbryan.github.io/udacity-project-5/dist/

### Features to look for
    1. Single page web app removes scroll bars for a super clean look
    2. Main elment and contributor element interaction
    3. Meetup filer input includes a dropdown as the user begins to type.
        1. The input will filter both the dropdown and the map icons
    4. Clicking on the Header will roll up the Main element to show the map
    5. Weather overlays update when the map changes boundaries
    6. When a Meetup or Food Truck is selected, notice the description element that appears at the bottom of the screen.
        1. Click on the decription element to interact with it
    7. The Food Truck Search bar searches the name, description and plates offered
        1. The input will filter both the Swiper List and the Map icons.
    8. Food Trucks that are traveling or not open will show a plain food truck.
        1. Code needs to be updated to hit the Truck Truck Moose API
    9. Swipe through the various plates offered and make your selction
        1. Find ingredients that you do not want and remove them by selecting the x
        1. Remove whole plates by selecting the x next to the name of the dish
    10. The order list automatically scrolls to the bottom for each new plate and updates the total
    11. The order element is formated to stay within the single page
    12. update flight path to include a detour to the food truck.
    13. change the foodtruck meetup visit order.
    14. Navigate forward and backward through the screens

### Future features
1. Integrate logins
2. Build a database of Food Trucks
3. Allow easy updating of their daily offerings possibly by tweet
4. Allow schedule updates by tweet
5. Create an Admin view.
6. Integrate payment or a cms system
7. Add system to track availability of your order
8. Add system for food truck to see customers location.
9. Allow customer to request car service turning the Food Truck into a drive thru
10. Users should be able to favorite dishes, trucks, meetups
11. Use google to add destinations besides meetups
12. Users' data should persist locally and also be saved in a database.

### Contributors
1. [Moose Head - Created By Hayley Parke](https://thenounproject.com/search/?q=moose&i=251377)
2. [Food Trucks - Created By MiniStock](https://www.vecteezy.com/members/ministock)
3. [Open Meetups - Meetup Organizers](https://www.meetup.com/)
4. [Weather Overlays - Weather Underground](https://www.wunderground.com)

