/*
MeetupRequest.prototype.CORopenEvents = function(position) {
  var meetupRequestTimeout = setTimeout(function(){
      console.log('Failed to get Meetups.');
  }, 8000);

  $.ajax({
      url: 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=' + position.lng() + '&limited_events=False&photo-host=public&page=20&time=%2C1d&radius=25.0&lat=' + position.lat() + '&desc=False&status=upcoming&sig_id=130469302&sig=6ebd2b264bedf38cb1e1af50ef292c0e2eeda64d',
      dataType: 'jsonp',
      success: function(data) {
        console.log(data);
        data.results.forEach(function(result){
          var meetup = new Meetup();
          meetup.init(result);
          aboutMy.meetups.push(meetup);
//          console.log(Date(meetup.time))
          meetup.render();
        });
        clearTimeout(meetupRequestTimeout);
        aboutMy.meetups.sort(function(a,b){
          return parseFloat(b.yes_rsvp_count) - parseFloat(a.yes_rsvp_count);
        });
        aboutMy.determineMeetupMapBounds();
      },
      error: function(data) {
        console.log('meetup Error');
        console.log(data);
      }
  });
};
*/

User.prototype.init = function(now){
  //var existingUser = ko.utils.parseJson(localStorage.getItem('MeetUpTruck'));
  var existingUser;
  console.log(existingUser);
  if (!existingUser){
    this.clearUserFields();
  } else {
    this.populateFields(existingUser);
    this.currentLogin = now;
    console.log(this.currentLogin);
  }
  console.log(this);
  console.log(ko.toJSON(this));
};

User.prototype.clearUserFields = function() {
  for (var key in this){
    console.log(key + " " + typeof this[key]);
  }
};

User.prototype.populateFields = function(existingUser) {
  for (var key in existingUser) {
//    console.log(typeof this[key]);
    if (typeof this[key] === "function"){
//    console.log(typeof this[key]);
      this[key](existingUser[key]);
    }else if (typeof this[key] === "string"){
      this[key] = existingUser[key];
    }
  }
};



User.prototype.localSave = function(){
//a function to run observable values through the toJSON function.
//the function toJSON does not accept non ko objects.
//must convert to string before trying to save.

  var savedUserData = {
//    "handle": this.handle,
    "password": this.password,
    "ccNumber": this.ccNumber,
    "ccExpiration": this.ccExpiration,
    "ccv": this.ccv,
    "weatherDisplay": this.weatherDisplay,
    "rememberMe": this.rememberMe,
    "favoriteFood": this.favoriteFood,
    "currentLogin": this.currentLogin,
    "begin": this.begin,
    "end": this.end,
    "name": this.name,
    "email": this.email,
    "position": this.position,
    "startTime": this.startTime,
    "endTime": this.endTime
  };

    for (var key in savedUserData) {
      console.log(ko.toJSON(key));
      console.log(ko.toJSON(savedUserData[key]));
    }
//    console.log(ko.toJSON(this.user));
    //localStorage.setItem('MeetUpTruck', ko.toJSON.apply(this,this.user));
    //console.log(ko.utils.parseJson(localStorage.getItem('MeetUpTruck')));

  console.log(savedUserData);
  localStorage.setItem('MeetUpTruck', ko.toJSON(savedUserData));
  //console.log(ko.utils.parseJson(localStorage.getItem('MeetUpTruck')));
};

User.prototype.getLocalData = function(){
  var localData = ko.utils.parseJson(localStorage.getItem('MeetUpTruck'));

  if (localData){
    this.handle(localData.handle);
    this.password(localData.password);
    this.ccNumber(localData.ccNumber);
    this.ccExpiration(localData.ccExpiration);
    this.ccv(localData.ccv);
    this.weatherDisplay(localData.weatherDisplay);
    this.rememberMe(localData.rememberMe);
    this.favoriteFood(localData.favoriteFood);
    this.currentLogin(localData.currentLogin);
    this.begin(localData.begin);
    this.end(localData.end);
    this.name(localData.name);
    this.email(localData.email);
    this.position(localData.position);
    this.startTime(localData.startTime);
    this.endTime(localData.endTime);
  }
};

User.prototype.render = function(map){
  this.marker = new google.maps.Marker({
    position: this.position(),
    map: map,
    title: "Current Location",
    draggable:false
  });

  /*
  add an info window
  */
  var contentString = '<div id="content">'+
    '<h3 id="heading" class="heading">You are here.</h3>' +
    '<div id="body-content"> Wow you are right here</div>' +
    '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  this.marker.addListener('click', function() {
    //infowindow.open(map, this.marker);
    console.log(this);
  }.bind(this));

};