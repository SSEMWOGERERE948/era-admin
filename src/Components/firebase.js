import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Add this line for Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbRlAwriVq_8elrSRnOtZTJcwu_tGVECw",
    authDomain: "eziana-40455.firebaseapp.com",
    projectId: "eziana-40455",
    storageBucket: "eziana-40455.appspot.com",
    messagingSenderId: "245498184843",
    appId: "1:245498184843:web:5bfd6bc915660e4c85808e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize the Firebase Authentication service

export { db, auth }; // Export the auth module along with db
