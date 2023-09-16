import React from 'react';
import { Text } from 'react-native';
import styles from './TextStyles';

type arg = {
    text : string
    style?: [] | {}
}

const TinyText = (props : arg) => {
    const { text, style } = props;
    return (
        <Text style={[styles.tiny, style]} allowFontScaling={false}>{text}</Text>
    )
};

export default TinyText