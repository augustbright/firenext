// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "firebase/storage";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9rvHRifbuGufSTBopLCiNtrK3eaUfmaI",
  authDomain: "firenext-7211b.firebaseapp.com",
  projectId: "firenext-7211b",
  storageBucket: "firenext-7211b.appspot.com",
  messagingSenderId: "249391423983",
  appId: "1:249391423983:web:dfc8a4285ae1a2be1ed61a"
};

// Initialize Firebase
if (!getApps().length) {
    initializeApp(firebaseConfig);
}

const app = getApps()[0];

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export const googleAuthProvider = new GoogleAuthProvider();
