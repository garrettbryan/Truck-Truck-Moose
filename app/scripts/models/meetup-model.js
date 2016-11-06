/*
meetup-model.js stores the request a meetup prototype.
*/
var MeetupRequest = function() {
  this.data = {};
};

/*
CORopenEvents requests open meetups from meetup.com.
callback called with error or
viewModels.meetups array is populated
*/
MeetupRequest.prototype.CORopenEvents = function(position, cb) {
  var verifyMeetupCanBeUsed = function(meetup){
    return meetup && meetup.group && meetup.description && meetup.venue && meetup.venue.lat && meetup.venue.lon;
  };

  var meetupRequestTimeout = setTimeout(function(){
      this.warningMessages.unshift("Looks like the Meetup.com server is taking too long to respond, this can be caused by either poor connectivity or an error with our servers. Please try again in a while.");
      this.warning(true);
      cb(new Error('timeout please load a test response'));
  }.bind(this), 8000);

  $.ajax.call(this,{
      url: 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=' + position().lng() + '&limited_events=False&photo-host=public&page=20&time=%2C1d&radius=25.0&lat=' + position().lat() + '&desc=False&status=upcoming&sig_id=130469302&sig=6ebd2b264bedf38cb1e1af50ef292c0e2eeda64d',
      dataType: 'jsonp',
      success: function(data) {
        clearTimeout(meetupRequestTimeout);
        if (data.results.length < 5) {
          this.warningMessages.unshift("Heard from Meetup.com, there are less than 5 meetups today. Loading a test response");
          this.warning(true);
          cb(new Error('less than 5 local meetups'));
        }else{
          data.results.forEach(function(result){
            if (verifyMeetupCanBeUsed(result)){
              this.meetups.push(new Meetup(result));
            }
          }.bind(this));
          this.meetups().sort(function(a,b){
            return parseFloat(b.yes_rsvp_count) - parseFloat(a.yes_rsvp_count);
          });
          cb(null);
        }
      }.bind(this),
      error: function(data) {
        clearTimeout(meetupRequestTimeout);
        //this.warning(true);
        this.warningMessages.unshift("There's been an error contacting Meetup.com.\nLoading a test response.");
        this.warning(true);
        cb(new Error('meetup returned an error, please load a test response'));
      }.bind(this)
  });
};


/*
testOpenEvents requests local meetup test data.
callback called with error or
viewModels.meetups array is populated
*/
MeetupRequest.prototype.testOpenEvents = function(position, cb) {
  var verifyMeetupCanBeUsed = function(meetup){
    return meetup && meetup.group && meetup.description && meetup.venue && meetup.venue.lat && meetup.venue.lon;
  };

  var meetupRequestTimeout = setTimeout(function(){
      this.warningMessages.unshift("Looks like the local test responses are failing.");
      this.warning(true);
      cb(new Error('timeout test response failed'));
  }.bind(this), 8000);

  $.ajax.call(this,{
    url: 'json/open_events_meetups.js',
    dataType: 'json',
    success: function(data) {
      clearTimeout(meetupRequestTimeout);
      data.results.forEach(function(result){
        if (verifyMeetupCanBeUsed(result)){
          var meetup = new Meetup(result);
          meetup.randomizeStopPoint(this.user.position(), this.map);
          this.meetups.push(meetup);
        }
      }.bind(this));
      this.meetups().sort(function(a,b){
        return parseFloat(b.yes_rsvp_count) - parseFloat(a.yes_rsvp_count);
      });
      cb(null);
    }.bind(this),
    error: function(err) {
      clearTimeout(meetupRequestTimeout);
      this.warningMessages.unshift("Unable to get meetup test data.");
      this.warning(true);
      cb(new Error('Unable to get meetup test data'));
    }
  });
};


var Meetup = function(data) {
  this.type = "meetup";
  for (var i in data) {
    this[i] = data[i];
  }
  this.img = 'images/resize_meetup.png';
};
Meetup.prototype.constructor = Meetup;


Meetup.prototype.adjustDescriptionImages = function(selector) {
  var str = this.description;
  var html = $.parseHTML( str );
  html.find('img').css('width','100%');
};

/*
render sets up the event listeners for the google maps.
*/
Meetup.prototype.render = function(map,viewModel) {
  if (this.venue){
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.venue.lat, this.venue.lon),
      map: map,
      opacity: 0.5,
      icon: this.img,
      title: this.group.name
    });
    var contentString = '<div id="content">'+
      '<h3 id="heading" class="heading">' + this.group.name + '</h3>' + '</div>';

    this.infowindow = new google.maps.InfoWindow({
      content: contentString,
      position: this.marker.position
    });

    this.marker.addListener('highlight', function() {
      viewModel.meetups().forEach( function(meetup){
        if(meetup.infowindow){
          meetup.infowindow.close();
          meetup.marker.setOpacity(0.5);
        }
        if (meetup.flightPath){
          meetup.flightPath.setMap(null);
        }
      });
      if (this.group.name) {
        viewModel.description('<h4 id="heading" class="heading">' + this.group.name + '</h4>');
      }
      if(this.description){
        viewModel.description(viewModel.description() + this.description);
      }
      this.marker.setOpacity(1.0);
    }.bind(this));


    this.infowindow.addListener('closeclick', function () {
      this.marker.setOpacity(0.5);
      this.flightPath.setMap(null);
      viewModel.selectedDestination = {};
    }.bind(this));

    this.marker.addListener('mouseover', function() {
      if( !viewModel.selectedDestination ) {
        $('#end').val(this.group.name);
      }
    }.bind(this));

    this.marker.addListener('mouseout', function() {
      if( !viewModel.selectedDestination ) {
        $('#end').val('');
      }
    }.bind(this));

    this.marker.addListener('click', function() {
      viewModel.meetups().forEach( function(meetup){
        if(meetup.infowindow){
          meetup.infowindow.close();
          meetup.marker.setOpacity(0.5);
        }
        if (meetup.flightPath){
          meetup.flightPath.setMap(null);
        }
      });
      if (this.group.name) {
        viewModel.description('<h4 id="heading" class="heading">' + this.group.name + '</h4>');
      }
      if(this.description){
        viewModel.description(viewModel.description() + this.description);
      }
      this.marker.setVisible(true);
      this.marker.setOpacity(1.0);
      viewModel.selectedDestination = this;
      viewModel.user.end(this.group.name);
      $('#end').val(viewModel.user.end());

      this.directionsService = new google.maps.DirectionsService();
      this.drawRoute(map, viewModel);

      google.maps.event.addListener(map, 'click', function(){
        viewModel.selectedDestination = {};
        this.marker.setOpacity(0.5);
        this.flightPath.setMap(null);
        viewModel.user.end('');
        $('#end').val('');
      }.bind(this));

    }.bind(this));
  }
};

/*
used for testing.
*/
Meetup.prototype.randomizeStopPoint = function(position) {
  //this.venue.lat, this.venue.lon

  var randomRadius = 5000 * Math.random();
  var randomHeading = 360 * Math.random();
  var randomPt = google.maps.geometry.spherical.computeOffset(position, randomRadius, randomHeading);

  this.venue.lat = randomPt.lat();
  this.venue.lon = randomPt.lng();
};


/*
drawRoute creates a new flightpath and draws it on the map.
*/
Meetup.prototype.drawRoute = function(map, viewmodel){
  var that = this;
  this.directionsService.route(
    {
      origin: viewmodel.user.position(),
      destination: this.marker.position,
      travelMode: google.maps.TravelMode.DRIVING
    },
    function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        this.flightPath = new google.maps.Polyline({
          path: response.routes[0].overview_path,
          geodesic: true,
          strokeColor: '#5CB62C',
          strokeOpacity: 1.0,
          strokeWeight: 3
        });
        this.flightPath.setMap(map);
      } else {
        this.warningMessages.unshift('Unable to access Google\'s Direction Service\n' + status);
      }
    }.bind(this)
  );
};

/*
closeInfoWindows close all aspects of an active window
*/
Meetup.prototype.closeInfoWindows = function(map, viewModel){
  viewModel.meetups().forEach( function(meetup){
    if(meetup.infowindow){
      meetup.infowindow.close();
      meetup.marker.setOpacity(0.5);
      meetup.flightPath.setMap(null);
    }
  });
};

/*
keepChosen close all other meetups windows and remove markers.
display seleted meetups
*/
Meetup.prototype.keepChosen = function(map, viewModel){
  viewModel.meetups().forEach( function(meetup){
    if(meetup.infowindow){
      meetup.infowindow.close();
    }
    if (meetup.marker){
      meetup.marker.setMap(null);
    }
  });
  this.marker.setMap(map);
};