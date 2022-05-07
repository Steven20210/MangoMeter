import React, {useState} from 'react'
import {View, TextInput, Image, Text} from 'react-native'
import Button from './Button'
import { getFirestore, collection, getDocs, setDoc, doc, addDoc } from 'firebase/firestore/lite';
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {Blob} from 'firebase/firestore'
import { initializeApp } from 'firebase/app';
// import {AnalyzeMango, condition} from './AnalyzeMango';
import {FileSystem} from 'expo-file-system';

import firebase from 'firebase/compat/app'
import { PinchGestureHandler } from 'react-native-gesture-handler';

// put config info here

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

    const [conditionReturned, setCondition] = useState("Get Result")

    let base64data;
    const uploadImage = async () =>{
        var uri = capturedImage.data;

        // convert to a blob and download the image as a jpg
        uri = "data:image/jpg;base64," + uri;
        const blob = await ( await fetch(uri)).blob()
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(blob); 
        fileReaderInstance.onload = () => {
        base64data = fileReaderInstance.result; 
        const poster = new File([blob], 'mango.jpg', {type:"image/jpg", lastModified:new Date()});
        console.log("hello") 
        writeUserData(poster);
 

        }


      }

  
const AnalyzeMango = async () => {

    let mangoUrl = ""
    // Fetch data from storage
    const storage = getStorage();

    async function predictions() {
      let prediction = ""
      await fetch('http://2a0a-50-65-185-217.ngrok.io', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image: mangoUrl,
        })
        }).then
        ((response) => response.json()).then((json) => {
            prediction = json.prediction
        });
    
    setCondition(prediction)
    }

    const storageRef = ref(storage, 'gs://mangometer-2e7ef.appspot.com/mango')
    getDownloadURL(storageRef)
    .then((url) => {
    // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
        const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

        mangoUrl = url
    }).then(() =>{predictions()})

  
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
      title= "Analyze Mango"
      function={AnalyzeMango}
      />
    <Button
      title={conditionReturned}
      />

    </View> 
  )
}

export default Save