import React, { useEffect, useState } from 'react'
import { EventArg, NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from '../screens/onboarding/WelcomeScreen'
import HomeScreen from '../screens/home/HomeScreen'
import LoginScreen from '../screens/onboarding/LoginScreen'
import RegisterScreen from '../screens/onboarding/RegisterScreen'
import RegisterSuccessScreen from '../screens/onboarding/RegisterSuccessScreen'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../App'
import { addUserLoginId } from '../store/redux/action/UserLoginIdAction'
import { Host } from 'react-native-portalize'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../constants/Colors'
import { TinyText } from '../components/Text'
import SearchScreen from '../screens/home/SearchScreen'
import CartScreen from '../screens/home/CartScreen'
import ProfileScreen from '../screens/profile/ProfileScreen'
import { realm } from '../store/realm'
import Screen from '../screens/onboarding/Screen'
import BrandScreen from '../screens/home/BrandScreen'
import ProductDetailScreen from '../screens/home/ProductDetailScreen'
import { UserLoginId } from '../store/realm/models/User'
import EditProfileScreen from '../screens/profile/EditProfileScreen'
import ChangePasswordScreen from '../screens/profile/ChangePasswordScreen'
import HistoryTransactionScreen from '../screens/profile/HistoryTransactionScreen'

export type ScreenNames = [
  "Welcome", 
  "Login", 
  "Register", 
  "RegisterSuccess", 
  "HomeTab", 
  'Search', 
  "Brand", 
  'ProductDetail', 
  'EditProfile',
  'ChangePassword',
  'HistoryTransaction'
] // type these manually
export type RootStackParamList = Record<ScreenNames[number], undefined | {brandId: number} | {productId: number} | {title: string} | {userId: number}>
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const MainNavigation = () => {
  const [isUserLogin, setIsUserLogin] = useState(false)
  const [token, setToken] = useState(0)
  const dispatch = useDispatch()
  const globalUserLoginId = useSelector((store: RootState) => store.userLoginIdReducer.userLoginId)

  const setUserLoginId = () => {
    const data = realm.objects<UserLoginId>("UserLoginId")[0]

    if (data?.userId) {
      dispatch(addUserLoginId(data.userId))
      setToken(data?.userId)
      console.log(data?.userId)
    }
    setIsUserLogin(true)
  }

  useEffect(() => {
    setUserLoginId()
  }, [])

  useEffect(() => {
    console.log(globalUserLoginId)
  }, [globalUserLoginId])

  if (!isUserLogin) {
    return <Screen />
  } else {

    return (
      <NavigationContainer>
        {token > 0 ?
          <StackNav screenName='HomeTab' />
          :
          <StackNav screenName='Welcome' />
        }
      </NavigationContainer>
    )
  }
}

type screenTrans = {
  screenName: string
}
const StackNav = (props: screenTrans) => {
  const { screenName } = props
  return (
    <Stack.Navigator initialRouteName={screenName}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'white'
        }
      }}>
      <Stack.Screen name='Welcome' component={WelcomeScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='RegisterSuccess' component={RegisterSuccessScreen} />
      <Stack.Screen name='HomeTab' component={TabScreenGroup} />
      <Stack.Screen name='Search' initialParams={{ keyword: '', brand: '' }} component={SearchScreen} />
      <Stack.Screen name='Brand' initialParams={{ keyword: '', brand: '' }} component={BrandScreen} />
      <Stack.Screen name='ProductDetail' initialParams={{ brand: '' }} component={ProductDetailScreen} />
      <Stack.Screen name='EditProfile' initialParams={{ userId: '' }} component={EditProfileScreen} />
      <Stack.Screen name='ChangePassword' initialParams={{ userId: '' }} component={ChangePasswordScreen} />
      <Stack.Screen name='HistoryTransaction' initialParams={{ userId: '' }} component={HistoryTransactionScreen} />
    </Stack.Navigator>
  )
}

const TabScreenGroup = () => {
  const navigation = useNavigation<StackNavigation>()
  const { userLoginId } = useSelector((store: RootState) => store.userLoginIdReducer)

  const loginRequired = () => ({
    tabPress: (e: EventArg<"tabPress", true, undefined>) => {
      if (userLoginId === 0) {
        e.preventDefault()
        navigation.navigate('Login')
      }
    }
  })
  return (
    <Host>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        sceneContainerStyle={{ backgroundColor: 'white' }}
        initialRouteName='Home'
      >
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="home-outline"
                style={{ color: focused ? Colors.PRIMARY : Colors.GRAY }} />
            ),
            tabBarLabel: ({ focused }) => (
              <TinyText text='Home'
                style={{ color: focused ? Colors.PRIMARY : Colors.GRAY }}
              />
            )
          }}
        />

        <Tab.Screen
          name='Search'
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="search"
                style={{ color: focused ? Colors.PRIMARY : Colors.GRAY }} />
            ),
            tabBarLabel: ({ focused }) => (
              <TinyText text='Search'
                style={{ color: focused ? Colors.PRIMARY : Colors.GRAY }}
              />
            )
          }}
        />

        <Tab.Screen
          name='Cart'
          component={CartScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="cart-outline"
                style={{ color: focused ? Colors.PRIMARY : Colors.GRAY }} />
            ),
            tabBarLabel: ({ focused }) => (
              <TinyText text='Cart'
                style={{ color: focused ? Colors.PRIMARY : Colors.GRAY }}
              />
            )
          }}
          listeners={() => loginRequired()}
        />

        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="person-circle-outline"
                style={{ color: focused ? Colors.PRIMARY : Colors.GRAY }} />
            ),
            tabBarLabel: ({ focused }) => (
              <TinyText text='Profile'
                style={{ color: focused ? Colors.PRIMARY : Colors.GRAY }}
              />
            )
          }}
          listeners={() => loginRequired()}
        />
      </Tab.Navigator>
    </Host>
  )
}

export default MainNavigation