import { View, TouchableOpacity, StyleProp, TextStyle, ViewStyle, ColorValue, GestureResponderEvent } from 'react-native'
import React from 'react'
import { MediumText } from '../Text'
import { Icon } from '@rneui/themed'

type arg = {
    text?: string
    containerStyle? : StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    iconName?: string
    iconSize?: number
    iconColor?: number | ColorValue
    iconStyle?: TextStyle
    type?: 'entypo' | 'feather' | 'ionicon'
    disabled?: boolean
    onPress?: (event: GestureResponderEvent) => void
}
const Button = (props : arg) => {
    const {
        text, containerStyle, 
        textStyle, iconName, 
        iconSize, iconColor, 
        iconStyle, type, 
        onPress, disabled} = props
    return (
        <View style={containerStyle}>
            <TouchableOpacity onPress={onPress} disabled={disabled}>
                {iconName?<Icon name={iconName} type={type} size={iconSize||24} color={iconColor} iconStyle={iconStyle}/>:null}
                {text==="" ? null: <MediumText text={text||""} style={textStyle} />}
            </TouchableOpacity>
        </View>
    )
}

export default Button