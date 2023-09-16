import React from 'react';
import { Text } from 'react-native';
import styles from './TextStyles';
import PropTypes from 'prop-types';

type arg = {
    text : string
    style?: [] | {}
}
// here is MediumText
const MediumText = (props : arg) => {
    const { text, style } = props;
    return (
        <Text style={[styles.medium, style]} allowFontScaling={false}>{text}</Text>
    )
};

export default MediumText