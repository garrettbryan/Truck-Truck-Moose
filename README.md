##Truck Truck Moose

This is a web app to enhance your meetups with a food truck experience and weather alerts. This web app is a side project to experiment with KnockoutJS, NodeJS, and Various 3rd Party APIs.

###Run the app
Prerequisites to running the app:
you will need npm to manage the various grunt dependencies

How to run the web app via a terminal:
1. Create a project folder
2. cd into it
3. Clone the repository
    *git clone https://github.com/garrettbryan/udacity-project-5.git
4. Install the npm dependencies
    *npm install
5. Install the bower dependencies
    *bower install
6. Serve the app for local development
    *grunt serve
7. Build the app for deployment (optional)
    *grunt build
8. Copy the food truck images to the dist folder
    *cp app/images/*.png dist/images/

Test the deployed site. Static files are served via github. Async request to simple NodeJS backend on Heroku.
http://garrettbryan.github.io/udacity-project-5/dist/

###Features to look for
1. Single page web app removes scroll bars for a super clean look
2. Main elment and contributor element interaction
3. Meetup Search bar includes a dropdown as the user begins to type.
    *The input will filter both the dropdown and the map icons
4. Clicking on the Header will roll up the Main element to show the map
5. Weather overlays update when the map changes boundaries
6. When a Meetup or Food Truck is selected, notice the description element that appears at the bottom of the screen.
    *Click on the decription element to interact with it
7. The Food Truck Search bar searches the name, description and plates offered
    *The input will filter both the Swiper List and the Map icons.
8. Food Trucks that are traveling or not open will show a plain food truck.
    *Code needs to be updated to hit the Truck Truck Moose API
9. Swipe through the various plates offered and make your selction
    *Find ingredients that you do not want and remove them by selecting the x
    *Remove whole plates by selecting the x next to the name of the dish
10. The order list automatically scrolls to the bottom for each new plate and updates the total
11. The list is formated to stay within the single page.

###Future features
1. Integrate logins
2. Build a database of Food Trucks
3. Allow easy updating of their daily offerings possibly by tweet
4. Allow schedule updates by tweet
5. Create an Admin view.
6. Integrate payment or a cms system
7. Add system to track availability of your order
8. Add system for food truck to see customers location.
9. Allow customer to request car service turning the Food Truck into a drive thru.

###Contributors
1. [Moose Head - Created By Hayley Parke](https://thenounproject.com/search/?q=moose&i=251377)
2. [Food Trucks - Created By MiniStock](https://www.vecteezy.com/members/ministock)
3. [Open Meetups - Meetup Organizers](https://www.meetup.com/)
4. [Weather Overlays - Weather Underground](https://www.wunderground.com)
