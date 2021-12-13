const firebaseConfig = {
    apiKey: "AIzaSyCiCjNo7h8SBeIpy54_x5Fp9K4u2rYU68o",
    authDomain: "repcard-68a86.firebaseapp.com",
    databaseURL: "https://repcard-68a86-default-rtdb.firebaseio.com",
    projectId: "repcard-68a86",
    storageBucket: "repcard-68a86.appspot.com",
    messagingSenderId: "268606048540",
    appId: "1:268606048540:web:9fc7a08a01bc124f2e92d9"
  };

  firebase.initializeApp(firebaseConfig);

function logout(){
    localStorage.removeItem("userName");
    localStorage.removeItem("OpenedRep");
    window.location = "index.html";
}

room_name = localStorage.getItem("OpenedRep");
user_name = localStorage.getItem("userName");
proffession = localStorage.getItem("Prof");

function messages(){
    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    })
    msg = document.getElementById("msg").value;
          firebase.database().ref(room_name).push({
                name:user_name,
                message:msg,
                like:0,
                writtenBy: proffession
          });

          document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
 console.log(firebase_message_id);
 console.log(message_data);
 name = message_data['name'];
 message = message_data['message'];
 wrote = message_data['writtenBy'];
 console.log(message);
 like = message_data['like'];
 name_with_tag = "<h4>" + name + "</h4>";
 like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
 span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

 if(wrote == "teacher"){
    message_with_tag = "<h4 class='message_h4_bold'>" + message + "</h4>";
} else{
    message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
}

 row = name_with_tag + message_with_tag + like_button + span_with_tag;
 document.getElementById("output").innerHTML += row;
//End code
 } });  }); }
getData();

function updateLike(message_id){
 console.log("clicked on button - " + message_id);
 button_id = message_id;
 likes = document.getElementById(button_id).value;
 updated_likes = Number(likes) + 1;
 console.log(updated_likes);

 firebase.database().ref(room_name).child(message_id).update({
       like: updated_likes
 });
}

function home(){
    localStorage.removeItem("OpenedRep");
    window.location = "home_page.html";
}