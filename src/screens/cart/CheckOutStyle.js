import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const { width, height } = Dimensions.get('window')
const checkOutstyles = StyleSheet.create({
    subtotalContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        width: '100%',
        borderTopWidth: 1.5,
        borderTopColor: Colors.DIVIDER,
    },
    childSubTotalContainer: {
        paddingHorizontal: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInSubTotalContainer: { flex: 1, marginBottom: -5, color: Colors.GRAY_TEXT },
    cartItemContainer: {
        maxHeight: height / 3.6
    },
    divider: { borderTopWidth: 0.5, marginHorizontal: 10 },
    addressContainer: {
        marginTop: '-12%',
        flexDirection: 'row',
        paddingHorizontal: 10,
        height: 40,
        backgroundColor: Colors.CONTAINER,
        alignItems: 'center',
    },
    picProfileContainer: {
        width: 40, height: 40,
        marginVertical:20,
        marginHorizontal: 5
    }
})

export default checkOutstyles