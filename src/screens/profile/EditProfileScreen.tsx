import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header/header'
import FormComponent from '../../components/Form/FormComponent'
import { useSelector } from 'react-redux'
import { RootState } from '../../../App'
import { realm } from '../../store/realm'
import { User } from '../../store/realm/models/User'
import { registerStyles } from '../onboarding/RegisterScreenStyle'
import Button from '../../components/Button/button'
import { WelcomeScreenStyle } from '../onboarding/WelcomeScreenStyle'
import { Formik } from 'formik'
import * as yup from 'yup'
import { SmallText } from '../../components/Text'
import { useNavigation } from '@react-navigation/native'
import { StackNavigation } from '../../navigation/MainNavigation'


const EditProfileScreen = () => {
    const navigation = useNavigation<StackNavigation>()
    const userLoginId = useSelector<RootState>((store) => store.userLoginIdReducer.userLoginId)
    const User = realm.objects<User>("User").filtered(`id == ${userLoginId}`)[0]
    const signUpFormValidation = yup.object().shape({
        email: yup.string()
            .email('Please input validated email address')
            .required(),
        username: yup.string().min(6).matches(RegExp("")).required(),
    })
    type dataU = {
        fullname: string
        email: string
        username: string
    }
    const onClickSubmit = (data : dataU ) => {
        realm.write(() => {
            User.fullname = data.fullname
            User.email = data.email
            User.username = data.username
        })
        navigation.navigate('HomeTab')
    }

    return (
        <View style={{ flex: 1 }}>
            <Header
                isStackScreen
                title='Edit Profile'
            />
            <Formik initialValues={{
                fullname: User?.fullname,
                email: User?.email,
                username: User?.username,
            }}
                onSubmit={(data) => onClickSubmit(data)}
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
                    <View style={{flex: 1}}>
                        <FormComponent
                            title='Fullname'
                            onBlur={handleBlur('fullname')}
                            onChangeText={handleChange('fullname')}
                            textContent={values.fullname}
                            containerStyle={{ paddingHorizontal: 10, marginVertical: 10 }}
                        />
                        {errors.fullname && touched.fullname ?
                            <SmallText
                                text={errors.fullname}
                                style={registerStyles.errorMessage}
                            />
                            :
                            null
                        }

                        <FormComponent
                            title='Username'
                            textContent={values.username}
                            onBlur={handleBlur('username')}
                            onChangeText={handleChange('username')}
                            containerStyle={{ paddingHorizontal: 10, marginVertical: 10 }}
                        />

                        {errors.username && touched.username ?
                            <SmallText
                                text={errors.username}
                                style={registerStyles.errorMessage}
                            />
                            :
                            null
                        }

                        <FormComponent
                            title='email'
                            textContent={values.email}
                            onBlur={handleBlur('email')}
                            onChangeText={handleChange('email')}
                            containerStyle={{ paddingHorizontal: 10, marginVertical: 10 }}
                        />
                        {errors.email && touched.email ?
                            <SmallText
                                text={errors.email}
                                style={registerStyles.errorMessage}
                            />
                            :
                            null
                        }

                        <View style={registerStyles.bottomContainer}>
                            <Button text='Submit'
                                containerStyle={WelcomeScreenStyle.primaryButtonContainer}
                                textStyle={WelcomeScreenStyle.primaryTextButton}
                                onPress={() => { handleSubmit() }}
                            />
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default EditProfileScreen