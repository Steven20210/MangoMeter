import { StatusBar } from 'expo-status-bar';
import react from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux'

import Home from './Home';
import Camera from './Camera';

export default function App() {
  return (
    <Router>
      
    <Scene key = "root" >
       <Scene key = "home" title = "MangoMeter" component = {Home} initial = {true} />
       <Scene key = "camera" component = {Camera} title = "Camera" />
    </Scene>
 </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8242',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
