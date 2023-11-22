// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyC5NnnKNXtgWqhUYTpe6j7o0lCfwBp4HQg",
    authDomain: "cdtt-1ba2a.firebaseapp.com",
    databaseURL: "https://cdtt-1ba2a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cdtt-1ba2a",
    storageBucket: "cdtt-1ba2a.appspot.com",
    messagingSenderId: "625667945221",
    appId: "1:625667945221:web:3e16e12bb7e1691489fd6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);