/*
generic.js contains a number of functions that are used throughout the app.
*/
function createViewWithoutScrollbar(){
  var height = $('#login-screen').outerHeight(true) > $(window).height() ? $('#login-screen').outerHeight(true) : $(window).height() - $('.global-header').outerHeight(true);

  $('#scrollbar-remover-container')
  .height($(window).height() - $('.global-header').outerHeight(true))
  .width($(window).width());

  $('#spacer')
  .height(height);

  $('#main-form')
  .outerWidth($('#scrollbar-remover-container').width() + ($('#main-form').outerWidth() - $('#main-form')[0].clientWidth));
}


function resize(element){
      $(element)
      .css('margin-top', $('.login').outerHeight(true))
      .css('height', $(window).height() - $('.login').outerHeight(true)-$('.global-header').outerHeight(true));
}


function resizeMainForm(){
  $('#scrollbar-remover-container').height($(window).height() - $('.global-header').outerHeight(true));
}


function removeMainFormSizing(){
  $('#main-form').height('');
}

/*
function toggleSignIn() {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    // [START authanon]
    firebase.auth().signInAnonymously().catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/operation-not-allowed') {
        alert('You must enable Anonymous auth in the Firebase Console.');
      } else {
        console.error(error);
      }
      // [END_EXCLUDE]
    });
    // [END authanon]
  }
//  document.getElementById('quickstart-sign-in').disabled = true;
}
*/
/*
function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      // [START_EXCLUDE]
      console.log('Signed in');
      console.log(JSON.stringify(user, null, '  '));
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      console.log('Signed out');
      console.log(JSON.stringify(user, null, '  '));
//      document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
//      document.getElementById('quickstart-sign-in').textContent = 'Sign in';
//      document.getElementById('quickstart-account-details').textContent = 'null';
      // [END_EXCLUDE]
    }
    // [START_EXCLUDE]
//    document.getElementById('quickstart-sign-in').disabled = false;
    // [END_EXCLUDE]
  });
  // [END authstatelistener]
  document.getElementById('sign-in-btn').addEventListener('click', toggleSignIn, false);
}
*/

    /**
     * Handles the sign in button press.
     */
    function toggleSignIn() {
      console.log('signin');
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('sign-in-btn').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
      document.getElementById('sign-in-btn').disabled = true;
    }
    /**
     * Handles the sign up button press.
     */
    function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        console.log(error);

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          //alert(errorMessage);
        }
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    }
    /**
     * Sends an email verification to the user.
     */
    function sendEmailVerification() {
      // [START sendemailverification]
      firebase.auth().currentUser.sendEmailVerification()
      .then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    }
    function sendPasswordReset() {
      var email = document.getElementById('email').value;
      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail(email)
      .then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
    }
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    function initApp(cb) {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
//        document.getElementById('quickstart-verify-email').disabled = true;
        // [END_EXCLUDE]
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [START_EXCLUDE silent]
//          document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
//          document.getElementById('quickstart-sign-in').textContent = 'Sign out';
          console.log(JSON.stringify(user, null, '  '));
          cb();
          if (!emailVerified) {
            //document.getElementById('quickstart-verify-email').disabled = false;
            console.log('email not verified');
          }
          // [END_EXCLUDE]
        } else {
          // User is signed out.
          // [START_EXCLUDE silent]
//          document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
//          document.getElementById('quickstart-sign-in').textContent = 'Sign in';
          console.log('null');
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        document.getElementById('sign-in-btn').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authstatelistener]
      document.getElementById('sign-in-btn').addEventListener('click', toggleSignIn, false);
      document.getElementById('sign-up-btn').addEventListener('click', handleSignUp, false);
//      document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
//      document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
    }
