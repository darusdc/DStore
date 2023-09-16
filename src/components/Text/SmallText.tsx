import React from 'react';
import { Text } from 'react-native';
import styles from './TextStyles';

type arg = {
    text : string
    style?: [] | {}
}
const SmallText = (props : arg) => {
    const { text, style } = props;
    return (
        <Text style={[styles.small, style]} allowFontScaling={false}>{text}</Text>
    )
};

export default SmallText