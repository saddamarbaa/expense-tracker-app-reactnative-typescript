import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { AppNavigator } from './navigation'

export default function App() {
	return (
		<>
			<SafeAreaProvider>
				<StatusBar style="light" />
				<AppNavigator />
			</SafeAreaProvider>
		</>
	)
}
