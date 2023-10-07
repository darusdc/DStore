import { View, Text } from 'react-native'
import React from 'react'
import * as yup from 'yup'
import Header from '../../components/Header/header'
import { Formik } from 'formik'
import FormComponent from '../../components/Form/FormComponent'
import { SmallText } from '../../components/Text'
import { registerStyles } from '../onboarding/RegisterScreenStyle'
import Button from '../../components/Button/button'
import { WelcomeScreenStyle } from '../onboarding/WelcomeScreenStyle'

const ChangePasswordScreen = () => {
  const changePasswordValidation = yup.object().shape({
    oldPassword: yup.string()
      .min(8)
      .matches(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"), "Password must include lowercase, uppercase, symbol, and number"),
    newPassword: yup.string()
      .min(8)
      .matches(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"), "Password must include lowercase, uppercase, symbol, and number"),
    confirmationNewPassword: yup.string().oneOf([yup.ref('password')], "your password is different").required("Please input your password again"),
  })

  const onClickSubmit = (data) => {

  }
  return (
    <View style={{flex: 1}}>
      <Header
        title='Change Password'
        isStackScreen
      />
      <Formik initialValues={{
        oldPassword: '',
        newPassword: '',
        confirmationNewPassword: '',
      }}
        onSubmit={(data) => onClickSubmit(data)}
        validationSchema={changePasswordValidation}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          errors,
          touched
        }) =>
        (
          <View style={{flex: 1, marginHorizontal: 10}}>
            <FormComponent title='Old Password'
              required
              secureTextEntry
              placeholder='Enter password'
              onBlur={handleBlur('oldPassword')}
              onChangeText={handleChange('oldPassword')}
              containerStyle={{ marginTop: 10 }} />

            {errors.oldPassword && touched.oldPassword ?
              <SmallText
                text={errors.oldPassword}
                style={registerStyles.errorMessage}
              />
              :
              null
            }

            <FormComponent title='New Password'
              required
              secureTextEntry
              placeholder='Enter password'
              onBlur={handleBlur('newPassword')}
              onChangeText={handleChange('newPassword')}
              containerStyle={{ marginTop: 10 }} />

            {errors.newPassword && touched.newPassword ?
              <SmallText
                text={errors.newPassword}
                style={registerStyles.errorMessage}
              />
              :
              null
            }

            <FormComponent title='Confirmation New Password'
              required
              secureTextEntry
              placeholder='Same with password'
              onBlur={handleBlur('confirmationNewPassword')}
              onChangeText={handleChange('confirmationNewPassword')}
              containerStyle={{ marginTop: 10 }} />

            {errors.confirmationNewPassword && touched.confirmationNewPassword ?
              <SmallText
                text={errors.confirmationNewPassword}
                style={registerStyles.errorMessage}
              />
              :
              null
            }

            <View style={registerStyles.bottomContainer}>
              <Button text='Save'
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

export default ChangePasswordScreen