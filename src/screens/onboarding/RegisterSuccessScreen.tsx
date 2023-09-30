import { View, Text } from 'react-native'
import React from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { LargeText, MediumText, SmallText } from '../../components/Text'
import Button from '../../components/Button/button'
import { WelcomeScreenStyle } from './WelcomeScreenStyle'
// import { useNavigation } from '@react-navigation/native'

const RegisterSuccessScreen = () => {
    // const navigation = useNavigation()
  return (
    <View style={{alignContent:'center', alignItems:'center', marginVertical:200}}>
      <AnimatedLottieView source={require('../../assets/lottie/registerSuccess.json')} style={{width:200, height:200}}
       autoPlay loop/>
       <LargeText text='Successfully Register' style={{fontWeight:'bold'}}/>
       <SmallText text='Thank you for register at DStore. Start find your favorite gadget product here'
       style={{textAlign:'center', marginHorizontal: 20}}/>
       <Button 
       containerStyle={[WelcomeScreenStyle.signUpButtonContainer, {marginTop:20}]} 
       text='Go to Home Page' 
       textStyle={WelcomeScreenStyle.whiteTextButton}
    //    onPress={() => {navigation.navigate('Home')}}
       />
    </View>
  )
}

export default RegisterSuccessScreen