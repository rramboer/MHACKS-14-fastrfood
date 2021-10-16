// import { getDatabase, ref, set } from "firebase/database";

function writeEntry(user, wait_time, location) {
  //better user id

  obj = {
    user: user,
    wait_time: wait_time,
    location: location,
    timestamp: Date()
  };

  firebase.database().ref('users/' + user+Date()).set(
    obj
    );
}

function print(){
    console.log("Pressed");
}