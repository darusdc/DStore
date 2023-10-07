import { StyleSheet } from "react-native"
import Colors from "../../constants/Colors"

const profileScreenStyles = StyleSheet.create({
  mainContainer: { backgroundColor: Colors.DIVIDER, height: 100 },
  textProfileContainer: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#EFFEFD',
    width: 72,
    height: 72,
    borderRadius: 100,
    verticalAlign: 'middle',
    fontSize: 32,
    color: Colors.SECONDARY
  },
  photoContainer: {
    marginTop:5,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#EFFEFD',
    width: 72,
    height: 72,
    borderRadius: 100,
  },
  changeProfilePicContainer: {
    alignContent: 'center',
    alignItems: 'center',
    padding: 4,
    marginTop: 60,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 100,
    height: 24,
    width: 24,
    marginLeft: 50,
    shadowColor: 'black',
    shadowRadius: 10,
  },
  titleStyle: { fontSize: 14, fontWeight: '500' }
})

export default profileScreenStyles