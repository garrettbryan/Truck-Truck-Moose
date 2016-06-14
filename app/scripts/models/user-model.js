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
    "handle": this.handle,
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