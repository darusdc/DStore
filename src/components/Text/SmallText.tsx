import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import styles from './TextStyles';

type arg = {
    text : string | string []
    style?: StyleProp<TextStyle>
}
const SmallText = (props : arg) => {
    const { text, style } = props;
    return (
        <Text style={[styles.small, style]} allowFontScaling={false}>{text}</Text>
    )
};

export default SmallText