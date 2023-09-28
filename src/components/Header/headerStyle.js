import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const headerStyle = StyleSheet.create({
    container: {
        marginTop:20,
        flexDirection: 'row',
        height:65,
        justifyContent:'space-between',
        alignContent:'space-between',
        borderBottomWidth:1,
        borderColor:Colors.WHITE
    },
    secondContainer: {
        flexDirection:'row',
        padding: 8,
        alignItems:'center'
    },
    textTitleContainer:{
        verticalAlign:'middle',
        paddingVertical: 10,
        paddingRight: 50
    },
    button:{
        // height:55,
        backgroundColor:'white',
        verticalAlign:'middle',
        flexGrow:1,
    },
    rightButton:{
        flexGrow:1,
        borderColor:Colors.WHITE,
        borderWidth:2,
        borderRadius:10,
        alignContent:'center',
        alignItems:'center',
        flexWrap:'wrap',
    },
    iconButton:{
        alignContent:'center',
        alignItems:'center',
        color:'black',
        fontSize:28,
        margin:8
    },
    heading:{
        fontSize:24,
        alignItems:'center',
        textAlignVertical:'center'
    },
    searchBarContainer:{
        flex:1,
        flexGrow:1,
    },
    searchBarInnerContainer:{
        backgroundColor:Colors.WHITE,
        textAlignVertical:'center',
        verticalAlign:'middle',
        borderRadius:10,
        
    },
    searchBarContainerStyle:{
        borderColor:Colors.WHITE,
        borderBottomWidth:1,
        borderTopWidth:0,
        backgroundColor:'white',
    }
})