function validation_check() {
  // event.preventDefault();
  var contactForm = document.getElementById("contactMeForm");
  var name = contactForm.Name.value;
  var email = contactForm.Email.value;
  var subject = contactForm.Subject.value;
  var message = contactForm.Message.value;
  if ((name.length != 0) && (email.length != 0) && (subject.length != 0) && (message.length != 0)) {
    document.getElementById("submitResult").style.display = "block"
    document.getElementById("submitResult").innerHTML = "Hi " + name + ", your message has been sent";
    // contactForm.Name.value = "";
    // contactForm.Email.value = "";
    // contactForm.Subject.value = "";
    // contactForm.Message.value = "";
    return true;
  } else {
    var returnText = "Please fill out";
    var count = 0;
    if (name.length == 0) {
      returnText += " field Name";
      count += 1;
    }
    if (email.length == 0) {
      if (count > 0) {
        returnText += ",";
      }
      returnText += " field Email";
      count += 1;
    }
    if (subject.length == 0) {
      if (count > 0) {
        returnText += ",";
      }
      returnText += " field Subject";
      count += 1;
    }
    if (message.length == 0) {
      if (count > 0) {
        returnText += ",";
      }
      if (count > 1) {
        returnText += " and";
      }
      returnText += " field Message";
    }
    returnText += "."
    document.getElementById("submitResult").innerHTML = returnText;
  }
  return false;
}