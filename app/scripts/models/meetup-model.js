var MeetupRequest = function() {
  this.data = {};
};

MeetupRequest.prototype.CORopenEvents = function(position) {
  var meetupRequestTimeout = setTimeout(function(){
      console.log('Failed to get Meetups.');
  }, 8000);

  $.ajax.call(this,{
      url: 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=' + position.lng() + '&limited_events=False&photo-host=public&page=20&time=%2C1d&radius=25.0&lat=' + position.lat() + '&desc=False&status=upcoming&sig_id=130469302&sig=6ebd2b264bedf38cb1e1af50ef292c0e2eeda64d',
      dataType: 'jsonp',
      success: function(data) {
        console.log(data);
        data.results.forEach(function(result){
          console.log(result);
          var meetup = new Meetup();
          meetup.init(result);
          this.meetups.push(meetup);
          console.log(Date(meetup.time));
          meetup.render();
        }.bind(this));

        clearTimeout(meetupRequestTimeout);
        this.meetups().sort(function(a,b){
          return parseFloat(b.yes_rsvp_count) - parseFloat(a.yes_rsvp_count);
        });
        console.log(this);
        this.addMeetupsToMap();
      }.bind(this),
      error: function(data) {
        console.log('meetup Error');
        console.log(data);
      }.bind(this)
  });
};

var Meetup = function() {
};

Meetup.prototype.init = function(data) {
  for (var i in data) {
    this[i] = data[i];
  }
//  console.log(this);
  this.img = 'images/resize_meetup.png';
};

Meetup.prototype.render = function() {
  if (this.venue){
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.venue.lat, this.venue.lon),
      map: map,
      icon: this.img,
      title: this.group.name
    });
    var contentString = '<div id="content">'+
      '<h3 id="heading" class="heading">' + this.group.name + '</h3>' +
      '<div id="body-content"> ' + this.description + '</div>' +
      '</div>;';

    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      position: this.marker.position
    });

    this.marker.addListener('click', function() {
      infowindow.open(map, this.marker);
    });
  }
};
