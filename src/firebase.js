import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "dicography-v1.firebaseapp.com",
    databaseURL: "https://dicography-v1.firebaseio.com",
    projectId: "dicography-v1",
    storageBucket: "dicography-v1.appspot.com",
    messagingSenderId: "656221822201",
    appId: "1:656221822201:web:f9d4ac499d669826b99628"
};

firebase.initializeApp(config);

const database = firebase.firestore();

const usersRef = database.collection('users');
const songsRef = database.collection('songs');

export { usersRef, songsRef };