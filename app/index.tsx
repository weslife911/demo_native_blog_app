import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from '../navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';



export default function Index() {

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
