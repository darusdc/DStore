import { View, Text, TextInput, ViewStyle, StyleProp, TextStyle, NativeSyntheticEvent, TextInputFocusEventData, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MediumText, SmallText } from '../Text'
import Colors from '../../constants/Colors'
import { Icon } from '@rneui/themed'

type arg = {
    title: string,
    placeholder?: string
    required?: boolean
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
    onChangeText?: (e: string) => void
    containerStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    secureTextEntry?: boolean
}
const FormComponent = (props: arg) => {
    const [showPassword, setShowPassword] = useState(true)
    const { title, placeholder, required, containerStyle, textStyle, onBlur, onChangeText, secureTextEntry } = props
    
    useEffect(()=>{
        setShowPassword(!secureTextEntry)
    },[])

    return (
        <View style={[containerStyle]}>
            <View style={{ flexDirection: 'row' }}>
                <MediumText text={title} />
                {required ? <SmallText text=' *' style={{ color: 'red' }} /> : null}
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: Colors.GRAY }}>

                <TextInput placeholder={placeholder || `Enter your ${title}`}
                    onBlur={onBlur}
                    onChangeText={onChangeText}
                    secureTextEntry={!showPassword}
                    style={[{ flex: 1, height: 40 }, textStyle]}
                />
                {secureTextEntry ?

                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon
                            name={showPassword ? 'eye' : 'eye-off'}
                            type='material-community'
                            color={Colors.GRAY}
                        />
                    </TouchableOpacity> : null
                }
            </View>
        </View>
    )
}

export default FormComponent