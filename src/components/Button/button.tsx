import { View, TouchableOpacity, StyleProp, TextStyle, ViewStyle, ColorValue, GestureResponderEvent } from 'react-native'
import React from 'react'
import { MediumText } from '../Text'
import Icon from 'react-native-vector-icons/Feather'

type arg = {
    text?: string
    containerStyle? : StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    iconName?: string
    iconSize?: number
    iconColor?: number | ColorValue
    iconStyle?: StyleProp<TextStyle>
    onPress?: (event: GestureResponderEvent) => void
}
const Button = (props : arg) => {
    const {
        text, containerStyle, textStyle, iconName, iconSize, iconColor, iconStyle, onPress} = props
    return (
        <View style={containerStyle}>
            <TouchableOpacity onPress={onPress}>
                {iconName?<Icon name={iconName} size={iconSize||24} color={iconColor} style={iconStyle}/>:null}
                {text==="" ? null: <MediumText text={text||""} style={textStyle} />}
            </TouchableOpacity>
        </View>
    )
}

export default Button