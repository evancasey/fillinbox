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

      page.onResourceReceived = function(response) {
        console.log('Receive ' + JSON.stringify(response, undefined, 4));
      };

      page.open(url, function(err,status) {

        var response = page.evaluate(function() {

          // // find all forms on the page
          // var forms = document.getElementsByTagName('form');

          // for (var f; f<forms.length; f++) {
            
          //   // check validity
          //   if (forms[i].getAttribute('method') == "POST" && isValidSignUp(forms[i])) {

          //     // get child html of form and parse it for text input
          //     var inputs = forms[i].children.getElementsByTagName('input'),
          //         selects = document.getElementsByTagName('select');

          //     // fill in all dropdowns with first option after default
          //     for (var j=0;j<selects.length;j++ ) {
          //       selects[j].options[1].selected = true;
          //     }

          //     // fill in text and radiobox inputs
          //     for (var j; i<inputs.length; j++) {
          //       if (inputs[j].type === "text") {
          //         // look up element and fill in
          //       } else if (inputs[j].type === "checkbox") {
          //         // look up element and fill in
          //       } 

          //     }
          //   }

          //   // once we fill everything out, submit it!
          //   return forms[i].submit();
          // }
          console.log(document.location);
        });
      });
    });
  });

};


// checks to see if a form is a valid signup form
function isValidSignUp(formHtml) {
  // filter on METHOD = "POST" and class, name, 
  // or id contains "newsletter", "email", or "signup", ignoring caps
  return true;
}
