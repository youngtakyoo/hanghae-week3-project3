import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBUWQK5qltc9W0GcinqAUo0C_ESsPPkMNU",
    authDomain: "w3-3-89c26.firebaseapp.com",
    projectId: "w3-3-89c26",
    storageBucket: "w3-3-89c26.appspot.com",
    messagingSenderId: "798127127296",
    appId: "1:798127127296:web:0e83379c0135f1092451e5",
    measurementId: "G-KJLYWKV3VZ"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const apiKey = firebaseConfig.apiKey;
  const firestore = firebase.firestore();
  const storage = firebase.storage();
  const realtime = firebase.database();

export {auth, apiKey, firestore, storage, realtime}