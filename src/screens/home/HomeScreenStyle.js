import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";


const { width, height } = Dimensions.get('window')

const itemShowNumber = 2
const itemSpace = 10
const itemWidth = (width - (itemSpace * itemShowNumber + 1)) / itemShowNumber
const itemHeight = itemWidth - (itemSpace * itemShowNumber)

export const homeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
        padding: 15
    },
    secondContainer: {
        width,
        height: height / 4 + itemHeight - 50,
    },
    containerRowSpaceBetween: {
        flexDirection: 'row',
        alignContent: 'space-between'
    },
    imageBackgroundStyle: {
        width,
        height: height / 3,
        alignItems: 'center',

    },
    pagination: {
        marginHorizontal: 4,
        width, height: 10
    },
    flatListItem: {
        width: itemWidth - 10,
        height: itemHeight,
        zIndex: 1
    },
    weeklyProductContainer: {
        // borderWidth:1,
        // borderColor: Colors.BORDER_COLOR,
        // padding: 8,
        margin: 8,
        // width: width,
        borderRadius: 5,
        flex: 1,
        zIndex: 0,
        resizeMode: 'contain'
    },
    itemPriceText: {
        fontFamily:'Inter_500Medium', 
        color: Colors.PRIMARY, 
        fontWeight: 'bold', 
        marginBottom: 0 },
    heartButton: {
        alignItems: 'flex-end',
         alignContent: 'center', 
         marginRight: 5, 
         paddingTop: 10
    },
    showAllText: {fontFamily:'Inter_500Medium', textDecorationLine: 'underline', color: 'blue', marginRight: 10 },
    headerText: { fontFamily:'Inter_500Medium', fontWeight: 'bold' }
})