import { getFirestore } from "firebase/firestore/lite";
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCjqHxMJRmgLOlQHypAg4XZzXPwRG-IKtg",
  authDomain: "dear-reader-4043e.firebaseapp.com",
  projectId: "dear-reader-4043e",
  storageBucket: "dear-reader-4043e.firebasestorage.app",
  messagingSenderId: "164569578633",
  appId: "1:164569578633:web:fbd1256fc55effa31dda58",
  measurementId: "G-FETLGLM4ME",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//access storage
export const storage = getStorage();

//path to the root
export const storageRef = ref(storage);
