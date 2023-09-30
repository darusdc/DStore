import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer, NavigationProp, StackRouter } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from '../screens/onboarding/WelcomeScreen'
import HomeScreen from '../screens/home/HomeScreen'
import LoginScreen from '../screens/onboarding/LoginScreen'
import RegisterScreen from '../screens/onboarding/RegisterScreen'
import RegisterSuccessScreen from '../screens/onboarding/RegisterSuccessScreen'

export type ScreenNames = ["Welcome", "Login", "Register", "RegisterSuccess", "Home"] // type these manually
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator()
const MainNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome' 
        screenOptions={{
                    headerShown: false,
                    contentStyle:{
                      backgroundColor:'white'
                    }
                }}>
            <Stack.Screen name='Welcome' component={WelcomeScreen}/>
            <Stack.Screen name='Login' component={LoginScreen}/>
            <Stack.Screen name='Register' component={RegisterScreen}/>
            <Stack.Screen name='RegisterSuccess' component={RegisterSuccessScreen}/>
            <Stack.Screen name='Home' component={HomeScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation