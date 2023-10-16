import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const { width, height } = Dimensions.get('window')

const tilewidth = width / 3 - 30
const cartStyles = StyleSheet.create({
    tileImage: { width: tilewidth, resizeMode: 'cover' },
    itemName: { flex: 1, width: (width - tilewidth) - 20, marginBottom: -10 },
    buttonPlusMinus: {
        width: 32,
        height: 32,
        borderRightWidth: 0.5,
        borderColor: Colors.GRAY,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemButton: {
        textAlignVertical: 'center',
        fontSize: 20,
        position: 'absolute',
        marginVertical: -16,
        marginHorizontal: -5
    },
    actionWrapperContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 7,
    },
    buttonPlusMinusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: 5
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
    },
    bottomSecondContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.CONTAINER
    },
    checkoutButton: {
        width: tilewidth,
        verticalAlign: 'middle',
    },
    buttonInactive: {
        backgroundColor:Colors.GRAY
    },
    addressContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        height: 40,
        backgroundColor: Colors.CONTAINER,
        alignItems: 'center',
    },
    cartItemContainer: {
        maxHeight: height / 1.4
    },
    logoutButton : {
        
    }
})

export default cartStyles