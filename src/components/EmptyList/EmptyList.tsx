import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { LargeText, SmallText } from '../Text'
import Button from '../Button/button'
import { WelcomeScreenStyle } from '../../screens/onboarding/WelcomeScreenStyle'
import Colors from '../../constants/Colors'

type arg = {
    heading : string
    imageSource : ImageSourcePropType
    desc : string
    buttonCaption: string
    onPress ?: () => void
}

const EmptyList = (props : arg) => {
    const {heading, imageSource, desc, buttonCaption, onPress} = props
  return (
    <View style={{ flex: 1, alignItems: 'center', marginVertical: 200, padding:8 }}>
    <Image
      source={imageSource}
      style={{ flex: 1, width: 118, height: 118 }}
    />
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