import { View } from 'react-native'
import React from 'react'
import Header from '../../components/Header/header'
import { Formik } from 'formik'
import * as yup from 'yup'
import { SmallText } from '../../components/Text'
import FormComponent from '../../components/Form/FormComponent'
import Button from '../../components/Button/button'
import { WelcomeScreenStyle } from './WelcomeScreenStyle'
import { useDispatch } from 'react-redux'
import { addUserLoginId } from '../../store/redux/action/UserLoginIdAction'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { StackNavigation } from '../../navigation/MainNavigation'
import { realm } from '../../store/realm'
import { User } from '../../store/realm/models/User'
const LoginScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation<StackNavigation>()
    const loginFormValidation = yup.object().shape({
        email: yup.string()
            .email('Please input validated email address')
            .required('Please put your email'),
        password: yup.string()
            .min(8)
            .matches(RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'), "Password must include lowercase, uppercase, symbol, and number")
    })

    const onClickLogin = (data: { email: string, password: string }) => {
        const userAccount = realm.objects<User>("User").find((item) => item.email === data.email)

        if (userAccount) {
            if (userAccount.password === data.password) {
                realm.write(() => {
                    realm.create('UserLoginId', {
                        userId: userAccount.id
                    })

                })
                dispatch(addUserLoginId(userAccount.id))
                console.log(userAccount.id)
                navigation.dispatch(CommonActions.reset(
                    {
                        index: 1,
                        routes: [{ name: 'HomeTab' }]
                    }
                ))
            } else {
                alert('password incorrect')
            }
        } else {
            alert('email not found')
        }
    }
    return (
        <View>
            <Header title='Login' isStackScreen />
            <Formik initialValues={{
                email: '',
                password: ''
            }}
                onSubmit={(data) => onClickLogin(data)}
                validationSchema={loginFormValidation}
            >
                {({
                    handleBlur,
                    handleChange,
                    handleReset,
                    handleSubmit,
                    errors,
                    touched
                }) => (
                    <View style={{ marginHorizontal: 10 }}>

                        <FormComponent title='Email'
                            required
                            placeholder='Enter your email, Ex: ujang@gmail.com'
                            onBlur={handleBlur('email')}
                            onChangeText={handleChange('email')} />

                        {errors.email && touched.email ?
                            <SmallText
                                text={errors.email}
                                style={{ color: 'red', marginTop: 10 }}
                            />
                            :
                            null
                        }

                        <FormComponent title='Password'
                            required
                            secureTextEntry
                            onBlur={handleBlur('password')}
                            onChangeText={handleChange('password')}
                            containerStyle={{ marginTop: 10 }} />

                        {errors.password && touched.password ?
                            <SmallText
                                text={errors.password}
                                style={{ color: 'red', marginTop: 10 }}
                            />
                            :
                            null
                        }
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <Button text='Login'
                                containerStyle={WelcomeScreenStyle.primaryButtonContainer}
                                textStyle={WelcomeScreenStyle.primaryTextButton}
                                onPress={() => handleSubmit()}
                            />
                        </View>
                    </View>

                )}

            </Formik>
        </View>
    )
}

export default LoginScreen