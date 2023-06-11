import React from 'react'

import { ExpensesOutPut } from '../components'
import { useExpensesContext } from '../globalStates'

export function AllExpensesScreen() {
	const { expenses } = useExpensesContext()

	return <ExpensesOutPut expenses={expenses} periodName={'Total'} />
}

export default AllExpensesScreen
