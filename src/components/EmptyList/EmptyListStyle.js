const { StyleSheet, Dimensions } = require("react-native");

const {width, height} = Dimensions.get('window')

const emptyStyles = StyleSheet.create({
    container: { flex:1, alignItems:'center', padding:8, paddingVertical: height/5.75 }
})

export default emptyStyles