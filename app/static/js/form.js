$(function(){

  // home page signup button
  $('#signup-btn').on('click', function(e){
    e.preventDefault();

    // store the signup data
    var newUserData = $('#signup-form');

    if (validateForm(newUserData.val()) !== true) {
        $("#err").modal("show");
        $('#err .modal-body').text('Please enter a valid email address.');
    } else {
  
      $.ajax({
        type: "POST",
        dataType: "json",
        url: $SCRIPT_ROOT + '/create',
        data: newUserData.serialize()
      }).done(function(data) {
          if(data.errors) {
              $("#err").modal("show");
              $("#err .modal-body").text(data["errors"]);
          } else {
            $("#intro").modal("show");      
            $('#intro .modal-body').text(data["email"] + " has been signed up for InboxNuke. Once the request is processed, this email address will start receiving extremely large amounts of email newsletters.");
          }

          
      });
    }
  });

  function validateForm(email) {
    console.log(email);
    var atpos=email.indexOf("@");
    var dotpos=email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
      return false;
    } else {
      return true;
    }
  }

});