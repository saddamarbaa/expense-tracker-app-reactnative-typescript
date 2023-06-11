import * as React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RootStackParamList } from '../types'
import { GlobalStyles } from '../constants'
import { MangeExpenseScreen } from '../screens'
import BottomTabNavigator from './BottomTabNavigator'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function AppNavigator() {
	const MyTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			primary: 'rgb(255, 45, 85)',
			background: GlobalStyles.colors.primary700,
		},
	}

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={({ route }) => ({
					headerShown: true,
					headerTitleAlign: 'center',
					headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
					headerTintColor: 'white',
				})}>
				<Stack.Screen
					name="ExpenseOverView"
					component={BottomTabNavigator}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="MangeExpense"
					component={MangeExpenseScreen}
					options={{ headerShown: true, presentation: 'modal' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default AppNavigator
