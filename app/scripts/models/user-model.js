/*
init if existing local storage then populatefileds of current user
*/
User.prototype.init = function(now){
  //var existingUser = ko.utils.parseJson(localStorage.getItem('MeetUpTruck'));
  var existingUser;
  if (!existingUser){

  } else {
    this.populateFields(existingUser);
    this.currentLogin = now;
  }
};

/*
populateFields takes an object from local storage and builds out the current user.
*/
User.prototype.populateFields = function(existingUser) {
  for (var key in existingUser) {
    if (typeof this[key] === "function"){
      this[key](existingUser[key]);
    }else if (typeof this[key] === "string"){
      this[key] = existingUser[key];
    }
  }
};

/*
localSave a function to run user observable values through the toJSON function before trying to save.
*/
User.prototype.localSave = function(){
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

    //localStorage.setItem('MeetUpTruck', ko.toJSON.apply(this,this.user));

  localStorage.setItem('MeetUpTruck', ko.toJSON(savedUserData));
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

/*
render adds any necessary event listeners
*/
User.prototype.render = function(map, cb){
  //this.marker.setMap(null);
  this.marker = new google.maps.Marker({
    position: this.position(),
    map: map,
    title: "Current Location",
    draggable:false
  });

  var contentString = '<div id="content">'+
    '<h6 id="heading" class="heading">You are here.</h3>' +
    //'<div id="body-content">you are here</div>' +
    '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  this.marker.addListener('click', function() {
    infowindow.open(map, this.marker);
  }.bind(this));

  cb();
};