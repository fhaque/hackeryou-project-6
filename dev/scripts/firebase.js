import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD_JJ03nCtT4lr2ZFsTQDXJFFoUdOOK93c",
    authDomain: "flakey-app.firebaseapp.com",
    databaseURL: "https://flakey-app.firebaseio.com",
    projectId: "flakey-app",
    storageBucket: "flakey-app.appspot.com",
    messagingSenderId: "742444737906"
};

console.log('firebase');
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;