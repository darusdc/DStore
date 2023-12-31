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
import ProfileScreen from '../screens/profile/ProfileScreen'
import { realm } from '../store/realm'
import Screen from '../screens/onboarding/Screen'
import BrandScreen from '../screens/home/BrandScreen'
import ProductDetailScreen from '../screens/home/ProductDetailScreen'
import { UserLoginId } from '../store/realm/models/User'
import EditProfileScreen from '../screens/profile/EditProfileScreen'
import ChangePasswordScreen from '../screens/profile/ChangePasswordScreen'
import HistoryTransactionScreen from '../screens/profile/HistoryTransactionScreen'
import FavoriteProductScreen from '../screens/home/FavoriteProductScreen'
import CartScreen from '../screens/cart/CartScreen'
import CheckOutScreen from '../screens/cart/CheckOutScreen'
import SuccessOrderScreen from '../screens/cart/SuccessOrder'
import AddAddressScreen from '../screens/cart/AddAddressScreen'
import AddressListScreen from '../screens/cart/AddressListScreen'

export type ScreenNames = [
  "Welcome",
  "Login",
  "Register",
  "RegisterSuccess",
  "HomeTab",
  "Brand",
  'ProductDetail',
  'EditProfile',
  'ChangePassword',
  'HistoryTransaction',
  'FavoriteProduct',
  'CheckOut',
  'SuccessOrder',
  'AddAddress',
  'SelectAddress',
  'Search'
] // type these manually
export type RootStackParamList = Record<ScreenNames[number], undefined | 
{ brandId: number } | 
{ productId: number} | {internalStorageId: number, ramCapacityId: number } | 
{ title: string } |
 { userId: number } |
 { searchKeyword: string} |
 { screen : string} |
 { orderId : number } |
 { type?: 'click-tab'} |
 { addressId : number } 
 >
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const MainNavigation = () => {
  const [isUserLogin, setIsUserLogin] = useState(false)
  const [token, setToken] = useState(0)
  const dispatch = useDispatch()

  const setUserLoginId = () => {
    const data = realm.objects<UserLoginId>("UserLoginId")[0]

    if (data?.userId) {
      dispatch(addUserLoginId(data.userId))
      setToken(data?.userId)
    }
    setIsUserLogin(true)
  }

  useEffect(() => {
    setUserLoginId()
  }, [])

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
      <Stack.Screen name='HomeTab' component={HomeScreenGroup} />
      <Stack.Screen name='Brand' initialParams={{ keyword: '', brand: '' }} component={BrandScreen} />
      <Stack.Screen name='ProductDetail' initialParams={{ brand: '' }} component={ProductDetailScreen} />
      <Stack.Screen name='EditProfile' initialParams={{ userId: '' }} component={EditProfileScreen} />
      <Stack.Screen name='ChangePassword' initialParams={{ userId: '' }} component={ChangePasswordScreen} />
      <Stack.Screen name='HistoryTransaction' initialParams={{ userId: '' }} component={HistoryTransactionScreen} />
      <Stack.Screen name='FavoriteProduct' component={FavoriteProductScreen} />
      <Stack.Screen name='CheckOut' component={CheckOutScreen} />
      <Stack.Screen name='SuccessOrder' component={SuccessOrderScreen} />
      <Stack.Screen name='AddAddress' component={AddAddressScreen} />
      <Stack.Screen name='SelectAddress' component={AddressListScreen} />
      <Stack.Screen name='Search' component={SearchScreen}/>
    </Stack.Navigator>
  )
}

const HomeScreenGroup = () => {
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
        initialRouteName={'Home'}
      >
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name={focused ? 'home' : "home-outline"}
                size={20}
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
          initialParams={{searchKeyword: ''}}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name={focused ? 'search-sharp' : "search"}
                size={20}
                style={{ color: focused ? Colors.PRIMARY : Colors.GRAY }} />
            ),
            tabBarLabel: ({ focused }) => (
              <TinyText text='Search'
                style={{ color: focused ? Colors.PRIMARY : Colors.GRAY }}
              />
            ),
          }}
          listeners={() => ({
            tabPress: (e) => {
                e.preventDefault();
                navigation.navigate('HomeTab', { screen: "Search" });
            },
        })}
        />

        <Tab.Screen
          name='Cart'
          component={CartScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name={focused ? 'cart' : "cart-outline"}
                size={20}
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
              <Icon name={focused ? 'person-circle' : "person-circle-outline"}
                size={20}
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