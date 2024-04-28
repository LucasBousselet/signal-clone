// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use 
// https://firebase.google.com/docs/web/setup#available-libraries 
// Your web app's Firebase configuration 
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGIN_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore();

export { auth, db }