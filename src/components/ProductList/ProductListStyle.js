import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const { width, height } = Dimensions.get('window')

const tilewidth = width / 3 - 30
const ProductListStyles = StyleSheet.create({
    tileImage: { width: tilewidth, resizeMode: 'cover' },
    tileImageAlter: { width: tilewidth - 40, resizeMode: 'cover' },
    itemName: { flex: 1, width: (width - tilewidth) - 20, marginBottom: -10 },
    quantityText: { backgroundColor: Colors.PRIMARY, position: 'absolute', marginLeft: 100, width: 16, height: 16, borderRadius: 100, textAlign: 'center', color: Colors.WHITE },
    quantityTextAlter: { backgroundColor: Colors.PRIMARY, position: 'absolute', marginLeft: 60, width: 18, height: 18, borderRadius: 100, textAlign: 'center', color: Colors.WHITE, verticalAlign:'middle' },
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
        marginTop: 20, flex: 1,
        justifyContent: 'flex-end',
    },
    bottomSecondContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.CONTAINER
    },
    checkoutButton: {
        width: tilewidth,
        verticalAlign:'middle',
    }
})

export default ProductListStyles