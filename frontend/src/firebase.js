import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyCmXujRp8ddjlev9zZI-nDAYXDokeUg0fs",
    authDomain: "filofax-ac98b.firebaseapp.com",
    projectId: "filofax-ac98b",
    storageBucket: "filofax-ac98b.appspot.com",
    messagingSenderId: "258848804528",
    appId: "1:258848804528:web:ca2e4e4fbd4a57dfad7575",
    measurementId: "G-C7RTCNQBKS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { auth, firebase };
