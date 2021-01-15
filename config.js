import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCqB9Z44dJ45NHwfP5gOeD03ZyUTdlTUQ8",
  authDomain: "book-santa-app-cc157.firebaseapp.com",
  projectId: "book-santa-app-cc157",
  storageBucket: "book-santa-app-cc157.appspot.com",
  messagingSenderId: "873759294454",
  appId: "1:873759294454:web:eb077de060fd70b5e97dd7",
  measurementId: "G-EN1RYS3741"
};
  //if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    //firebase.analytics();
  //}
  export default firebase.firestore();