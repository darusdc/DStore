import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer, StackRouter } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from '../screens/onboarding/WelcomeScreen'

const MainNavigation = () => {
    const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
            <Stack.Screen name='Welcome' component={WelcomeScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation