import { SafeAreaProvider } from 'react-native-safe-area-context'
import MainNavigation from './src/navigation/MainNavigation'
import React from 'react'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userLoginIdReducer } from './src/store/redux/reducer/UserLoginIdReducer'
import { Provider } from 'react-redux'
import { useFonts, Syne_400Regular, Syne_500Medium } from '@expo-google-fonts/syne'
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
const rootReducer = combineReducers({
  userLoginIdReducer
})

const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Syne_400Regular, Syne_500Medium,
    Inter_400Regular, Inter_500Medium
  })

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MainNavigation />
      </SafeAreaProvider>
    </Provider>
  )
}
