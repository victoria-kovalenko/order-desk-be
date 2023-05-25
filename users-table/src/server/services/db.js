import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAFqG-HjDTp_y0GFzanTVZ9qrY4R9fpc98",
  authDomain: "users-table-de113.firebaseapp.com",
  databaseURL: "https://users-table-de113-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "users-table-de113",
  storageBucket: "users-table-de113.appspot.com",
  messagingSenderId: "911839368571",
  appId: "1:911839368571:web:73e248191f24f7b41e59de",
  measurementId: "G-RR010FBJP4"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const user = db.collection("Users");
