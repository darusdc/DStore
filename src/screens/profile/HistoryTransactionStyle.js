import { StyleSheet } from "react-native"
import Colors from "../../constants/Colors"
const borderWidth = 0.5
const HTstyles = StyleSheet.create({
    FlatList_1: { padding: 20 },
    orderTitleBar:{
        borderTopWidth: borderWidth,
        borderLeftWidth: borderWidth,
        borderRightWidth: borderWidth
    },
    FlatList_2: { 
        borderLeftWidth: borderWidth,
        borderRightWidth: borderWidth
    },
    moreProductText:{
        color: Colors.GRAY_TEXT,
        paddingLeft: 20,
        marginTop: -5
    },
    orderFooter: {
        borderLeftWidth: borderWidth,
        borderBottomWidth: borderWidth,
        borderRightWidth: borderWidth
    }
})

export default HTstyles