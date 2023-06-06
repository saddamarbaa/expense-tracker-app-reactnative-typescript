import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RootStackParamList } from '../types'
import { GlobalScreenOption } from '../constants'
import { MangeExpenseScreen } from '../screens'
import BottomTabNavigator from './BottomTabNavigator'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function AppNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={({ route }) => ({
					...GlobalScreenOption,
					headerShown: true,
					headerTitleAlign: 'center',
				})}>
				<Stack.Screen
					name="ExpenseOverView"
					component={BottomTabNavigator}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="MangeExpense" component={MangeExpenseScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default AppNavigator
