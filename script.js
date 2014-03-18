var phantom = require("node-phantom");
var phantomCluster = require("phantom-cluster");

exports.execute = function() {

  // create a phantom-cluster instance
  // TODO: actually incorporate this
  var engine = phantomCluster.create({ 
    numWorkers: 4
  });

  // query mongo for eligible users and urls
  var emails = ["testemail@gmail.com","testemail2@gmail.com"],
      urls = ["http://google.com","http://amazon.com", "http://yelp.com"];

  // sequentially iterate through each email, careful not to
  // use any ajax since that will not be received
  for (var i; i<emails.length; i++) {
    for (var j; j<urls.length; j++) {
      exports.emailSignUp(emails[i],urls[j]);
    }
  }

  return "script finished";
};

// takes in an email and a url and submits the email if a 
// valid form exists on that url
exports.emailSignUp = function(email,url) {

  // create a phantomjs instance
  phantom.create(function(err,ph) {

    ph.createPage(function(err,page) {

      page.onConsoleMessage = function(msg) {
        console.log('Page title is ' + msg);
      };

      // page.onResourceReceived = function(response) {
      //   console.log('Receive ' + JSON.stringify(response, undefined, 4));
      // };

      page.open(url, function(err,status) {

        var email = "test";

        page.evaluate(function(email) {

          console.log(email);

          // find all forms on the page
          var forms = document.getElementsByTagName('form');
  
          for (var f=0; f<forms.length; f++) {

            // check validity
            if (isValidSignUp(forms[f])) {

              // get child html of form and parse it for text input
              var inputs = forms[f].getElementsByTagName('input'),
                  selects = document.getElementsByTagName('select');

              // fill in all dropdowns with first option after default
              // for (var j=0; j<selects.length; j++ ) {
              //   selects[j].options[1].selected = true;
              // }

              console.log("outside");

              // fill in text and radiobox inputs
              for (var j=0; j<inputs.length; j++) {
                if (inputs[j].type === "text" || inputs[j].type === "hidden") {
                  console.log(email);
                  // look up element and fill in
                  inputs[j] = email;
                } 
                // else if (inputs[j].type === "checkbox") {
                //   // look up element and fill in
                // } 

              }

              // once we fill everything out, submit it!
              forms[f].submit();
            } 
          } 


          // checks to see if a form is a valid signup form
          function isValidSignUp(form) {
            // filter on METHOD = "POST" and class, name, 
            // or id contains "newsletter", "email", or "signup", ignoring caps
            if (form.method !== "POST" && form.method !== "post") {
              return false;
            }
            return true;
          }

          // console.log(document.location);
        },function(err,result) {}, "test");
      });
    });
  });

};
