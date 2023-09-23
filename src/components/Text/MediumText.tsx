import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import styles from './TextStyles';

type arg = {
    text : string
    style?: StyleProp<TextStyle>
}
// here is MediumText
const MediumText = (props : arg) => {
    const { text, style } = props;
    return (
        <Text style={[styles.medium, style]} allowFontScaling={false}>{text}</Text>
    )
};

export default MediumText