import { View, StyleSheet } from 'react-native'
import React from 'react'

import { ExpensesSummary } from './ExpensesSummary'
import { ExpensesList } from './ExpensesList'
import { Expense } from '../../types'
import { GlobalStyles } from '../../constants'

type Props = {
	expenses: Expense[]
	periodName: string
}

export function ExpensesOutPut({ expenses, periodName }: Props) {
	return (
		<View style={styles.wrapper}>
			<ExpensesSummary periodName={periodName} expenses={expenses} />
			<ExpensesList expenses={expenses} />
		</View>
	)
}

export default ExpensesOutPut

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 24,
		paddingBottom: 0,
		backgroundColor: GlobalStyles.colors.primary700,
	},
})
