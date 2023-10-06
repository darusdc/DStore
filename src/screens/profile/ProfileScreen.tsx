import { View, Image, Modal } from 'react-native'
import React, { useImperativeHandle, useRef, useState } from 'react'
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
import { useNavigation } from '@react-navigation/native'
import { StackNavigation } from '../../navigation/MainNavigation'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const navigation =  useNavigation<StackNavigation>()
  const userLoginId = useSelector<RootState>((store) => store.userLoginIdReducer.userLoginId)
  const User = realm.objects<User>("User").filtered(`id == ${userLoginId}`)[0]
  const [showModal, setShowModal] = useState(false)
  const [showModalPP, setShowModalPP] = useState(false)
  const logoutRef = useRef<Modalize>()
  const profileImageRef = useRef<Modalize>()

  const onClickLogout = () => {
    const userLogin = realm.objects<UserLoginId>('UserLoginId')[0]
    realm.write(() => {
      realm.delete(userLogin)
    })
    dispatch(addUserLoginId(0))
    navigation.navigate('HomeTab')
  }
  return (
    <View style={profileScreenStyles.mainContainer}>
      <View style={{ alignItems: 'center', marginTop: 55 }}>
        <View style={{ flexDirection: 'row' }}>
          {User?.profileImage ? <Image source={{ uri: User?.profileImage }} />
            :
            <SmallText text={User.fullname.split(' ')[0][0].toUpperCase()}
              style={profileScreenStyles.textProfileContainer} />
          }
          <Button
            iconName='camera'
            iconSize={16}
            iconColor={Colors.PRIMARY}
            containerStyle={profileScreenStyles.changeProfilePicContainer}
            onPress={() => {profileImageRef.current.open()}}
            />
        </View>
        <MediumText text={User.fullname.toUpperCase()} style={{ fontWeight: 'bold' }} />
        <MediumText text={User.email} style={{ color: Colors.GRAY, marginTop: -5 }} />
      </View>
      <View>
        <MediumText text='Account' style={{ color: Colors.GRAY, marginHorizontal: 10 }} />
        <FeatureList title='Edit Profile'
          description='See & edit your profile'
          iconName='person' 
          iconColor={Colors.PRIMARY}
          />
        <FeatureList title='History Transaction'
          description='See your history transaction on DStore'
          iconName='cart' 
          iconColor={Colors.PRIMARY}
          />
        <FeatureList title='Change Password'
          description='Change your password account'
          iconName='lock-closed' 
          iconColor={Colors.PRIMARY}
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
                    onPress={()=> onClickLogout()}
                />
              </View>
            </View>
          </Modalize>
        </GestureHandlerRootView>
      </Portal>
      <Portal>
        <GestureHandlerRootView style={{flex: showModalPP? 1:0}}>
          <Modalize ref={profileImageRef}
            onOpen={()=>{setShowModalPP(true)}}
            onClose={()=>{setShowModalPP(false)}}
            adjustToContentHeight
            HeaderComponent={
              <LargeText text='Upload Image' style={{paddingHorizontal:10, paddingTop:10}}/>
            }
          >
            <FeatureList title='Pick from camera'
            iconName='camera'
            iconSize={6}
            titleStyle={{fontSize:14, fontWeight:'500'}}
            />
            <FeatureList title='Choose from gallery'
            iconName='folder'
            iconSize={1}
            titleStyle={{fontSize:14, fontWeight:'500'}}
            />
            <FeatureList title='Delete photo'
            iconName='trash'
            iconSize={6}
            titleStyle={{fontSize:14, fontWeight:'500'}}
            />
          </Modalize>
        </GestureHandlerRootView>
      </Portal>
    </View>
  )
}

export default ProfileScreen