import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const { width, height } = Dimensions.get('screen')

export const WelcomeScreenStyle = StyleSheet.create({
    image: {
        width: width / 3 - 10,
        height: height / 3 - 50,
        resizeMode: 'cover',
        marginBottom: 5
    },
    signUpButtonContainer: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 5,
        width: width - 10
    },
    whiteTextButton: {
        color: 'white',
        textAlign: 'center'
    },
    accountButtonContainer: {
        backgroundColor: 'white',
        borderColor: Colors.PRIMARY,
        borderWidth: 1,
        width: width - 10,
        borderRadius: 10,
        marginVertical: 10
    },
    primaryTextButton: {
        color:Colors.PRIMARY, 
        textAlign:'center'
    }
})