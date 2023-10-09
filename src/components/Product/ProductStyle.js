import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const {width, height} = Dimensions.get('window')
const itemShowNumber = 2
const itemSpace = 10
const itemWidth = (width - (itemSpace * itemShowNumber + 1)) / itemShowNumber

const productStyles = StyleSheet.create({
    textName: {width:itemWidth, color: Colors.SECONDARY}
})

export default productStyles