import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPtWXESFnsbG4qoPYVUKzvRGYjJF65zh0",
  authDomain: "fir-input-11d78.firebaseapp.com",
  projectId: "fir-input-11d78",
  storageBucket: "fir-input-11d78.appspot.com",
  messagingSenderId: "678702363910",
  appId: "1:678702363910:web:b88801904c4f9a05d7da87",
  measurementId: "G-7NMQJ1MWG4",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
