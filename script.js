var email = "testemail@gmail.com"; // query mongo


var inputs = document.getElementsByTagName('input'),
    selects = document.getElementsByTagName('select');

 
// fill in all dropdowns with first option after default
for (var j=0;j<selects.length;j++ ) {
  selects[j].options[1].selected = true;
}


for (var j in inputs) {

  // fill in all text inputs  
  if (inputs[j].type === "text") {
    inputs[j].value = email;  
  } 
  // fill in all radio inputs
  // TODO: check that radio buttons not already checked
  else if (inputs[j].type === "checkbox") {
    inputs[j].click(); 
  }

  // click all submits (do last)
  // TODO: Make this only click the last submit
  // TODO: Use form submit instead
  else if (inputs[j].type === "submit" || inputs[j].type === "Submit") {
    inputs[j].click();
  }
  
}



