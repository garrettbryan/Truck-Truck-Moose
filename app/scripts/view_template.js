/*
User Experience Overview.
Initial View -> landingPageView
the program will show the title and icon over a black background. An ajax request for current local meetups to meetup.com and a map request to google maps. When both are ready the background should fade up halfway to show a map with meetup markers and food truck routes. Over the map the title moves to the top of the screen and then two dropdowns fade in scrren center. one dropdown lists the meetups and the other lists the foodtrucks. When a meetup is selected the respective map marker is highlighted. When a meetup is selected food trucks within close proximity with a stop between now and the starttime of the meetup will be higlighted. if the food truck stop is temporally close to the start of the meetup then the route should give in indication that there is much time between the foodtruck stop and the start of the meetup. E.g. Say it is currently 5PM and my meetup starts at 6PM, and the foodtruck opens next to the meetup at 5:45PM then some how the route should indicate there is only a small window of foodtruck opportunity. If the food truck has a stop after the meetup starts then the route stop should highlight in a different way.
The user marker should be in the center of the map and the meetups/food truck stops should determine the bounds of the map. The map should be subdued colors while the markers, routes, etc should be higher intensity, like a neon light. The meetup drop down will show the meetup name, number of rsvps, time it starts. The food truck will show the name, rating, and stop time.
when specific meetups/foodtrucks are chosen then the map details should be highest intensity and the map should rebound itself to show the relevant selections. There should also be buttons to give more information about the meetup and about the foodtruck. such as menu and possibly a way to place an online order.
This could be extended to fixed restaurants the user could place a takeout order or book a table.
*/
$(function(){
  landingPageView = {
    /*
    the landing page is the first view given to the user.
    Centered Title and logo on black background.
    */
    init: function() {
      console.log('landingPageView init');
      this.logo = 'http://dummyimage.com/200/000/fff';
      this.appName = 'MeeTruck';
    },
    render: function() {
      console.log('landingPageView render');
    },
  },


  foodTruckMoreDetailView = {
    /*
    this is the more detailed view of the food truck
    */
    init: function() {
      console.log('foodTruckMoreDetailView init');
    },
    render: function() {
      console.log('foodTruckMoreDetailView render');
    },
  },

  meetupMoreDetailView = {
    /*
    this is the more detailed view of the meetup
    */
    init: function() {
      console.log('meetupMoreDetailView init');
    },
    render: function() {
      console.log('meetupMoreDetailView render');
    }
  },

  mainView = {
    /*
    this is the main view of the search fields over the map.
    */
    init: function() {

    },
    render: function() {

    },
  }
});