import { SafeAreaProvider } from 'react-native-safe-area-context'
import RegisterScreen from './src/screens/onboarding/RegisterScreen'

export default function App() {
  return (
      <SafeAreaProvider>
        <RegisterScreen/>
      </SafeAreaProvider>
    )
}
