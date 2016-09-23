var MeetupRequest = function() {
  this.data = {};
};

MeetupRequest.prototype.CORopenEvents = function(position) {
  var meetupRequestTimeout = setTimeout(function(){
      this.warningMessages.unshift("Looks like the Meetup.com server is taking too long to respond, this can be caused by either poor connectivity or an error with our servers. Please try again in a while.");
      this.warning(true);
      console.log(this.warningMessages());
  }.bind(this), 8000);
  $.ajax.call(this,{
      url: 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=' + position().lng() + '&limited_events=False&photo-host=public&page=20&time=%2C1d&radius=25.0&lat=' + position().lat() + '&desc=False&status=upcoming&sig_id=130469302&sig=6ebd2b264bedf38cb1e1af50ef292c0e2eeda64d',
      dataType: 'jsonp',
      success: function(data) {
        clearTimeout(meetupRequestTimeout);
        console.log(data);
        if (data.results.length === 0) {
          this.warningMessages.unshift("Heard from Meetup.com, there are no more upcoming meetups today. Loading a test response.");
          this.warning(true);
          $.ajax.call(this,{
            url: 'http://localhost:9000/json/open_events_meetups.js',
            dataType: 'json',
            success: function(data) {
              data.results.forEach(function(result){
      //          console.log(result);
                this.meetups.push(new Meetup(result));
      //          console.log(Date(meetup.time));
              }.bind(this));

              console.log(this.meetups());
              this.meetups().sort(function(a,b){
                return parseFloat(b.yes_rsvp_count) - parseFloat(a.yes_rsvp_count);
              });
              console.log(this.meetups());
            }.bind(this),
            error: function(err) {
              console.log(err);
            }
          });
        }else{
          data.results.forEach(function(result){
  //          console.log(result);
            this.meetups.push(new Meetup(result));
  //          console.log(Date(meetup.time));
          }.bind(this));

          console.log(this.meetups());
          this.meetups().sort(function(a,b){
            return parseFloat(b.yes_rsvp_count) - parseFloat(a.yes_rsvp_count);
          });
          console.log(this.meetups());
        }
        //console.log(this);
      }.bind(this),
      error: function(data) {
        clearTimeout(meetupRequestTimeout);
        console.log(data);
        //this.warning(true);
        this.warningMessages.unshift("There's been an error contacting Meetup.com.\nPlease try again later. Loading a test response.");
        this.warning(true);
        console.log(this.warningMessages());
        $.ajax.call(this,{
          url: 'http://localhost:9000/json/open_events_meetups.js',
          dataType: 'json',
          success: function(data) {
            data.results.forEach(function(result){
    //          console.log(result);
              this.meetups.push(new Meetup(result));
    //          console.log(Date(meetup.time));
            }.bind(this));

            console.log(this.meetups());
            this.meetups().sort(function(a,b){
              return parseFloat(b.yes_rsvp_count) - parseFloat(a.yes_rsvp_count);
            });
            console.log(this.meetups());
          }.bind(this),
          error: function(err) {
            console.log(err);
          }
        });
      }.bind(this)
  });
};

var Meetup = function(data) {
  this.type = "meetup";
  for (var i in data) {
    this[i] = data[i];
  }
//  console.log(this);
  this.img = 'images/resize_meetup.png';
};
Meetup.prototype.constructor = Meetup;

Meetup.prototype.adjustDescriptionImages = function(selector) {
  var str = this.description;
  var html = $.parseHTML( str );
  console.log(html);
  html.find('img').css('width','100%');
  console.log(html);
};

Meetup.prototype.render = function(map,viewModel) {
  //console.log(this);
  if (this.venue){
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.venue.lat, this.venue.lon),
      map: map,
      opacity: 0.5,
      icon: this.img,
      title: this.group.name
    });
    var contentString = '<div id="content">'+
      '<h3 id="heading" class="heading">' + this.group.name + '</h3>' +
      //'<div id="body-content"> ' + this.description + '</div>' +
      '</div>';

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
        //console.log(this.adjustDescriptionImages('img'));
      }
      //this.infowindow.open(map, this.marker);
      this.marker.setOpacity(1.0);


    }.bind(this));





    this.infowindow.addListener('closeclick', function () {
      this.marker.setOpacity(0.5);
      this.flightPath.setMap(null);
      viewModel.selectedDestination = {};
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
        //console.log(this.adjustDescriptionImages('img'));
      }
      //this.infowindow.open(map, this.marker);
      this.marker.setOpacity(1.0);
      viewModel.selectedDestination = this;
      viewModel.user.end(this.group.name);
      $('#end').val(viewModel.user.end());

      this.directionsService = new google.maps.DirectionsService();
      this.drawRoute(map, viewModel);

    }.bind(this));
  }

};

Meetup.prototype.drawRoute = function(map, viewmodel){
  var that = this;
  console.log(this.marker);
  console.log(viewmodel.user.position());
  this.directionsService.route(
    {
      origin: viewmodel.user.position(),
      destination: this.marker.position,
      //waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING
    },
    function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        //that.setResponses(icopy - 1, response);

        this.flightPath = new google.maps.Polyline({
          path: response.routes[0].overview_path,
          geodesic: true,
          strokeColor: '#5CB62C',
          strokeOpacity: 1.0,
          strokeWeight: 3
        });
        this.flightPath.setMap(map);
        console.log(this);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    }.bind(this)
  );
};


Meetup.prototype.closeInfoWindows = function(map, viewModel){
  viewModel.meetups().forEach( function(meetup){
    if(meetup.infowindow){
      meetup.infowindow.close();
      meetup.marker.setOpacity(0.5);
      meetup.flightPath.setMap(null);
    }
  });
};

Meetup.prototype.keepChosen = function(map, viewModel){
  console.log(viewModel.meetups());
  viewModel.meetups().forEach( function(meetup){
    if(meetup.infowindow){
      meetup.infowindow.close();
    }
    if (meetup.marker){
      meetup.marker.setMap(null);
    }
    //console.log(meetup.marker)
  });
  this.marker.setMap(map);
  //this.marker.setMap(map);
};