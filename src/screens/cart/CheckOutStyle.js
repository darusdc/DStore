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
    divider: { borderWidth: 1, marginHorizontal: 10, borderColor: Colors.DIVIDER },
    addressContainer: {
        marginTop: '-12%',
        flexDirection: 'row',
        paddingHorizontal: 10,
        height: 40,
        backgroundColor: Colors.CONTAINER,
        alignItems: 'center',
    },
})

export default checkOutstyles