import { View, Text, Linking } from 'react-native'
import React from 'react'
import Header from '../../components/Header/header'
import { Formik } from 'formik'
import * as yup from 'yup'
import FormComponent from '../../components/Form/FormComponent'
import { SmallText } from '../../components/Text'
import { WelcomeScreenStyle } from './WelcomeScreenStyle'
import Button from '../../components/Button/button'
import { registerStyles } from './RegisterScreenStyle'
import { CheckBox } from '@rneui/themed'
const RegisterScreen = () => {
    const signUpFormValidation = yup.object().shape({
        email: yup.string()
            .email('Please input validated email address')
            .required(),
        username: yup.string().min(6).matches(RegExp("")).required(),
        password: yup.string()
            .min(8)
            .matches(RegExp('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%&? "]).*$'), "Password must include lowercase, uppercase, symbol, and number")
    })
    return (
        <View style={{ flex: 1 }}>
            <Header title='Sign Up' isStackScreen />

            <Formik initialValues={{
                fullname: '',
                email: '',
                password: '',
                username: '',
                passwordConfirmation: '',
                isAgree: false
            }}
                onSubmit={(data) => { console.log(data) }}
                validationSchema={signUpFormValidation}
            >
                {({
                    handleBlur,
                    handleChange,
                    handleReset,
                    handleSubmit,
                    setFieldValue,
                    errors,
                    values,
                    touched
                }) => (
                    <View style={{ marginHorizontal: 10, flex: 1 }}>

                        <FormComponent title='Fullname'
                            required
                            placeholder='Enter your Fullname, Ex: Ujang Samsuri'
                            onBlur={handleBlur('fullname')}
                            onChangeText={handleChange('fullname')} />

                        {errors.fullname && touched.fullname ?
                            <SmallText
                                text={errors.fullname}
                                style={registerStyles.errorMessage}
                            />
                            :
                            null
                        }

                        <FormComponent title='Username'
                            required
                            placeholder='Enter your Username, Ex: ujang_1'
                            onBlur={handleBlur('username')}
                            onChangeText={handleChange('username')} />

                        {errors.username && touched.username ?
                            <SmallText
                                text={errors.username}
                                style={registerStyles.errorMessage}
                            />
                            :
                            null
                        }

                        <FormComponent title='Email'
                            required
                            placeholder='Enter your email, Ex: ujang@gmail.com'
                            onBlur={handleBlur('email')}
                            onChangeText={handleChange('email')} />

                        {errors.email && touched.email ?
                            <SmallText
                                text={errors.email}
                                style={registerStyles.errorMessage}
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

                        {errors.passwordConfirmation && touched.passwordConfirmation ?
                            <SmallText
                                text={errors.passwordConfirmation}
                                style={registerStyles.errorMessage}
                            />
                            :
                            null
                        }

                        <FormComponent title='Password Confirmation'
                            required
                            secureTextEntry
                            onBlur={handleBlur('passwordConfirmation')}
                            onChangeText={handleChange('passwordConfirmation')}
                            containerStyle={{ marginTop: 10 }} />

                        {errors.password && touched.password ?
                            <SmallText
                                text={errors.password}
                                style={registerStyles.errorMessage}
                            />
                            :
                            null
                        }
                        <View style={registerStyles.bottomContainer}>
                            <View style={registerStyles.tncContainer}>
                                <CheckBox style={registerStyles.checkboxContainer} checked={values.isAgree} />
                                <Text style={registerStyles.tncText}>By clicking sign up, I hereby agree and consent to {' '}
                                    <Text
                                        style={[registerStyles.textUnderline, WelcomeScreenStyle.primaryTextButton]}
                                        onPress={()=> Linking.openURL('https://wikidiff.com/agreement/term')}
                                    >
                                        Term & Condition</Text>
                                     ; I confirm that I have read {' '} 
                                    
                                    <Text
                                    style={[registerStyles.textUnderline, WelcomeScreenStyle.primaryTextButton]}
                                    onPress={()=> Linking.openURL('https://en.wikipedia.org/wiki/Privacy_policy')}
                                    >
                                    Privacy & Policy'</Text>
                                </Text>
                            </View>
                            <Button text='Submit'
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

export default RegisterScreen