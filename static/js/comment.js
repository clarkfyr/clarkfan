var commentForm = document.getElementById("commentForm");
commentForm.addEventListener("submit", function(event) {
  var name = commentForm.Name.value;
  var message = commentForm.Message.value;
  if ((name.length != 0) && (message.length != 0)) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    var returnText = dateTime + "<br />"
    returnText += "User: " + name;
    returnText += "<br /> Message: ";
    returnText += message;
    returnText += "<br /><br />";
    document.getElementById("prevComment").innerHTML += returnText;
    document.getElementById("commentStat").innerHTML = "Thank you for you comment.";
    // commentForm.Name.value = "";
    // commentForm.Message.value = "";
  } else {
    var returnText = "Please leave both your name and message.";
    document.getElementById("commentStat").innerHTML = returnText;
  }
  event.preventDefault();
});
