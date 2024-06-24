import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgQCPKlcucWihL6-8pdyp4M377TMNQulc",
  authDomain: "outside-72d66.firebaseapp.com",
  projectId: "outside-72d66",
  storageBucket: "outside-72d66.appspot.com",
  messagingSenderId: "4601109032",
  appId: "1:4601109032:web:157d9526d4abb3e681f31d",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
