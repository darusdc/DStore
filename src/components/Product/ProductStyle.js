import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const {width, height} = Dimensions.get('window')
const itemShowNumber = 2
const itemSpace = 10
const itemWidth = (width - (itemSpace * itemShowNumber + 1)) / itemShowNumber
const itemHeight = itemWidth - (itemSpace * itemShowNumber)
const productStyles = StyleSheet.create({
    textName: {width:itemWidth -10, color: Colors.SECONDARY},
    weeklyProductContainer: {
        // borderWidth:1,
        // borderColor: Colors.BORDER_COLOR,
        // padding: 8,
        // width: width,
        marginHorizontal: 10,
        // marginRight:5,
        marginVertical: 5,
        borderRadius: 5,
        flex: 1,
        zIndex: 0,
        resizeMode: 'contain'
    },
    flatListItem: {
        width: itemWidth - 10,
        height: itemHeight,
        zIndex: 1
    },
})

export default productStyles