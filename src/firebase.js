import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc, addDoc } from 'firebase/firestore/lite';

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

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const firebase = getFirestore();

export default firebase