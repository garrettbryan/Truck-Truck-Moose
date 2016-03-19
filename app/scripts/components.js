var puNumber = [
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
].join("\n");
ko.components.register('order-confirmation', {
  viewModel: function(formData) {

    this.chooseTruck = function(formElement){
      console.log(formElement);
    };

  },
  template: puNumber
});


var rendevoux = [
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
'        <button type="button" class="btn btn-primary btn-lg" data-bind="click: submit">Done</button>',
'      </p>',
'    </div>',
'</div>',
].join("\n");
ko.components.register('rendevoux', {
  viewModel: function(formData) {

    this.submit = function(formElement){
      console.log(formElement);
    };

  },
  template: rendevoux
});



var menuItem = [
'<form class="form-horizontal" data-bind="submit: submit">',
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'       <select class="form-control">',
'         <option>1</option>',
'         <option>2</option>',
'         <option>3</option>',
'         <option>4</option>',
'         <option>5</option>',
'       </select>',
'    </div>',
'  </div>',
'  <div id="special-requests-item-1">',
'  </div>',
'  <div id="add-special-request-button">',
'  </div>',
'</form>'
].join("\n");
ko.components.register('food-order', {
  viewModel: function(formData) {

    this.submit = function(formElement){
      console.log(formElement);
    };

  },
  template: menuItem
});


var foodTruckSelection = [
'<form class="form-horizontal" data-bind="submit: submit">',
'    <div class="form-group">',
'     <div class="col-sm-10">',
'      <input type="text" data-bind="value: $parent.userTruckFilter" class="form-control" id="truck-filter" placeholder="Filter">',
'    </div>',
'    </div>',
'    <div class="form-group">',
'     <div class="col-sm-12">',

//'        <h1 id="truck-title" class="truck-title col-sm-12">MeeTruck</h1>',
'          <select class="form-control">',
'            <option>1</option>',
'            <option>2</option>',
'            <option>3</option>',
'            <option>4</option>',
'            <option>5</option>',
'          </select>',
'    </div>',
'    </div>',
'    <div class="row">',
'        <div class="col-md-12">',
].join("\n") + swiper + [
'        </div>',
'    </div>',
'  <div class="form-group">',
'    <div class="col-sm-12">',
'      <button class="btn btn-default" id="Done">Go Back</button>',
'      <button type="submit" class="btn btn-default" id="Done">Ok</button>',
'    </div>',
'  </div>',
'</form>',
].join("\n");
ko.components.register('food-truck-selection', {
  viewModel: function(formData) {
    this.init = function(){
      var mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30,
        loop: true
      });
    };

    this.submit = function(formElement){
      console.log(formElement);
    };

  },
  template: foodTruckSelection
});





var destinationSelection = [
'<form class="form-horizontal" data-bind="submit: submit">',
'  <div class="form-group">',
'    <div class="col-xs-12 col-md-12">',
'      <input class="form-control data-bind="value: $parent.userStart" col-sm-6 search-bar" placeholder="Start" type="text">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-xs-12 col-md-12">',
'      <input class="form-control data-bind="value: $parent.userEnd" col-sm-6 search-bar" placeholder="End" type="text">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-2">',
'      <button type="submit" class="btn btn-default" id="Done">Done</button>',
'    </div>',
'  </div>',
'</form>'
].join("\n");
ko.components.register('destination-selection', {
  viewModel: function(formData) {

    this.submit = function(formElement){
      console.log(formElement);
    };

  },
  template: destinationSelection
});




var settings = [
'<form class="form-horizontal" data-bind="submit: submit">',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Name</label>',
'    <div class="col-xs-6 col-md-6">',
'        <p class="form-control-static" data-bind="text: $parent.userName">John Doe</p>',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Handle</label>',
'    <div class="col-xs-6 col-md-6">',
'        <p class="form-control-static" data-bind="value: $parent.userHandle">Cool Guy</p>',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Email</label>',
'    <div class="col-xs-6 col-md-6">',
'        <p class="form-control-static" data-bind="text: $parent.userEmail">John Doe</p>',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Average Position</label>',
'    <div class="col-xs-6 col-md-6">',
'      <input type="text" data-bind="text: $parent.userLatLng" class="form-control" placeholder="Lat,Long">',
'  </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Credit Card Number</label>',
'    <div class="col-xs-6 col-md-6">',
'      <input type="text" data-bind="value: $parent.userCCNumber" class="form-control" placeholder="xxxx xxxx xxxx xxxx">',
'  </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Expiration Date</label>',
'    <div class="col-xs-6 col-md-6">',
'      <input type="text" data-bind="value: $parent.userCCExpiration" class="form-control" placeholder="mm/yy">',
'  </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">CCV</label>',
'    <div class="col-xs-6 col-md-6">',
'      <input type="text" data-bind="value: $parent.userCCV" class="form-control" placeholder="xxxx">',
'  </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Include Weather Overlay</label>',
'    <div class="col-xs-6 col-md-6">',
'    <div class="checkbox">',
'      <label><input type="checkbox" data-bind="checked: $parent.weatherDisplay"> True </label>',
'  </div>',
'  </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-xs-3 col-md-3">',
'    </div>',
'    <div class="col-xs-3 col-md-3">',
'      <button type="submit" class="btn btn-default" id="sign-in-btn">Done</button>',
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




var signupForm = [
'<form class="form-horizontal" data-bind="submit: submit">',
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="text" data-bind="value: $parent.userName" class="form-control" id="name" placeholder="Name">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="email" data-bind="value: $parent.userEmail" class="form-control" id="inputEmail" placeholder="Email">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="text" data-bind="value: $parent.userHandle" class="form-control" id="handle" placeholder="Handle">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="password" data-bind="value: $parent.userPassword" class="form-control" id="createPassword" placeholder="Password">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <button type="submit" class="btn btn-default" id="sign-in-btn">Sign up</button>',
'    </div>',
'  </div>',
'</form>',
].join("\n");
ko.components.register('sign-up-form', {
  viewModel: function(formData) {
    this.submit = function(formElement){
      console.log('signup');
    };

  },
  template: signupForm
});




var signInForm = [
'<form class="form-horizontal" data-bind="submit: submit">',
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="email" data-bind="value: userEmail" class="form-control" id="inputEmail3" placeholder="email">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="password" data-bind="value: userPassword" class="form-control" id="inputPassword3" placeholder="Password">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-3 col-sm-offset-3">',
'      <button type="submit" class="btn btn-default" id="sign-in-btn">Sign in</button>',
'      <button class="btn btn-default" id="sign-up-btn" data-bind="click: $parent.signUp">Sign up</button>',
'    </div>',
'  </div>',
'</form>'
].join("\n");
ko.components.register('sign-in-form', {
  viewModel: function(params) {
    this.userEmail = params.userEmail || '';
    this.userPassword = params.userPassword || '';

    this.submit = function(){
      console.log(this.userEmail());
      console.log(this.userPassword());
    };

  },
  template: signInForm
});