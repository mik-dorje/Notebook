import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

// https://www.youtube.com/watch?v=lW8NWB1cvMA

const firebaseConfig = {
    apiKey: "AIzaSyBA3PNEOtXZBpmawnDv9MFfFaGQGPZPaYk",
    authDomain: "notebook-e0626.firebaseapp.com",
    projectId: "notebook-e0626",
    storageBucket: "notebook-e0626.appspot.com",
    messagingSenderId: "495093421056",
    appId: "1:495093421056:web:167aa815cf95db0a9b74e5",
    measurementId: "G-J2T4ZHX9DM"
};
  
firebase.initializeApp(firebaseConfig)

export const ref = firebase.firestore().collection("Privatebook");
// console.log(ref)

export const db = firebase.firestore()
export const ref1= db.collection("Privatebook")
// console.log(ref1)


