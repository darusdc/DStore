import { View } from 'react-native'
import React from 'react'
import Header from '../../components/Header/header'
import { Formik } from 'formik'
import * as yup from 'yup'
import { SmallText } from '../../components/Text'
import FormComponent from '../../components/Form/FormComponent'
import Button from '../../components/Button/button'
import { WelcomeScreenStyle } from './WelcomeScreenStyle'
const LoginScreen = () => {
    const loginFormValidation = yup.object().shape({
        email: yup.string()
        .email('Please input validated email address')
        .required('Please put your email'),
        password: yup.string()
        .min(8)
        .matches(RegExp('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%&? "]).*$'), "Password must include lowercase, uppercase, symbol, and number")
    })
    return (
        <View>
            <Header title='Login' isStackScreen />
            <Formik initialValues={{
                email: '',
                password: ''
            }}
                onSubmit={(data) => { console.log(data) }}
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
                                containerStyle={WelcomeScreenStyle.signUpButtonContainer}
                                textStyle={WelcomeScreenStyle.whiteTextButton}
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