import { Dimensions, StyleSheet } from "react-native";
import Colors from "../constants/Colors";


const {width, height} = Dimensions.get('window')

const itemShowNumber = 2
const itemSpace = 10
const itemWidth = (width - (itemSpace * itemShowNumber + 1)) / itemShowNumber
const itemHeight = itemWidth - (itemSpace * itemShowNumber)

export const homeScreenStyles = StyleSheet.create({
    container: {
        width,
        height:height/3+40,
    },
    imageBackgroundStyle: {
        width,
        height:height/3,
        alignItems:'center',
        
    },
    pagination: {
        marginHorizontal:4,
        width,height : 10
    },
    flatListItem: {
        width: itemWidth - 10,
        height: itemHeight,
        zIndex:1
    },
    weeklyProductContainer: {
        borderWidth:1,
        borderColor: Colors.BORDER_COLOR,
        padding: 8,
        margin: 8,
        width: itemWidth,
        borderRadius:5,
        flex: 1,
        zIndex:0
    }
})