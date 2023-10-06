import { View, TouchableOpacity, ColorValue, TextStyle, ViewStyle } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import Colors from '../../constants/Colors'
import { MediumText, SmallText } from '../Text'
import featureListStyles from './FeatureListStyle'

type arg = {
  title: string
  description?: string
  /**
     * This icon use Ionicons type, so make sure you are use ionicons for the name
     */
  iconName?: string
  iconSize?: number
  iconColor?: number | ColorValue
  titleStyle?: TextStyle
  descStyle?: TextStyle
  containerStyle?: ViewStyle
  onPress?: () => void
}
const FeatureList = (props: arg) => {
  const {title, 
    description, 
    iconName,
    iconSize,
    iconColor,
    titleStyle,
    descStyle,
    containerStyle,
    onPress} = props
  return (
    <TouchableOpacity style={[featureListStyles.mainContainer, containerStyle]} onPress={onPress}>
      <Icon
        name={iconName}
        type='ionicon' size={iconSize|36}
        underlayColor={Colors.SECONDARY}
        color={iconColor}
        style={{ flex: 1, paddingHorizontal:10 }} />
      <View style={featureListStyles.textContainer}>
        <MediumText text={title} style={[featureListStyles.titleText, titleStyle]} />
        {description?
        <SmallText text={description||''} style={[{color: Colors.GRAY}, descStyle]}/>:null
        }
      </View>
      <Icon
        name='chevron-right'
        type='material-community'
        style={featureListStyles.rightIcon}
      />
    </TouchableOpacity>
  )
}

export default FeatureList