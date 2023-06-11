import React from 'react'

import { ExpensesOutPut } from '../components'
import { useExpensesContext } from '../globalStates'

export function RecentExpensesScreen() {
	const { expenses } = useExpensesContext()

	// Get the current date
	const currentDate = new Date()

	// Calculate the date 7 days ago
	const lastSevenDays = new Date()
	lastSevenDays.setDate(currentDate.getDate() - 7)

	// Filter the expenses for the last 7 days
	const recentExpenses = expenses.filter((expense) => {
		const expenseDate = new Date(expense.date)
		return expenseDate >= lastSevenDays && expenseDate <= currentDate
	})

	return <ExpensesOutPut expenses={recentExpenses} periodName={'Last 7 Days'} />
}

export default RecentExpensesScreen
