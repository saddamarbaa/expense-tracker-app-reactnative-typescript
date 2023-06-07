
import React from 'react'

import { ExpensesOutPut } from '../components'
import { Dummy_EXPENSES } from '../utils'

export function AllExpensesScreen() {
	return (
			<ExpensesOutPut expenses={Dummy_EXPENSES} periodName={'Total'} />
  )
}

export default AllExpensesScreen


