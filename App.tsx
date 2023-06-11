import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { AppNavigator } from './navigation'
import { ExpensesProvider as ContextProvider } from './globalStates'

export default function App() {
	return (
		<>
			<SafeAreaProvider>
				<StatusBar style="light" />
				<ContextProvider>
					<AppNavigator />
				</ContextProvider>
			</SafeAreaProvider>
		</>
	)
}
