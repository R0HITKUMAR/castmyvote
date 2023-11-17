import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAw4lebDZkNSMKK1nB0cUrk3-M6d1s9foY",
    authDomain: "aboutrohitin.firebaseapp.com",
    databaseURL: "https://aboutrohitin-default-rtdb.firebaseio.com",
    projectId: "aboutrohitin",
    storageBucket: "aboutrohitin.appspot.com",
    messagingSenderId: "546826450895",
    appId: "1:546826450895:web:82cc8286ca7848f6e304ba"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
