import Colors from '../../constants/Colors';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    tiny: {
        fontFamily:'Inter_400Reguler',
        fontSize: 10,
        color: Colors.BLACK_TEXT,
    },
    small: {
        fontFamily:'Inter_400Reguler',
        fontSize: 14,
        color: Colors.BLACK_TEXT,
        marginVertical: 8
    },
  
    // here is medium style
    medium: {
        fontFamily:'Inter_500Medium',
        fontSize: 16,
        color: Colors.BLACK_TEXT,
        marginVertical: 8
    },
    // here is large style
    large: {
        fontFamily:'Inter_500Medium',
        fontSize: 20,
        color: Colors.BLACK_TEXT,
        marginVertical: 8
    },
});

export default styles