import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Expense } from '../../types'
import { GlobalStyles } from '../../constants'
import { Card } from '../ui/Card'

type Props = {
	periodName: string
	expenses: Expense[]
}

export function ExpensesSummary({ periodName, expenses }: Props) {
	const expensesSum = expenses.reduce((accumulator, expense) => {
		return accumulator + expense.amount
	}, 0)

	if (!expensesSum) {
		return null
	}

	return (
		<Card style={styles.container}>
			<Text style={styles.period}>{periodName}</Text>
			<Text style={styles.sum}> ${expensesSum?.toFixed(2) || 0}</Text>
		</Card>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 8,
		backgroundColor: GlobalStyles.colors.primary50,
		borderRadius: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	period: {
		color: GlobalStyles.colors.primary500,
		fontSize: 13,
	},
	sum: {
		fontSize: 16,
		fontWeight: 'bold',
		color: GlobalStyles.colors.primary500,
	},
})
