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
import { useSelector } from 'react-redux'
import { RootState } from '../../../App'
import { realm } from '../../store/realm'
import { User } from '../../store/realm/models/User'
import { useNavigation } from '@react-navigation/native'
import { StackNavigation } from '../../navigation/MainNavigation'

const ChangePasswordScreen = () => {
  const userLoginId = useSelector<RootState>((store) => store.userLoginIdReducer.userLoginId)
  const user = realm.objects<User>('User').filtered(`id == ${userLoginId}`)[0]
  const navigation = useNavigation<StackNavigation>()
  const changePasswordValidation = yup.object().shape({
    oldPassword: yup.string()
      .min(8)
      .matches(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"), "Password must include lowercase, uppercase, symbol, and number"),
    newPassword: yup.string()
      .min(8)
      .matches(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"), "Password must include lowercase, uppercase, symbol, and number"),
    confirmationNewPassword: yup.string().oneOf([yup.ref('newPassword')], "your password is different").required("Please input your password again"),
  })
  type passwordData = {
    oldPassword: string
    newPassword: string
    confirmationNewPassword: string
  }
  const onClickSubmit = (data : passwordData) => {
    if (data.oldPassword === user.password) {
      realm.write(() => {
        user.password = data.newPassword
      })
      alert('Password successfully changed!')
      navigation.navigate('HomeTab')
    } else {
      alert('Old password is incorrect')
    }
    
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