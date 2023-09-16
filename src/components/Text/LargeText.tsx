import React from 'react';
import { StyleSheet, Text } from 'react-native';
import styles from './TextStyles';

type arg = {
    text : string
    style?: [] | {}
}

const LargeText = (props : arg) => {
    const { text, style } = props;
    return (
        <Text style={[styles.large, style]} allowFontScaling={false}>{text}</Text>
    )
};

export default LargeText