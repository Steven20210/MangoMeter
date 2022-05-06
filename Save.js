import React, {useState} from 'react'
import {View, TextInput, Image, Text} from 'react-native'
import Button from './Button'
import { getFirestore, collection, getDocs, setDoc, doc, addDoc } from 'firebase/firestore/lite';
import {getStorage, ref, uploadBytes} from "firebase/storage"
import {Blob} from 'firebase/firestore'
import { initializeApp } from 'firebase/app';
import {AnalyzeMango, condition} from './AnalyzeMango';
import {FileSystem} from 'expo-file-system';

import firebase from 'firebase/compat/app'
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
const locationName = "mango"
// Get a reference to the database service
const database = getFirestore();
const storage = getStorage();


async function writeUserData(imageUrl) {
    // set is used to save data
    // const path = collection(database,"Mango Pictures" )
    // // console.log(imageUrl)
    // console.log("hello")
    const storageRef = ref(storage, locationName)

    uploadBytes(storageRef, imageUrl).then ((snapshot) => {
      console.log("success")
    })
    // const docData = {
    //     image : imageUrl
    // }
    // const res = await addDoc(path, docData, {merge: true} )
  }

function Save(capturedImage) {

    var imag;
    let base64data;
    const uploadImage = async () =>{
        var uri = capturedImage.data;
        // console.log(uri)
        uri = "data:image/jpg;base64," + uri;
        const blob = await ( await fetch(uri)).blob()
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(blob); 
        fileReaderInstance.onload = () => {
        base64data = fileReaderInstance.result; 
        const poster = new File([blob], 'mango.jpg', {type:"image/jpg", lastModified:new Date()});
        // console.log(trunc_base64data) 
        writeUserData(poster);
 

        }


      }

    
  return (
     <View style={{flex: 1}}>
    <Image source={{uri : capturedImage.data}} />
    <Button
      title="Upload Image to Database"
      function={uploadImage}
        // Flip the camera
      />
    <Button
      title="Analyze Image from Database "
      function={AnalyzeMango}
        // Flip the camera
      />
      <Text>
        {condition}
      </Text>
    </View> 
  )
}

export default Save