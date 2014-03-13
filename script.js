var phantom = require("node-phantom");
var phantomCluster = require("phantom-cluster");

exports.execute = function() {

  // return ph.createPage(function(err,page) {
  //   return page.open("http://tilomitra.com/repository/screenscrape/ajax.html", function(err,status) {


  //     console.log("opened site? ", status);

  //     // load jquery
  //     page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(err) {
  //       //jQuery Loaded.
  //       //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
  //       setTimeout(function() {
  //         return page.evaluate(function() {

  //           var h2Arr = [],
  //               pArr = [];

  //           $('h2').each(function() {
  //             h2Arr.push($(this).html());
  //           });
  //           $('p').each(function() {
  //             pArr.push($(this).html());
  //           });

  //           return {
  //             h2: h2Arr,
  //             p: pArr
  //           };
  //         }, function(err,result) {
  //           console.log(result);
  //           ph.exit();
  //         });
  //       }, 5000);
  //     });


  //   });
  // });

  });

  // create a phantom-cluster instance
  var engine = phantomCluster.create({ 
    numWorkers: 4
  });

  // query mongo for eligible users
  var emails = ["testemail@gmail.com"];


  // sequentially iterate through each email, careful not to
  // use any ajax since that will not be received
  for(var i; i<emails.length; i++) {

    // create a phantomjs instance
    phantom.create(function(err,ph) {

      return page.open("http://tilomitra.com/repository/screenscrape/ajax.html", function(err,status) {

        return page.evaluate(function() {

          // find all forms on the page
          var forms = document.getElementsByTagName('form');

          for (var f; f<forms.length; f++) {
            
            // check validity
            if (forms[i].getAttribute('method') == "POST" && isSignUp(forms[i])) {

              // get child html of form and parse it for text input
              var inputs = forms[i].children.getElementsByTagName('input'),
                  selects = document.getElementsByTagName('select');

              // fill in all dropdowns with first option after default
              for (var j=0;j<selects.length;j++ ) {
                selects[j].options[1].selected = true;
              }

              // fill in text and radiobox inputs
              for (var j; i<inputs.length; j++) {
                if (inputs[j].type === "text") {
                  // look up element and fill in
                } else if (inputs[j].type === "checkbox") {
                  // look up element and fill in
                } 

              }
            }

            // once we fill everything out, submit it!
            return forms[i].submit();
          }
        }
      }
    }
  }

  return "script finished";
};

var isSignUp = function(formHtml) {
  // filter on METHOD = "POST" and class, name, 
  // or id contains "newsletter", "email", or "signup", ignoring caps
  return true;
}

