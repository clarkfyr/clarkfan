function validation_check() {
  // event.preventDefault();
  var adminForm = document.getElementById("adminForm");
  var slug = adminForm.Slug.value;
  var title = adminForm.Title.value;
  var content = adminForm.Content.value;
  if ((slug.length != 0) && (title.length != 0) && (content.length != 0) && (message.length != 0)) {
    return true;
  } else {
    var returnText = "Please fill out";
    var count = 0;
    if (slug.length == 0) {
      returnText += " field slug";
      count += 1;
    }
    if (title.length == 0) {
      if (count > 0) {
        returnText += ",";
      }
      returnText += " field title";
      count += 1;
    }
    if (content.length == 0) {
      if (count > 0) {
        returnText += ",";
      }
      if (count > 1) {
        returnText += " and";
      }
      returnText += " field content";
    }
    returnText += "."
    document.getElementById("adminResult").innerHTML = returnText;
  }
  return false;
}