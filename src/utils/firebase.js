import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPRjiqlJCapf9vxCiwFz3R8A6Kw2AZPzY",
  authDomain: "react-firebase-d3ee1.firebaseapp.com",
  projectId: "react-firebase-d3ee1",
  storageBucket: "react-firebase-d3ee1.appspot.com",
  messagingSenderId: "679613417164",
  appId: "1:679613417164:web:24eb2d6d22f1f493c66469",
};

firebase.initializeApp(firebaseConfig);
firebase.auth();

export const storage = firebase.storage();
export const storageRef = storage.ref();

export const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const db = firebase.firestore();
export const carsCollection = db.collection("cars");
export const siteCollection = db.collection("site");
export const emploeeRef = siteCollection.doc("emploees");
export const adminsRef = emploeeRef.collection("admins");

export default firebase;
