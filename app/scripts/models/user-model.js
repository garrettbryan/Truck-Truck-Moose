User.prototype.init = function(now){
  var existingUser = ko.utils.parseJson(localStorage.getItem('MeetUpTruck'));
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
    console.log(typeof this[key]);
    if (typeof this[key] === "function"){
    console.log(typeof this[key]);
      this[key](existingUser[key]);
    }else if (typeof this[key] === "string"){
      this[key] = existingUser[key];
    }
  }
};