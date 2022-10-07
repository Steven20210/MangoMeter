import React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import Buttons from "./Button"
export default () => {
    return (
        <View style={styles.container}>
            <View style={styles.circle}/>
        <Buttons title="Analyze your Mango!" function= {() => Actions.camera()} ></Buttons>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent:'space-between',
        paddingTop: 120,
        paddingBottom: 130,
        backgroundColor: "#FF8242"
    },
    circle: {
        width: 250,
        height: 250,
        borderRadius: 250/2,
        backgroundColor:'#FFCC22',
        marginBottom: 150

    }
})