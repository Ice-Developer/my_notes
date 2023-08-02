// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDzSbX0COF3Og4qndXji6-9j0KYEK2FMrU",
    authDomain: "ensolvers-challenge-751fd.firebaseapp.com",
    projectId: "ensolvers-challenge-751fd",
    storageBucket: "ensolvers-challenge-751fd.appspot.com",
    messagingSenderId: "137383436589",
    appId: "1:137383436589:web:de5678c10dc14fc7db73a4",
    measurementId: "G-JZY2H06NS0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
