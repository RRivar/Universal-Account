var heading = document.getElementById("heading");
var headingRef = firebase.database().ref().child("heading");
headingRef.on('value', function(datasnapchot) {
  heading.innerHTML = datasnapchot.val();
});
