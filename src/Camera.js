import React, {useState, useEffect, useRef} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import Button from './Button'
import Save from './Save'
import { Camera } from 'expo-camera';
import { NavigationType } from 'react-router-native';
// import * as firebase from "firebase"
// import RNFS from 'react-native-fs'

export default () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [capturedImage, setCapturedImage] = useState(null);

    // camera ref to access camera
    const camera = useRef(null)

    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);


    const takePicture = async () => { 
      if (!camera) return; 
      let photo = await camera.current.takePictureAsync({base64: true});
      setCapturedImage(photo.uri);

      // Actions.save(photo.uri)\
      Actions.save(photo.base64)
   };


  
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>

          <Camera style={styles.camera} type={type} ref={camera}>

            
        </Camera>
        <View style= {{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 70
          }}>
            <TouchableOpacity
            onPress={takePicture}
            style={{
            width: 50,
            height: 50,
            bottom: 0,
            borderRadius: 50,
            backgroundColor: '#fff'
            }}
            />
            </View>
        <Button
            title="Flip Camera"
            function={() =>  setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )}
              // Flip the camera
            >
               <Text>Flip</Text> 
            </Button>
          {capturedImage && <Image source={{uri : capturedImage}} style={{flex: 1}}/>}
        {/* <Button title="change page" function={() => Actions.home()}></Button> */}
        </View>
    )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
  });