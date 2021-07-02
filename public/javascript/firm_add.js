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
    var rootRef = firebase.database().ref('Fields/').orderByKey();
    rootRef.on("value", function(snapshot) {
      $("#fieldData").empty();
      snapshot.forEach(function(childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        // childData will be the actual contents of the child
        var childData = childSnapshot.val();
        $("#fieldData").append("<tr><td><div class='mdl-textfield mdl-js-textfield' style='width:100%''><input class='mdl-textfield__input' type='text' id='"+key+"' value='"+key+"'></div></td><td><div class='mdl-textfield mdl-js-textfield' style='width:100%''><input class='mdl-textfield__input' type='text' id='"+childData+"' value='"+childData+"'></div></td><td style='text-align:center'><button class='mdl-button mdl-js-button mdl-button--icon' onclick='uploadRow(`"+key+"`, `"+childData+"`)' id='"+key+"_done'><i class='material-icons'>done<i></button><button class='mdl-button mdl-js-button mdl-button--icon' onclick='deleteRow(`"+key+"`)'><i class='material-icons'>close</i></button></td></tr>");
      });
      $("#fieldData").append("<tr><td colspan=3><button onclick='addRow()' class='mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored'><i class='material-icons'>add</i> add new</button></td></tr>");
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
function addRow() {
  $("#fieldData").find('tr:last').prev().after("<tr><td><div style='width:100%' class='mdl-textfield mdl-js-textfield'><select style='height:27px' class='mdl-textfield__input' id='DataName' name='DataName'><option selected disabled>Chose one</option></select></div></td><td><div class='mdl-textfield mdl-js-textfield' style='width:100%'><input class='mdl-textfield__input' type='text' id='childValue'></div></td><td style='text-align:center'><button class='mdl-button mdl-js-button mdl-button--icon' onclick='uploadRow()'><i class='material-icons'>done<i></button><button class='mdl-button mdl-js-button mdl-button--icon' onclick='deleteRow()'><i class='material-icons'>close</i></button></td></tr>");
}
function deleteRow(name = "") {
  var user = firebase.auth().currentUser;
  if (user != null) {
    var userId = user.uid;
  }
  if (name.length != 0) {
    firebase.database().ref('users/' + userId).child(name).set(null);
  } else {
    $("#fieldData").find('tr:last').prev().remove();
  }
}
function uploadRow(name = "", value = "") {
  alert('username');
  alert($.escapeSelector('username'));
  var user = firebase.auth().currentUser;
  if (user != null) {
    var userId = user.uid;
  }
  if (name !== $('#'+$.escapeSelector(name)).val()) {
    if (name.length != 0) {
      var newName = $('#'+$.escapeSelector(name)).val();
    } else {
      var newName = $('#key').val();
    }
  } else {
    var oldName = true
  }
  if (value !== $('#'+$.escapeSelector(value)).val()) {
    if (value.length != 0) {
      var newValue = $('#'+$.escapeSelector(value)).val();
    } else {
      var newValue = $('#childValue').val();
    }
  } else {
    var oldValue = true;
  }
  alert(newName);
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
