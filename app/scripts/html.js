  var Settings = [
'<form class="form-horizontal">',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Name</label>',
'    <div class="col-xs-6 col-md-6">',
'        <p class="form-control-static">John Doe</p>',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Handle</label>',
'    <div class="col-xs-6 col-md-6">',
'        <p class="form-control-static">Cool Guy</p>',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Email</label>',
'    <div class="col-xs-6 col-md-6">',
'        <p class="form-control-static">coolguy@example.com</p>',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Average Position</label>',
'    <div class="col-xs-6 col-md-6">',
'      <input type="text" class="form-control" placeholder="Lat,Long">',
'  </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Credit Card Number</label>',
'    <div class="col-xs-6 col-md-6">',
'      <input type="text" class="form-control" placeholder="xxxx xxxx xxxx xxxx">',
'  </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Expiration Date</label>',
'    <div class="col-xs-6 col-md-6">',
'      <input type="text" class="form-control" placeholder="mm/yy">',
'  </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">CCV</label>',
'    <div class="col-xs-6 col-md-6">',
'      <input type="text" class="form-control" placeholder="xxxx">',
'  </div>',
'  </div>',
'  <div class="form-group">',
'    <label for="" class="col-xs-3 col-md-3 control-label">Include Weather Overlay</label>',
'    <div class="col-xs-6 col-md-6">',
'    <div class="checkbox">',
'      <label><input type="checkbox"> True </label>',
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

var puNumber = [
'<div class="row">',
'    <div class="col-xs-12 col-md-12">',
'      <h2>PU Phrase:</h2>',
'      <h1>Pink Flamingo</h1>',
'    </div>',
'    <div class="col-xs-12 col-md-12">',
'      <h2>PU TIME:</h2>',
'      <h1>9:29PM</h1>',
'    </div>',
'</div>',
].join("\n");

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
'      <h1>Pink Flamingo</h1>',
'    </div>',
'<div class="row">',
'    <div class="col-xs-12 col-md-12">',
'      <p>',
'        <button type="button" class="btn btn-primary btn-lg">Done</button>',
'      </p>',
'    </div>',
'</div>',
].join("\n");

  var DestinationSelection = [
'<form class="form-horizontal">',
'  <div class="form-group">',
'    <div class="col-xs-12 col-md-12">',
'      <input class="form-control col-sm-6 search-bar" placeholder="Start" type="text">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-xs-12 col-md-12">',
'      <input class="form-control col-sm-6 search-bar" placeholder="End" type="text">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-2">',
'      <button type="submit" class="btn btn-default" id="Done">Done</button>',
'    </div>',
'  </div>',
'</form>',
  ].join("\n");


  var pageHTML = [
'<div class="container" id="kitty-klicker">',
'  <div class="row">',
'      <h1 id="title" class="title col-sm-12 center">Kitty Klicker</h1>',
'  </div>',
'  <div class="row">',
'      <div id="kitty-kontainer" class="col-sm-12">',
'          <h2>cat 1 Clicks <span id="kitty-klicks">0</span></h2>',
'      </div>',
'  </div>',
'  <div class="row">',
'      <div id="kitty-img" class="col-sm-10">',
'          <img src="img/cat1.jpg">',
'      </div>',
'      <div class="col-sm-2">',
'          <ul id="kitty-list" class="list-unstyled">',
'          </ul>',
'      </div>',
'  </div>',
'  <div class="row">',
'      <div class="col-sm-2">',
'          <button id="admin" class="btn btn-default btn-block" type="button">Admin</button>',
'      </div>',
'      <div id="form" class="col-sm-4">',
'      </div>',
'      <div class="col-sm-6"></div>',
'  </div>',
'</div>'
  ].join("\n");

var logo = [
'    <div class="row main-title-row">',
'        <h1 id="main-title" class="main-title col-sm-12">MeeTruck</h1>',
'    </div>',
'    <div class="row">',
'        <div class="col-md-12">',
'           <div class="main-logo-container">',
'             <img id="main-logo" class="img-responsive center-block img-rounded" src="http://dummyimage.com/200/000/fff" alt="MeeTruck Logo">',
'           </div>',
'        </div>',
'    </div>',
'    <br />'
].join("\n");

  var HTML = [
'<div class="main-title-overlay">',
'  <div class="container-fluid" id="truck-navi">',
'  </div>',
'  <div class="container-fluid" data-bind="html: details" id="main-form">',
'  </div>',
'  <div class="container-map">',
'    <div id="map-canvas"></div>',
'  </div>',
'</div>',
  ].join("\n");

  var SearchHTML = function(num){
    return [
  '<div class="container-search" id="list-container-'+num+'">',
  '</div>'
    ].join("\n");
};

var swiper = [
'<div class="swiper-container">',
'    <!-- Additional required wrapper -->',
'    <div class="swiper-wrapper">',
'        <!-- Slides -->',
'        <div class="swiper-slide"><img id="main-logo" class="img-responsive center-block img-rounded" src="http://dummyimage.com/200/333/fff" alt="MeeTruck Logo"></div>',
'        <div class="swiper-slide"><img id="main-logo" class="img-responsive center-block img-rounded" src="http://dummyimage.com/200/000/fff" alt="MeeTruck Logo"></div>',
'        <div class="swiper-slide"><img id="main-logo" class="img-responsive center-block img-rounded" src="http://dummyimage.com/200/999/fff" alt="MeeTruck Logo"></div>',
'    </div>',
'    <!-- If we need pagination -->',
'    <div class="swiper-pagination"></div>',
'</div>'
].join("\n");


  var foodTruckDetail = [
'<form class="form-horizontal">',
'    <div class="form-group">',
'     <div class="col-sm-10">',
'      <input type="text" class="form-control" id="truck-filter" placeholder="Filter">',
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
'        <div class="col-md-12">'
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

  var addMenuItemButton = [
'    <div class="col-sm-3 col-sm-offset-4">',
'        <button type="button" class="btn btn-primary">Add Menu Item</button>',
'    </div>',
  ].join("\n");

  var menuItem = [
'<form class="form-horizontal">',
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

  var addSpecialRequestButton = [
'  <div class="form-group">',
'    <div class="col-sm-9 col-sm-offset-4">',
'        <button type="button" class="btn btn-primary">Add Special Request</button>',
'    </div>',
'  </div>'
  ].join("\n");

  var specialRequest = [
'<div class="row">',
'<div class="col-sm-offset-4 col-sm-2>',
'<form class="form-inline">',
'    <div class="input-group has-success">',
'      <div class="input-group-addon">Add</div>',
'        <select class="form-control">',
'          <option></option>',
'          <option>Lettuce</option>',
'          <option>Tomato</option>',
'          <option>Mustard</option>',
'          <option>Banana</option>',
'          <option>Ketchup</option>',
'        </select>',
'      <div class="input-group-addon">$1.00</div>',
'      </div>',
'    </div>',
'</form>',
'</div>',
'</div>'
  ].join("\n");


/*
Use Bootstrap's predefined grid classes to align labels and groups of form controls in a horizontal layout by adding .form-horizontal to the form (which doesn't have to be a <form>). Doing so changes .form-groups to behave as grid rows, so no need for .row.
*/
  var signInForm = [
'<form class="form-horizontal" data-bind="submit: signIn">',
'  <div class="form-group">',
//'    <label for="inputEmail3" class="col-sm-2 control-label">Email</label>',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">',
'    </div>',
'  </div>',
'  <div class="form-group">',
//'    <label for="inputPassword3" class="col-sm-2 control-label">Password</label>',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="password" class="form-control" id="inputPassword3" placeholder="Password">',
'    </div>',
'  </div>',
//'  <div class="form-group">',
//'    <div class="col-sm-6 col-sm-offset-3">',
//'      <div class="checkbox">',
//'        <label>',
//'          <input type="checkbox" id="remember-me"> Remember me',
//'        </label>',
//'      </div>',
//'    </div>',
//'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-3 col-sm-offset-3">',
'      <button type="submit" class="btn btn-default" id="sign-in-btn">Sign in</button>',
'      <button class="btn btn-default" id="sign-up-btn" data-bind="click: signUp">Sign up</button>',
'    </div>',
'  </div>',
'</form>'
  ].join("\n");


  var signupForm = [
'<form class="form-horizontal">',
'  <div class="form-group">',
//'    <label for="inputPassword3" class="col-sm-2 control-label">Password</label>',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="text" class="form-control" id="name" placeholder="Name">',
'    </div>',
'  </div>',
'  <div class="form-group">',
//'    <label for="inputEmail3" class="col-sm-2 control-label">Email</label>',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="email" class="form-control" id="inputEmail" placeholder="Email">',
'    </div>',
'  </div>',
'  <div class="form-group">',
//'    <label for="inputEmail3" class="col-sm-2 control-label">Email</label>',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="text" class="form-control" id="handle" placeholder="Handle">',
'    </div>',
'  </div>',
'  <div class="form-group">',
//'    <label for="inputPassword3" class="col-sm-2 control-label">Password</label>',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="password" class="form-control" id="createPassword" placeholder="Password">',
'    </div>',
'  </div>',
//'  <div class="form-group">',
//'    <div class="col-sm-6 col-sm-offset-3">',
//'      <div class="checkbox">',
//'        <label>',
//'          <input type="checkbox"> Remember me',
//'        </label>',
//'      </div>',
//'    </div>',
//'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <button type="submit" class="btn btn-default" id="sign-in-btn">Sign up</button>',
'    </div>',
'  </div>',
'</form>',
  ].join("\n");


  var testingHTML = [

  ].join("/n");

  var addressHTML = [
'<address>',
'  <strong>Twitter, Inc.</strong><br>',
'  1355 Market Street, Suite 900<br>',
'  San Francisco, CA 94103<br>',
'  <abbr title="Phone">P:</abbr> (123) 456-7890',
'</address>'
  ].join("\n");