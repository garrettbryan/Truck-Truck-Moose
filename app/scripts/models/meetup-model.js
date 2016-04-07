var MeetupRequest = function() {
  this.data = {};
};

MeetupRequest.prototype.CORopenEvents = function(position) {
  var meetupRequestTimeout = setTimeout(function(){
      console.log('Failed to get Meetups.');
  }, 8000);
  $.ajax.call(this,{
      url: 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=' + position().lng() + '&limited_events=False&photo-host=public&page=20&time=%2C1d&radius=25.0&lat=' + position().lat() + '&desc=False&status=upcoming&sig_id=130469302&sig=6ebd2b264bedf38cb1e1af50ef292c0e2eeda64d',
      dataType: 'jsonp',
      success: function(data) {
        console.log(data);
        data.results.forEach(function(result){
//          console.log(result);
          this.meetups.push(new Meetup(result));
//          console.log(Date(meetup.time));
        }.bind(this));
        clearTimeout(meetupRequestTimeout);

        console.log(this.meetups());
        this.meetups().sort(function(a,b){
          return parseFloat(b.yes_rsvp_count) - parseFloat(a.yes_rsvp_count);
        });
        console.log(this.meetups());

        //console.log(this);
      }.bind(this),
      error: function(data) {
        console.log('meetup Error');
        console.log(data);
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
      '</div>;';

    this.infowindow = new google.maps.InfoWindow({
      content: contentString,
      position: this.marker.position
    });

    this.infowindow.addListener('closeclick', function () {
      this.marker.setOpacity(0.5);
      viewModel.selectedDestination = {};
    }.bind(this));


    this.marker.addListener('click', function() {
      viewModel.meetups().forEach( function(meetup){
        if(meetup.infowindow){
          meetup.infowindow.close();
          meetup.marker.setOpacity(0.5);
        }
      });
      this.infowindow.open(map, this.marker);
      this.marker.setOpacity(1.0);
      viewModel.selectedDestination = this;
      viewModel.user.end(this.group.name);
      $('#end').val(viewModel.user.end());
    }.bind(this));
  }
};

Meetup.prototype.closeInfoWindows = function(map, viewModel){
  viewModel.meetups().forEach( function(meetup){
    if(meetup.infowindow){
      meetup.infowindow.close();
      meetup.marker.setOpacity(0.5);
    }
  });
};

Meetup.prototype.keepChosen = function(map, viewModel){
  console.log(viewModel.meetups());
  viewModel.meetups().forEach( function(meetup){
    if (meetup.marker){
      meetup.marker.setMap(null);
    }
    //console.log(meetup.marker)
  });
  this.marker.setMap(map);
  //this.marker.setMap(map);
};