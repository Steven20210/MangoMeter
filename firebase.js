// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcYyXfjKk6qv0sH7TIoUrn6YDKdymzgz4",
  authDomain: "mangometer-2e7ef.firebaseapp.com",
  projectId: "mangometer-2e7ef",
  storageBucket: "mangometer-2e7ef.appspot.com",
  messagingSenderId: "518051065867",
  appId: "1:518051065867:web:5199adf00a301ae9ecd70e",
  measurementId: "G-FV5MLLLQHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);