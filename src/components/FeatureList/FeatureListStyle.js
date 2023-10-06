import { StyleSheet } from "react-native"
import Colors from "../../constants/Colors"

const featureListStyles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        paddingVertical: 20,
        alignItems: 'center',
        alignContent: 'space-between',
        borderBottomWidth: 0.2,
        borderColor:Colors.GRAY,
        height:80
    },
    textContainer:{ 
        flex: 1, 
        paddingHorizontal: 20 
    },
    titleText:{ 
        fontWeight: 'bold', 
        marginVertical: -5 ,
        verticalAlign:'middle'
    },
    rightIcon:{ flex: 1, alignItems: 'flex-end', paddingHorizontal:10, color:Colors.GRAY }
})

export default featureListStyles
