import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import React, { useState } from 'react'

import { Expense, RootStackParamList } from '../../types'
import ExpenseItem from './ExpenseItem'
import { Card } from '../ui/Card'
import { GlobalStyles } from '../../constants'
import { FormButton } from '../ui'
import { NavigationProp, useNavigation } from '@react-navigation/native'

type Props = {
	expenses: Expense[]
}

export function ExpensesList({ expenses }: Props) {
	const [refreshing, setRefreshing] = useState(false)

	const handleRefresh = () => {
		setRefreshing((prevState) => !prevState)
	}

	const myItemSeparator = () => {
		return <View style={{ backgroundColor: 'grey' }} />
	}

	const navigation = useNavigation<NavigationProp<RootStackParamList>>()

	const handlePress = (id?: string) => {
		if (id && expenses.length) {
			navigation.navigate('MangeExpense', {
				expenseId: id,
			})
		} else {
			navigation.navigate('MangeExpense')
		}
	}

	const myListEmpty = () => {
		return (
			<Card style={styles.emptyCard}>
				<Text style={styles.message}>
					No expenses found. Start adding some!
				</Text>
				<FormButton
					buttonTitle="ADD NEW"
					onPress={handlePress}
					buttonContainerStyle={
						{
							// backgroundColor: GlobalStyles.colors.primary500,
						}
					}
				/>
			</Card>
		)
	}

	return (
		<View style={styles.listContainer}>
			<FlatList
				alwaysBounceVertical={false}
				data={expenses}
				renderItem={({ item, index, separators }) => (
					<ExpenseItem
						onProgress={handlePress}
						amount={item.amount}
						date={item.date}
						description={item.description}
						id={item.id}
					/>
				)}
				keyExtractor={(item, index) => item.id}
				ItemSeparatorComponent={myItemSeparator}
				ListEmptyComponent={myListEmpty}
				// refreshing={refreshing}
				// onRefresh={handleRefresh}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={handleRefresh}
						tintColor={'white'}
					/>
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	listContainer: {
		flex: 1,
		flexDirection: 'column',
		paddingVertical: 5,
	},
	emptyCard: {
		backgroundColor: GlobalStyles.colors.primary500,
		padding: 24,
		marginTop: 120,
	},
	item: {
		flex: 1,
		color: 'white',
		textAlign: 'center',
		fontSize: 18,
		lineHeight: 21,
		letterSpacing: 0.25,
	},
	message: {
		color: 'white',
		textAlign: 'center',
		fontSize: 18,
		lineHeight: 21,
		letterSpacing: 0.25,
		marginBottom: 10,
	},
})
