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
import { ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { addUserLoginId } from '../../store/redux/action/UserLoginIdAction'
import { useNavigation } from '@react-navigation/native'
import { StackNavigation } from '../../navigation/MainNavigation'
import { realm } from '../../store/realm'
import { User } from '../../store/realm/models/User'

type form = {
    fullname: string
    email: string
    password: string
    username: string
}
const RegisterScreen = () => {
    const navigation = useNavigation<StackNavigation>()
    const dispatch = useDispatch()
    const signUpFormValidation = yup.object().shape({
        email: yup.string()
            .email('Please input validated email address')
            .required(),
        username: yup.string().min(6).matches(RegExp("")).required(),
        password: yup.string()
            .min(8)
            .matches(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"), "Password must include lowercase, uppercase, symbol, and number"),
        passwordConfirmation: yup.string().oneOf([yup.ref('password')], "your password is different").required("Please input your password again"),
        isAgree: yup.bool().oneOf([true]).required('you need to agree')
    })

    const onClickRegister = (data: form) => {
        const allUser = realm.objects<User>("User")
        const userAmount = allUser.length
        let isAlreadyRegistered = false

        if (userAmount !== 0) {
            const isEmailExist = allUser.some((item) => item.email === data.email)
            if (isEmailExist) {
                alert("Email has already been taken!")
                isAlreadyRegistered = true
            }
        }

        if (!isAlreadyRegistered) {
            const newUserId = userAmount + 1
            realm.write(() => {
                realm.create('User', {
                    id: newUserId,
                    fullname: data.fullname,
                    email: data.email,
                    password: data.password,
                    username: data.username,
                    phone: '',
                    profileImage: '',
                    addresses: [{
                        street: '',
                        kelurahan: '',
                        subDistrict: '',
                        city: '',
                        province: ''
                    }]
                });
                realm.create('UserLoginId', {
                    userId: newUserId
                });
            })
            dispatch(addUserLoginId(newUserId))
            alert('Successfully registered!')
            navigation.navigate('RegisterSuccess')
        }
    }

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
                onSubmit={(data) => onClickRegister(data)}
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
                        <ScrollView>

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

                            {errors.password && touched.password ?
                                <SmallText
                                    text={errors.password}
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

                            {errors.passwordConfirmation && touched.passwordConfirmation ?
                                <SmallText
                                    text={errors.passwordConfirmation}
                                    style={registerStyles.errorMessage}
                                />
                                :
                                null
                            }
                        </ScrollView>

                        <View style={registerStyles.bottomContainer}>
                            <View style={registerStyles.tncContainer}>
                                <CheckBox style={registerStyles.checkboxContainer} checked={values.isAgree} onPress={() => setFieldValue('isAgree', !values.isAgree)} />
                                <Text style={registerStyles.tncText}>By clicking sign up, I hereby agree and consent to {' '}
                                    <Text
                                        style={[registerStyles.textUnderline, WelcomeScreenStyle.secondaryTextButton]}
                                        onPress={() => Linking.openURL('https://wikidiff.com/agreement/term')}
                                    >
                                        Term & Condition</Text>
                                    ; I confirm that I have read {' '}

                                    <Text
                                        style={[registerStyles.textUnderline, WelcomeScreenStyle.secondaryTextButton]}
                                        onPress={() => Linking.openURL('https://en.wikipedia.org/wiki/Privacy_policy')}
                                    >
                                        Privacy & Policy'</Text>
                                </Text>
                                {errors.isAgree && touched.isAgree ?
                                    <SmallText
                                        text={errors.isAgree}
                                        style={registerStyles.errorMessage}
                                    />
                                    :
                                    null
                                }
                            </View>
                            <Button text='Submit'
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

export default RegisterScreen