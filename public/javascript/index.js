/*var mainText = document.getElementById("mainText");
var submitBtn = document.getElementById("submitBtn");
var fireHeading = document.getElementById("fireHeading");


var firebaseHeadingRef = firebase.database().ref().child("heading");
firebaseHeadingRef.on('value', function(datasnapchot) {
  fireHeading.innerHTML = datasnapchot.val();
});

function submitClick() {
  var firebaseRef = firebase.database().ref();
  var messageText = mainText.value
  firebaseRef.push().set(messageText);
}*/
/*$(document).ready(function() {
  var rootRef = firebase.database().ref().child("Users");
  rootRef.on("child_added", snap => {
    var name = snap.child("name").val();
    var email = snap.child("email").val();

    $("#table_body").append("<tr><td>"+name+"</td><td>"+email+"</td><td><button>Remove</button></td></tr>");
  });
});*/

function addUser(userId, userEmail, userPhone) {
  var userExist = firebase.database().ref('users/' + userId)
  userExist.once("value").then(function(snapshot) {
    var userExist = snapshot.exists();  // true
    if (!userExist) {
      firebase.database().ref('users/' + userId).set({
        email: userEmail,
        phone: userPhone
      });
    }
  });
}
function addRow() {
  $("#userData").find('tr:last').prev().after("<tr><td><div style='width:100%' class='mdl-textfield mdl-js-textfield'><select style='height:27px' class='mdl-textfield__input' id='DataName' name='DataName'><option selected disabled>Chose one</option></select></div></td><td><div class='mdl-textfield mdl-js-textfield' style='width:100%'><input class='mdl-textfield__input' type='text' id='childValue'></div></td><td style='text-align:center'><button class='mdl-button mdl-js-button mdl-button--icon' onclick='uploadRow()'><i class='material-icons'>done<i></button><button class='mdl-button mdl-js-button mdl-button--icon' onclick='deleteRow()'><i class='material-icons'>close</i></button></td></tr>");
}
function deleteRow(name = "") {
  var user = firebase.auth().currentUser;
  if (user != null) {
    var userId = user.uid;
  }
  if (name.length != 0) {
    firebase.database().ref('users/' + userId).child(name).set(null);
  } else {
    $("#userData").find('tr:last').prev().remove();
  }
}
function uploadRow(name1 = "", value = "") {
  var user = firebase.auth().currentUser;
  if (user != null) {
    var userId = user.uid;
  }
  if (value !== $('#'+$.escapeSelector(value)).val()) {
    if (value.length != 0) {
      var newValue = $('#'+$.escapeSelector(value)).val();
      alert("1..."+$('#'+$.escapeSelector(value)).val());
    } else {
      var newValue = $('#childValue').val();
      alert("2");
    }
  } else {
    var oldValue = true;
    alert("3");
  }
  if (name1 !== $('#'+$.escapeSelector(name1)).val()) {
    if (name1.length != 0) {
      var newName = $('#'+$.escapeSelector(name1)).val();
    } else {
      var newName = $('#childValue').val();
    }
  } else {
    var oldName = true;
  }
  alert($.escapeSelector(name));
  alert($.escapeSelector(value));
  alert(oldName);
  alert($.escapeSelector(newValue));
  if (!(oldValue == true && oldName == true)) {
    firebase.database().ref('users/' + userId).child(newName).set(newValue);
    firebase.database().ref('users/' + userId).child(name).remove();
  }
  if (oldName == true) {
    firebase.database().ref('users/' + userId).child(name).set(newValue);
  }
  if (oldValue == true) {
    firebase.database().ref('users/' + userId).child(newName).set(value);
    firebase.database().ref('users/' + userId).child(name).remove();
  }
}
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $('.login-cover').hide();
    var signInDialog = document.querySelector('#signinDialog');
    signInDialog.close();
    var user = firebase.auth().currentUser;
    if (user != null) {
      var userId = user.uid;
      var userEmail = user.email;
      var userName = user.displayName;
      var userPhone = user.phoneNumber;
    }
    addUser(userId, userEmail, userPhone);
    var usernamePlace = document.getElementById("username");
    if (userName != null) {
      usernamePlace.innerHTML = userName;
    } else if (userPhone != null) {
      usernamePlace.innerHTML = userPhone;
    } else {
      usernamePlace.innerHTML = "Error";
    }
    var rootRef = firebase.database().ref('users/' + userId).orderByKey();
    rootRef.on("value", function(snapshot) {
      $("#userData").empty();
      snapshot.forEach(function(childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        // childData will be the actual contents of the child
        var childData = childSnapshot.val();
        $("#userData").append("<tr><td><div class='mdl-textfield mdl-js-textfield' style='width:100%''><input class='mdl-textfield__input' type='text' id='"+key+"' value='"+key+"'></div></td><td><div class='mdl-textfield mdl-js-textfield' style='width:100%''><input class='mdl-textfield__input' type='text' id='"+childData+"' value='"+childData+"'></div></td><td style='text-align:center'><button class='mdl-button mdl-js-button mdl-button--icon' onclick='uploadRow(`"+key+"`, `"+childData+"`)' id='"+key+"_done'><i class='material-icons'>done<i></button><button class='mdl-button mdl-js-button mdl-button--icon' onclick='deleteRow(`"+key+"`)'><i class='material-icons'>close</i></button></td></tr>");
      });
      $("#userData").append("<tr><td colspan=3><button onclick='addRow()' class='mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored'><i class='material-icons'>add</i> add new</button></td></tr>");
    });
  } else {
    // No user is signed in.
    $('.login-cover').show();
    var signInDialog = document.querySelector('#signinDialog');
    if (! signInDialog.showModal) {
      dialogPolyfill.registerDialog(signInDialog);
    }
    signInDialog.showModal();
  }
});
