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

  var HTML = [
'<div class="main-title-overlay">',
'  <div class="container-fluid" id="truck-navi">',
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
'    <div id="main-form">',
'    </div>',
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

}

  var foodTruckDetail = [
'<div class="main-title-overlay">',
'  <div class="container-fluid" id="navi">',
'    <div class="form-group">',
'      <input type="input" class="form-control" id="filter" placeholder="Filter">',
'    </div>',
'    <div class="form-group">',
//'        <h1 id="truck-title" class="truck-title col-sm-12">MeeTruck</h1>',
'          <select class="form-control">',
'            <option>1</option>',
'            <option>2</option>',
'            <option>3</option>',
'            <option>4</option>',
'            <option>5</option>',
'          </select>',
'    </div>',
'    <div class="row">',
'        <div class="col-md-12">'
] + swiper + [
'        </div>',
'    </div>',
'    <div id="main-form">',
'    </div>',
'  </div>',
'  <div class="container-map">',
'    <div id="map-canvas"></div>',
'  </div>',
'</div>',
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
'    <div class="form-group special-requests">',
'      <div class="col-sm-3 col-sm-offset-4">',
'        <button type="button" class="btn btn-primary">No</button>',
'        <select class="form-control">',
'          <option>1</option>',
'          <option>2</option>',
'          <option>3</option>',
'          <option>4</option>',
'          <option>5</option>',
'        </select>',
'      </div>',
'    </div>'
  ].join("\n");

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

/*
Use Bootstrap's predefined grid classes to align labels and groups of form controls in a horizontal layout by adding .form-horizontal to the form (which doesn't have to be a <form>). Doing so changes .form-groups to behave as grid rows, so no need for .row.
*/
  var loginForm = [
'<form class="form-horizontal">',
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
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <div class="checkbox">',
'        <label>',
'          <input type="checkbox"> Remember me',
'        </label>',
'      </div>',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-3 col-sm-offset-3">',
'      <button class="btn btn-default" id="sign-in-btn">Sign in</button>',
'      <button class="btn btn-default" id="sign-up-btn">Sign up</button>',
'    </div>',
'  </div>',
'</form>',
  ].join("\n");


  var signupForm = [
'<form class="form-horizontal">',
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
'  <div class="form-group">',
//'    <label for="inputPassword3" class="col-sm-2 control-label">Password</label>',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <input type="password" class="form-control" id="verifyPassword" placeholder="Verify Password">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <div class="checkbox">',
'        <label>',
'          <input type="checkbox"> Remember me',
'        </label>',
'      </div>',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-sm-6 col-sm-offset-3">',
'      <button type="submit" class="btn btn-default" id="sign-in-btn">Sign up</button>',
'    </div>',
'  </div>',
'</form>',
  ].join("\n");


  var testingHTML = [
'<div class="top-input hidden-offscreen-left">',
'  <div class="paleo-search">',
'    <form data-bind="submit: neighborhoodSearch">',
'      <input class="search-bar" id="search-bar" type="text" ></input>',
'      <ul class="prediction-list">',
'      </ul>',
'    </form>',
'  </div>',
'  <div class="menu-btn">',
'    <button id="open-menu" class="btn btn-default paleo-btn" type="submit">',
'      <span class="glyphicon glyphicon-search"></span>',
'    </button>',
'  </div>',
'</div>',
'<div class="left hidden-offscreen-left">',
'  <h2 data-bind="text: query">Points of Interest</h2>',
'  <div>',
'    <ul class="paleo-list" data-bind="foreach: pois">',
'      <li data-bind="text: name"></li>',
'    </ul>',
'  </div>',
'  <div class="list-btn">',
'    <button id="open-list" class="btn btn-default paleo-btn" type="submit">',
'      <span class="glyphicon glyphicon-list"></span>',
'    </button>',
'  </div>',
'</div>',
'<div class="container-map">',
'  <div id="map-canvas"></div>',
'</div>',
'<footer class="hidden-offscreen-left">',
'  <a href="http://glyphicons.com/">glyphicons</a>',
'</footer>',
  ].join("/n");

  var addressHTML = [
'<address>',
'  <strong>Twitter, Inc.</strong><br>',
'  1355 Market Street, Suite 900<br>',
'  San Francisco, CA 94103<br>',
'  <abbr title="Phone">P:</abbr> (123) 456-7890',
'</address>'
  ].join("\n");