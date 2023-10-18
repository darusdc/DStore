import { View, Image, Modal } from 'react-native'
import React, { useCallback, useImperativeHandle, useRef, useState } from 'react'
import Colors from '../../constants/Colors'
import { useSelector } from 'react-redux'
import { RootState } from '../../../App'
import { realm } from '../../store/realm'
import { User, UserLoginId } from '../../store/realm/models/User'
import { LargeText, MediumText, SmallText } from '../../components/Text'
import Button from '../../components/Button/button'
import profileScreenStyles from './ProfileScreenStyle'
import FeatureList from '../../components/FeatureList/FeatureList'
import { Portal } from 'react-native-portalize/lib/Portal'
import { Modalize } from 'react-native-modalize'
import { WelcomeScreenStyle } from '../onboarding/WelcomeScreenStyle'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { addUserLoginId } from '../../store/redux/action/UserLoginIdAction'
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackNavigation } from '../../navigation/MainNavigation'
import ImageCropPicker from 'react-native-image-crop-picker'
import { PermissionsAndroid } from 'react-native'
import { Product } from '../../store/realm/models/Product'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<StackNavigation>()
  const userLoginId = useSelector<RootState>((store) => store.userLoginIdReducer.userLoginId)
  const [User, setUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showModalPP, setShowModalPP] = useState(false)
  const logoutRef = useRef<Modalize>()
  const profileImageRef = useRef<Modalize>()

  const onClickLogout = () => {
    const userLogin = realm.objects<UserLoginId>('UserLoginId')[0]
    const product = realm.objects<Product>('Product')
    realm.write(() => {
      realm.delete(userLogin)
      product.forEach((item) => {item.isLike = false})
    })
    dispatch(addUserLoginId(0))
    navigation.dispatch(CommonActions.reset(
      {
        index: 1,
        routes: [{ name: 'Welcome' }]
      }
    ))
  }

  const messageImage = () => {
    alert('Profile image successfully updated')
  }

  const requestCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Permission Request",
          message: "The app need to access your camera to setup your profile image",
          buttonPositive:'I granted',
          buttonNegative:'I denied',
          buttonNeutral:'Ask me later!'
        })
        if (granted === PermissionsAndroid.RESULTS.GRANTED){
          alert('Thanks for the permission')
          onClickCamera()
        }
    } catch (err) {
      console.log(err.message)
    }
  }
  const onClickCamera = () => {
    ImageCropPicker.openCamera({
      width: 400,
      height: 400,
      cropping: true
    }).then((image) => {
      realm.write(() => {
        User.profileImage = image.path
      })
      profileImageRef.current.close()
      messageImage()
    }).catch((e) => {
      requestCamera()
      console.log(e.message)

    })
  }

  const onClickGallery = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      cropping: true
    }).then((image) => {
      realm.write(() => {
        User.profileImage = image.path
      })
      profileImageRef.current.close()
      messageImage()
    }).catch((e) => {
      console.log(e.message)
    })
  }

  const onClickDelete = () => {
    if (User.profileImage) {
      realm.write(() => {
        User.profileImage = ''
      })
    }
    profileImageRef.current.close()
    messageImage()
  }

  useFocusEffect(useCallback(() => {
    setUser(realm.objects<User>("User").filtered(`id == ${userLoginId}`)[0])
  },[]))

  return (
    <View style={profileScreenStyles.mainContainer}>
      <View style={{ alignItems: 'center', marginTop: 55 }}>
        <View style={{ flexDirection: 'row' }}>
          {User?.profileImage ? 
          <Image source={{ uri: User?.profileImage }} 
          style={profileScreenStyles.photoContainer}
          />
            :
            <SmallText text={User?.fullname.split(' ').map((v)=> {return v[0]?.toUpperCase()})}
              style={profileScreenStyles.textProfileContainer} />
          }
          <Button
            iconName='camera'
            iconSize={16}
            type='feather'
            iconColor={Colors.PRIMARY}
            containerStyle={profileScreenStyles.changeProfilePicContainer}
            onPress={() => { profileImageRef.current.open() }}
          />
        </View>
        <MediumText text={User?.fullname?.toUpperCase()} style={{ fontWeight: 'bold' }} />
        <MediumText text={User?.email} style={{ color: Colors.GRAY, marginTop: -5 }} />
      </View>
      <View>
        <MediumText text='Account' style={{ color: Colors.GRAY, marginHorizontal: 10 }} />
        <FeatureList title='Edit Profile'
          description='See & edit your profile'
          iconName='person'
          iconColor={Colors.PRIMARY}
          onPress={() => {navigation.navigate('EditProfile')}}
        />
        <FeatureList title='History Transaction'
          description='See your history transaction on DStore'
          iconName='cart'
          iconColor={Colors.PRIMARY}
          onPress={() => {navigation.navigate('HistoryTransaction')}}
        />
        <FeatureList title='Change Password'
          description='Change your password account'
          iconName='lock-closed'
          iconColor={Colors.PRIMARY}
          onPress={() => {navigation.navigate('ChangePassword')}}
        />
      </View>
      <View>
        <MediumText text='Other setting' style={{ color: Colors.GRAY, marginHorizontal: 10 }} />
        <FeatureList title='Logout'
          iconColor={Colors.PRIMARY}
          iconName='log-out' onPress={() => { logoutRef.current?.open() }} />
      </View>
      <Portal>
        <GestureHandlerRootView style={{ flex: showModal ? 1 : 0 }}>
          <Modalize ref={logoutRef}
            onOpen={() => { setShowModal(true) }}
            onClose={() => { setShowModal(false) }}
            adjustToContentHeight
          >
            <View style={{
              flex: 1,
              padding: 16,
              alignItems: 'center',
            }}>
              <MediumText text='Logout?' style={{ textAlign: 'center' }} />
              <SmallText text='Are you sure want to logout from you account?' style={{ textAlign: 'center' }} />
              <View style={{ flexDirection: 'row' }}>
                <Button text='Cancel'
                  containerStyle={
                    [WelcomeScreenStyle.secondaryButtonContainer,
                    { flex: 1, borderRadius: 100, marginHorizontal: 10 }]}
                  textStyle={WelcomeScreenStyle.secondaryTextButton}
                  onPress={() => { logoutRef.current?.close() }}
                />
                <Button text='Logout'
                  containerStyle={
                    [WelcomeScreenStyle.primaryButtonContainer,
                    { flex: 1, borderRadius: 100, marginHorizontal: 10 }]}
                  textStyle={WelcomeScreenStyle.primaryTextButton}
                  onPress={() => onClickLogout()}
                />
              </View>
            </View>
          </Modalize>
        </GestureHandlerRootView>
      </Portal>
      <Portal>
        <GestureHandlerRootView style={{ flex: showModalPP ? 1 : 0 }}>
          <Modalize ref={profileImageRef}
            onOpen={() => { setShowModalPP(true) }}
            onClose={() => { setShowModalPP(false) }}
            adjustToContentHeight
            HeaderComponent={
              <LargeText text='Upload Image' style={{ paddingHorizontal: 10, paddingTop: 10 }} />
            }
          >
            <FeatureList title='Pick from camera'
              iconName='camera'
              titleStyle={profileScreenStyles.titleStyle}
              onPress={() => onClickCamera()}
              containerStyle={{height:60, paddingVertical:10}}
            />
            <FeatureList title='Choose from gallery'
              iconName='folder'
              titleStyle={profileScreenStyles.titleStyle}
              onPress={() => onClickGallery()}
              containerStyle={{height:60, paddingVertical:10}}
            />
            <FeatureList title='Delete photo'
              iconName='trash'
              titleStyle={profileScreenStyles.titleStyle}
              onPress={() => onClickDelete()}
              containerStyle={{height:60, paddingVertical:10}}
            />
          </Modalize>
        </GestureHandlerRootView>
      </Portal>
    </View>
  )
}

export default ProfileScreen