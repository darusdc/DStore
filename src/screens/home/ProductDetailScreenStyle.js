import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const productDetailScreenStyles = StyleSheet.create({
    iconRound: {
        backgroundColor:Colors.WHITE, borderRadius:100, padding:10
    },
    backButton: { flex: 1, paddingTop: 40, paddingLeft: 20, alignItems: 'flex-start' },
    loveButton: { flex: 1, paddingTop: 40, paddingRight: 20, alignItems: 'flex-end' },
    
})

export default productDetailScreenStyles