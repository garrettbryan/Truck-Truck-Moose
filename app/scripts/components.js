var loginForm = [
'<form class="form-horizontal" data-bind="submit: $parent.toMap">',
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="email" data-bind="value: $parent.user.email" class="form-control" id="inputEmail3" placeholder="email">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="password" data-bind="value: $parent.user.password" class="form-control" id="inputPassword3" placeholder="Password">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-3 col-sm-offset-3">',
'      <button type="submit" class="btn btn-default" id="sign-in-btn">Sign in</button>',
'      <button class="btn btn-default" id="sign-up-btn" data-bind="click: $parent.loginToSignUp">Sign up</button>',
'      <button class="btn btn-default" id="reset-btn" data-bind="click: $parent.resetUser">Reset</button>',
'    </div>',
'  </div>',
'</form>'
].join("\n");
ko.components.register('login-form', {
  viewModel: function(loginData) {
    this.submit = function(){
      console.log('login');
    };

  },
  template: loginForm
});


var signupForm = [
'<form class="form-horizontal" data-bind="submit: $parent.signUpToSettings">',
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="text" data-bind="value: $parent.user.name" class="form-control" id="name" placeholder="Name">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="email" data-bind="value: $parent.user.email" class="form-control" id="inputEmail" placeholder="Email">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="text" data-bind="value: $parent.user.handle" class="form-control" id="handle" placeholder="Handle">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="password" data-bind="value: $parent.user.password" class="form-control" id="createPassword" placeholder="Password">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <button type="submit" class="btn btn-default" id="sign-up-btn">Sign up</button>',
'    </div>',
'  </div>',
'</form>',
].join("\n");
ko.components.register('sign-up-form', {
  viewModel: function(formData) {
    this.submit = function(formElement){
      console.log('signup');
      console.log(formData);
      console.log(this);
    };

  },
  template: signupForm
});


var settings = [
'<form class="form-horizontal" data-bind="submit: $parent.settingsToMap">',
//'    <div data-bind="text: ko.toJSON($parent)"></div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Name</label>',
'    <div class="col-xs-6 col-md-6">',
'        <p class="form-control-static" data-bind="text: $parent.user.name">John Doe</p>',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Handle</label>',
'    <div class="col-xs-6 col-md-6">',
'        <p class="form-control-static" data-bind="text: $parent.user.handle">Cool Guy</p>',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Email</label>',
'    <div class="col-xs-6 col-md-6">',
'        <p class="form-control-static" data-bind="text: $parent.user.email">John Doe</p>',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Position</label>',
'    <div class="col-xs-6 col-md-6">',
'      <input type="text" data-bind="text: $parent.user.position" class="form-control" placeholder="Lat,Long">',
'  </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Credit Card Number</label>',
'    <div class="col-xs-6 col-md-6">',
'      <input type="text" data-bind="value: $parent.user.ccNumber" class="form-control" placeholder="xxxx xxxx xxxx xxxx">',
'  </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Expiration Date</label>',
'    <div class="col-xs-6 col-md-6">',
'      <input type="text" data-bind="value: $parent.user.ccExpiration" class="form-control" placeholder="mm/yy">',
'  </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">CCV</label>',
'    <div class="col-xs-6 col-md-6">',
'      <input type="text" data-bind="value: $parent.user.ccv" class="form-control" placeholder="xxxx">',
'  </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label"></label>',
'    <div class="col-xs-6 col-md-6">',
'      <div class="checkbox">',
'        <label><input type="checkbox" data-bind="checked: $parent.user.rememberMe"> Remember me </label>',
'      </div>',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label"></label>',
'    <div class="col-xs-6 col-md-6">',
'      <div class="checkbox">',
'        <label><input type="checkbox" data-bind="checked: $parent.user.weatherDisplay"> Include Weather Overlay </label>',
'      </div>',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-xs-3 col-md-3">',
'    </div>',
'    <div class="col-xs-3 col-md-3">',
'      <button type="submit" class="btn btn-default" id="save-settings-btn">Done</button>',
'    </div>',
'  </div>',
'</form>',
].join("\n");
ko.components.register('settings', {
  viewModel: function(formData) {

    this.submit = function(formElement){
      console.log(formElement);
    };

  },
  template: settings
});


var destinationSelection = [
//'    <div data-bind="text: ko.toJSON($parent.user.begin)"></div>',
//'    <div data-bind="text: ko.toJSON($parent.selectedDestination)"></div>',
//'    <div data-bind="text: ko.toJSON($parent.user.end)"></div>',
//'<form class="form-horizontal" data-bind="submit: $parent.toFoodTrucks">',
'<form class="form-horizontal">',
'  <div class="form-group">',
'    <div class="col-xs-12 col-md-12">',
//'      <input class="form-control col-sm-6" data-bind="geoToAddress: $parent.selectedDestination" placeholder="Start" type="text">',
'      <input class="form-control col-sm-6" data-bind="geoToAddress: $parent.user.begin" placeholder="Start" type="text">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-xs-12 col-md-12">',
'      <input id="end" class="form-control col-sm-6" data-bind="meetupsGoogleAutoComplete: $parent.user.end" placeholder="End" type="text">',
'      <div data-bind="foreach: $parent.prunedPossibleDestinations">',
'        <p class="destination" data-bind="destinationDropdown: group.name"></p>',
'      </div>',
'    </div>',
'  </div>',
'</form>',
'  <div class="row">',
'    <div class="col-sm-2">',
'      <button class="btn btn-default" data-bind="click: $parent.toFoodTrucks" id="Done">Done</button>',
'    </div>',
'  </div>'
].join("\n");
ko.components.register('destination-selection', {
  viewModel: function() {
/*    this.destination = params.dest;

    this.destination.subscribe(function(newValue) {
      //console.log(this.displayFoodTrucks());
      console.log(newValue);
      truckSwiper.removeAllSlides();
      newValue.forEach(function(foodtruck){
        console.log(truckSwiper);
        truckSwiper.appendSlide('<div class="swiper-slide">' + foodtruck.name + '<img src="' + foodtruck.img + '" id="main-logo" class="img-responsive center-block img-rounded" alt="MeeTruck Logo"></div>')
      });
      //<img id="main-logo" class="img-responsive center-block img-rounded" alt="MeeTruck Logo">

    });
*/
  },
  template: destinationSelection
});


var foodTruckSelection = [
'<span data-bind="text: selectedTruckName"></span>',
'<form class="form-horizontal">',
'    <div class="form-group">',
'        <div class="col-sm-10">',
'            <input class="form-control" data-bind="truckFilter: $parent.truckFilter" type="text" id="truck-filter" placeholder="Filter">',
'        </div>',
'    </div>',
'    <div class="row">',
'        <div class="col-md-12">',
'          <div class="truck-swiper-container">',
'              <!-- Additional required wrapper -->',
'              <div class="swiper-wrapper">',
'                  <!-- Slides -->',
'                  <div class="swiper-slide"></div>',
'              </div>',
'              <!-- If we need pagination -->',
'              <div class="swiper-pagination"></div>',
'          </div>',
'        </div>',
'    </div>',
'  <div class="form-group">',
'    <div class="col-sm-12">',
'      <button class="btn btn-default" id="Done">Go Back</button>',
//'      <button class="btn btn-default" data-bind="click: init" id="Done">Go Back</button>',
'      <button class="btn btn-default" data-bind="click: $parent.toOrder" id="Done">Ok</button>',
'    </div>',
'  </div>',
'</form>'
].join("\n");
ko.components.register('food-truck-selection', {
  viewModel: function(params) {

    this.displayFoodTrucks = params.prunedPossibleFoodTrucks;
    this.previousFoodTrucks = [];
    this.selectedTruck = params.selectedTruck;
    this.selectedTruckName = params.selectedTruckName;

    this.truckSwiper = new Swiper ('.truck-swiper-container', {
      // Optional parameters
      pagination: '.swiper-pagination',
      slidesPerView: 'auto',
      centeredSlides: true,
      paginationClickable: true,
      spaceBetween: 30,
      observer: false,
      loop: false
    });

    this.selectedTruckName.subscribe(function(name){

      this.previousFoodTrucks.forEach(function(foodTruck) {
        if(foodTruck.infowindow){
          foodTruck.infowindow.close();
          //foodTruck.marker.setOpacity(0.5);
        }
      }.bind(this));

      this.displayFoodTrucks().forEach(function(foodTruck, index){
        console.log(name);
        console.log(foodTruck.name);
        if(foodTruck.name === name){
          this.truckSwiper.slideTo(index);
          google.maps.event.trigger(foodTruck.marker, 'click');
        }
      }.bind(this));
    }.bind(this));

    this.displayFoodTrucks.subscribe(function(foodTrucks) {
      //console.log(this.displayFoodTrucks());
      this.selectedTruckName('');
      this.selectedTruck = {};
      var self = this;
      console.log(foodTrucks);
      this.truckSwiper.removeAllSlides();
      foodTrucks.forEach(function(foodTruck, index){
        console.log(this.truckSwiper);
        console.log(index);
        this.truckSwiper.appendSlide('<div class="swiper-slide" data-value="'+index+'">' + foodTruck.name + '<img src="' + foodTruck.img + '" id="main-logo" class="img-responsive center-block img-rounded" alt="MeeTruck Logo"></div>');
      }.bind(self));

      $('.swiper-slide').click(function(){
        console.log(self);
        console.log($(this).data('value'));
        self.selectedTruck = self.displayFoodTrucks()[$(this).data('value')];
        self.selectedTruckName(self.selectedTruck.name);
        console.log(self.selectedTruck);
      });
      //<img id="main-logo" class="img-responsive center-block img-rounded" alt="MeeTruck Logo">
      this.previousFoodTrucks = self.displayFoodTrucks();
    }.bind(this));

    this.test = (function(truckNumber){
      console.log(truckNumber);
      console.log(this.displayFoodTrucks()[truckNumber]);
      this.selectedTruck = this.displayFoodTrucks()[truckNumber];
      console.log(this.selectedTruck);
      //this.selectedTruckName(this.selectedTruck.name);
      //this.selectedTruck(this.displayFoodTrucks()[0]);
    }).bind(this);

  },
  template: foodTruckSelection
});


var menuItem = [
'<span data-bind="text: $parent.selectedTruckName"></span>',
'<form class="form-horizontal" data-bind="submit: $parent.toConfirmation">',
'    <div class="row">',
'        <div class="col-md-12">',
'          <div class="menu-swiper-container">',
'              <!-- Additional required wrapper -->',
'              <div class="swiper-wrapper">',
'                  <!-- Slides -->',
'                  <div class="swiper-slide"></div>',
'              </div>',
'              <!-- If we need pagination -->',
'              <div class="swiper-pagination"></div>',
'          </div>',
'        </div>',
'    </div>',
'  <div id="order">',
'    <ul class="order-item" data-bind="foreach: order">',
'      <li class="name">',
'        <h4 data-bind="text: name"></h4>',
'            <a href="#" data-bind="click: $component.removeItem">X</a>',
//'        <p data-bind="text: ingredients"></p>',
'        <ul data-bind="foreach: ingredients">',
'          <li>',
'            <b data-bind="text: $data"></b>',
'          </li>',
'        </ul>',
'      </li>',
'    </ul>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-12">',
'      <button class="btn btn-default" id="Done">Go Back</button>',
'      <button type="submit" class="btn btn-default" id="Done">Ok</button>',
'    </div>',
'  </div>',
'</form>'
].join("\n");
ko.components.register('food-order', {
  viewModel: function(params) {
    var self = this;
    this.menu = params.menu;
    this.order = params.order;

    this.menuSwiper = new Swiper ('.menu-swiper-container', {
      // Optional parameters
      pagination: '.swiper-pagination',
      slidesPerView: 'auto',
      centeredSlides: true,
      paginationClickable: true,
      spaceBetween: 30,
      observer: false,
      loop: false
    });

    console.log(this.menu());
    console.log(this.order());

    this.menu.subscribe(function(dishes) {
      var self = this;
      console.log(dishes);
      this.menuSwiper.removeAllSlides();
      dishes.forEach(function(dish, index){
        console.log(this.menuSwiper);
        console.log(index);
        //this.menuSwiper.appendSlide('<div class="swiper-slide" data-value="'+index+'">' + dish.name + '<img src="' + dish.img + '" id="main-logo" class="img-responsive center-block img-rounded" alt="MeeTruck Logo"></div>');
        this.menuSwiper.appendSlide('<div class="swiper-slide" data-value="'+index+'">' + dish.name + '</div>');
      }.bind(this));

      $('.swiper-slide').click(function(){
        console.log(self);
        console.log($(this).data('value'));
        //self.order.push(self.menu()[$(this).data('value')]);
        self.order.push( new Dish(self.menu()[$(this).data('value')]))
        console.log(self.order());
      });
      //<img id="main-logo" class="img-responsive center-block img-rounded" alt="MeeTruck Logo">
    }.bind(this));

  self.removeItem = function(item) {
    console.log(self);
    console.log(this);
    self.order.remove(item);
  };


    this.menu(this.menu());
  },
  template: menuItem
});


var confirmation = [
'<div class="row">',
'    <div class="col-xs-12 col-md-12">',
'      <h2>PU Phrase:</h2>',
'      <h1 data-bind="text: $parent.puPhrase">Pink Flamingo</h1>',
'    </div>',
'    <div class="col-xs-12 col-md-12">',
'      <h2>PU TIME:</h2>',
'      <h1 data-bind="text: $parent.puTime">9:29PM</h1>',
'    </div>',
'</div>',
'<div class="row">',
'    <div class="col-xs-12 col-md-12">',
'      <p>',
'        <button type="button" class="btn btn-primary btn-lg" data-bind="click: $parent.toArrived">Done</button>',
'      </p>',
'    </div>',
'</div>',
].join("\n");
ko.components.register('confirmation', {
  viewModel: function(formData) {

    this.submit = function(formData){
      console.log(formElement);
    };

  },
  template: confirmation
});


var arrived = [
'<div class="row">',
'    <div class="col-xs-12 col-md-12">',
'      <p>',
'        <button type="button" class="btn btn-primary btn-lg">Bring to Car</button>',
'      </p>',
'      <p>',
'        <button type="button" class="btn btn-primary btn-lg">Pick Up</button>',
'      </p>',
'    </div>',
'<div class="row">',
'    <div class="col-xs-12 col-md-12">',
'      <h2>PU Phrase:</h2>',
'      <h1 data-bind="text: $parent.puPhrase">Pink Flamingo</h1>',
'    </div>',
'<div class="row">',
'    <div class="col-xs-12 col-md-12">',
'      <p>',
'        <button type="button" class="btn btn-primary btn-lg" data-bind="click: $parent.toThankYou">Done</button>',
'      </p>',
'    </div>',
'</div>',
].join("\n");
ko.components.register('arrived', {
  viewModel: function(formData) {

    this.submit = function(formElement){
      console.log(formElement);
    };

  },
  template: arrived
});


var thankYou = [
'<div class="row">',
'    <div class="col-xs-12 col-md-12">',
'      <h1>Thank You:</h1>',
'    </div>',
'</div>',
'<div class="row">',
'    <div class="col-xs-12 col-md-12">',
'        <button type="button" class="btn btn-primary btn-lg" data-bind="click: $parent.toLogin">Done</button>',
'    </div>',
'</div>',
].join("\n");
ko.components.register('thank-you', {
  viewModel: function(formData) {

    this.submit = function(formElement){
      console.log(formElement);
    };

  },
  template: thankYou
});
