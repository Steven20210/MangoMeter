import {StyleSheet} from "react-native"

export default StyleSheet.create({
    title: {
        textAlign: 'center',
        marginVertical: 8,
        color: 'red'
      },
      fixToText: {
        color:'red',

        textAlign: 'right',
        flexDirection: 'row',
        justifyContent: 'space-between',

      },
      appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        margin: 10
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }

})