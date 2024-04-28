// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use 
// https://firebase.google.com/docs/web/setup#available-libraries 
// Your web app's Firebase configuration 
const firebaseConfig = {
    apiKey: "AIzaSyA2ep7xBqr_fcHHsjVLlddBRIUdq-CPPRE",
    authDomain: "signal-clone-9926c.firebaseapp.com",
    projectId: "signal-clone-9926c",
    storageBucket: "signal-clone-9926c.appspot.com",
    messagingSenderId: "205984209583",
    appId: "1:205984209583:web:b2626b6de04578e28ed25a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore();

export { auth, db }