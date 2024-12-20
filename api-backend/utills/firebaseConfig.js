// Import the functions you need from the SDKs you need

const { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDLDWvl0Y6Hk9RiR5zqm9Ltb8GNKhPc5FA",
//     authDomain: "foodvend-1587e.firebaseapp.com",
//     projectId: "foodvend-1587e",
//     storageBucket: "foodvend-1587e.appspot.com",
//     messagingSenderId: "809122678715",
//     appId: "1:809122678715:web:5755645cf30a137651e69e"
// };
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: "foodvend-1587e.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const initializeFirebase = initializeApp(firebaseConfig);

module.exports = initializeFirebase;