
import React from 'react'

import { ExpensesOutPut } from '../components'
import { Dummy_EXPENSES } from '../utils'

export function RecentExpensesScreen() {
	return (
			<ExpensesOutPut expenses={Dummy_EXPENSES} periodName={'Last 7 Days'} />
	)
}

export default RecentExpensesScreen


