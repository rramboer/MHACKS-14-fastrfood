// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";

const firebaseConfig = {

    apiKey: "AIzaSyBNVKwm8UadwUfd9rreQVZWb1j7K4X4tO4",
  
    authDomain: "mhacks-14.firebaseapp.com",
  
    databaseURL: "https://mhacks-14-default-rtdb.firebaseio.com",
  
    projectId: "mhacks-14",
  
    storageBucket: "mhacks-14.appspot.com",
  
    messagingSenderId: "309874366751",
  
    appId: "1:309874366751:web:f22fc0ed70122cb3dbb82a",
  
    measurementId: "G-SKVY996HTG"
  
  };
  

const app = firebase.initializeApp(firebaseConfig)

const database = firebase.database();