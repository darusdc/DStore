import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";


const { width, height } = Dimensions.get('screen')

const maxHeight = 50

export const WelcomeScreenStyle = StyleSheet.create({
    image: {
        width: width / 3 - 10,
        height: height / 3 - (maxHeight * Math.random()),
        resizeMode: 'cover',
        marginBottom: 5
    },
    primaryButtonContainer: {
        backgroundColor: Colors.PRIMARY,
        borderWidth: 1,
        borderColor: 'white',
        width: width - 10,
        borderRadius: 10,
        marginVertical: 5
    },
    primaryTextButton: {
        color: 'white',
        textAlign: 'center'
    },
    secondaryButtonContainer: {
        backgroundColor: 'white',
        borderColor: Colors.PRIMARY,
        borderWidth: 1,
        width: width - 10,
        borderRadius: 10,
        marginVertical: 5
    },
    secondaryTextButton: {
        color: Colors.PRIMARY,
        textAlign: 'center'
    },
    staggerFirstContainer: { flex: 1, paddingTop: 30, marginHorizontal: 10 },
    captionText: { textAlign: 'center', fontSize:28, fontFamily: 'Syne_500Medium' }
})