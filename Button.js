import React from 'react'
import {View, Text, Button} from 'react-native';
import styles from "./ButtonStyles"

const Buttons = (props) => {
    return (
        <View style={styles.appButtonContainer}>
            <Button
                color='white'
                title={props.title}
                onPress = {props.function}
            />
        </View>
    )
}

export default Buttons

