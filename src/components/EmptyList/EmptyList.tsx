import { View, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { LargeText, SmallText } from '../Text'
import Button from '../Button/button'
import { WelcomeScreenStyle } from '../../screens/onboarding/WelcomeScreenStyle'
import Colors from '../../constants/Colors'
import emptyStyles from './EmptyListStyle'
import AnimatedLottieView, { AnimatedLottieViewProps } from 'lottie-react-native'

type arg = {
    heading : string
    imageSource?: ImageSourcePropType
    lottieSource?: string
    desc : string
    buttonCaption: string
    onPress ?: () => void
}

const EmptyList = (props : arg) => {
    const {heading, imageSource, desc, buttonCaption, lottieSource, onPress} = props
  return (
    <View style={emptyStyles.container}>
      {imageSource? 
    <Image
      source={imageSource}
      style={{ flex: 1, width: 118, height: 118 }}
    />:
    <AnimatedLottieView 
        source={lottieSource}
        style={{flex: 1, width: 118, height: 118}}
    />
      }
    <LargeText text={heading} style={{ fontSize: 24 }} />
    <SmallText text={desc} style={{ color: Colors.GRAY_TEXT, textAlign:'center' }} />
    <Button
             text={buttonCaption}
             containerStyle={[WelcomeScreenStyle.primaryButtonContainer, {width:234}]}
             textStyle={WelcomeScreenStyle.primaryTextButton}
             onPress={onPress}
            />
  </View>
  )
}

export default EmptyList