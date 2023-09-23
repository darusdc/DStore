import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import styles from './TextStyles';

type arg = {
    text : string
    style?: StyleProp<TextStyle>
}

const TinyText = (props : arg) => {
    const { text, style } = props;
    return (
        <Text style={[styles.tiny, style]} allowFontScaling={false}>{text}</Text>
    )
};

export default TinyText