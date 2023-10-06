import { Dimensions, StyleSheet } from "react-native";
const {width} = Dimensions.get('screen')
export const registerStyles = StyleSheet.create({
    bottomContainer: { alignItems: 'center', marginTop: 20, flex: 1, justifyContent:'flex-end', marginBottom:20,
marginHorizontal:10 },
    errorMessage: { color: 'red', marginTop: 10 },
    checkboxContainer:{ alignContent:'center', marginLeft: 10},
    textUnderline: { textDecorationLine: 'underline' },
    tncContainer: { flexDirection: 'row', alignItems:'center', width, marginBottom:20},
    tncText:{ fontFamily:'Inter_400Reguler', paddingRight: 50, marginRight:20}
})