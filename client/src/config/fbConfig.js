import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyD2h11TpbWGAQFZlrjGKfoiJjto9wp3wMw",
    authDomain: "eazy-grocery.firebaseapp.com",
    databaseURL: "https://eazy-grocery.firebaseio.com",
    projectId: "eazy-grocery",
    storageBucket: "eazy-grocery.appspot.com",
    messagingSenderId: "419582219083",
    appId: "1:419582219083:web:5e79d6daeaee9f0a00cece",
    measurementId: "G-V2GTQ4PCYE"
};

//firebase config
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();
