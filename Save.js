import React from 'react'
import {View, TextInput, Image, Text} from 'react-native'
import Button from './Button'
import { getFirestore, collection, getDocs, setDoc, doc, addDoc } from 'firebase/firestore/lite';
import {Blob} from 'firebase/firestore'
import { initializeApp } from 'firebase/app';
import {firebase} from 'firebase/compat/app'
import { PinchGestureHandler } from 'react-native-gesture-handler';

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
const database = getFirestore();

async function writeUserData(userId, imageUrl) {
    // set is used to save data
    const path = collection(database,"Mango Pictures" )
    const docData = {
        image : imageUrl
    }
    // console.log(imageUrl)

    // const docRef = database.collection('pictures').doc(userId)

    // await docRef.set({
    //     image: imageUrl
    // })

    const res = await addDoc(path, {image : "hello"}, {merge: true} )

    console.log(res.id)
    console.log("success")
  }

function Save(capturedImage) {

    const uploadImage = async () =>{
        console.log("hello")
        const uri = capturedImage.data;

        // console.log(uri)
        async function uploadImageAsync(uri) {
          const response = await fetch(uri);
          const blob = await response.blob();
          const ref = firebase
            .storage()
            .ref()
            .child("images/" + "mango");
        
          const snapshot = await ref.put(blob);
          return snapshot.downloadURL;
        }
        pics = uploadImageAsync(uri)
        console.log(pics)
        // const response = await fetch(uri)
        // console.log(response)
        // const blob = await response.blob()
        // var ref = firebase.storage.ref().child("image")
        // var firebase_blob = ref.put(blob)
      //   async function uploadImageAsync(uri) {
      //     const blob = await new Promise((resolve, reject) => {
      //       const xhr = new XMLHttpRequest();
      //       xhr.onload = function () {
      //         resolve(xhr.response);
      //       };
      //       xhr.onerror = function (e) {
      //         console.log(e);
      //       reject(new TypeError('network failed'));
      //       };
      //       xhr.responseType = 'blob';
      //       xhr.open('GET', uri, true);
      //       xhr.send(null);

      //   });
      //   console.log(blob)
      //   return blob
      //  }
      //   const blob = uploadImageAsync(uri)
        // const arr_blob = await blob.arrayBuffer()
        // const uint8_array = new Uint8Array(arr_blob)
        // console.log(uint8_array)
        // const firebase_blob = firebase.firestore.Blob(uint8_array)

        // const arr_blob = blob.toBase
        // const array_blob = await blob.arrayBuffer()

        // const response = await fetch(uri)
        
        // console.log(response)
        // convert to string (blob) to store in db
        // const blob = await response.blob();

        
        

        // console.log(blob)
        // writeUserData(Math.random().toString(36), blob)

        // const task = firebase 
        // .storage()
        // .ref()
        // .child(`post/${Math.random().toString(36)}`)
        // .put(blob)

        // const taskProgress = snapshot =>{
        //     console.log (`transferred: ${snapshot.bytesTransferred}`)

        // }

        // const taskCompleted = () => {
        //     task.snapshot.ref.getDownloadURL().then((snapshot) => {
        //         console.log(snapshot)
        //     })
        // }

        // const taskError = snapshot => {
        //     console.log(snapshot)
        // }

        // task.on("state_changed", taskProgress, taskError, taskCompleted)
        }
    
  return (
     <View style={{flex: 1}}>
    <Image source={{uri : capturedImage.data}} />
     <Text>
        hello
    </Text>
    <Button
      title="Upload Image to Database"
      function={uploadImage}
        // Flip the camera
      />
    <Button
      title="Analyze Image from Database "
      function={uploadImage}
        // Flip the camera
      />
    </View> 

  )
}

export default Save