import React, { createContext, useReducer, useContext, ReactNode } from 'react'

import { Expense } from '../../types'
import { Dummy_EXPENSES } from '../../utils'
import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE } from '../../constants'

// Define the type for the expense reducer action
type ExpenseAction =
	| { type: typeof ADD_EXPENSE; payload: { expense: Expense } }
	| { type: typeof REMOVE_EXPENSE; payload: { expenseId: string } }
	| {
			type: typeof EDIT_EXPENSE
			payload: { expense: Expense; expenseId: string }
	  }

// Define the type for the expense reducer state
type ExpenseState = {
	expenses: Expense[]
}

// Create the expense reducer
const expenseReducer = (state: ExpenseState, action: ExpenseAction) => {
	switch (action.type) {
		case ADD_EXPENSE:
			return {
				...state,
				expenses: [action.payload.expense, ...state.expenses],
			}
		case REMOVE_EXPENSE:
			return {
				...state,
				expenses: state.expenses.filter(
					(expense) => expense.id !== action.payload.expenseId,
				),
			}
		case EDIT_EXPENSE:
			return {
				...state,
				expenses: state.expenses.map((expense) =>
					expense.id === action.payload.expenseId
						? { ...action.payload.expense, id: action.payload.expenseId }
						: expense,
				),
			}
		default:
			return state
	}
}

// Define the type for the context value
type ExpenseContextProps = {
	expenses: Expense[]
	addExpense: (expense: Expense) => void
	removeExpense: (expenseId: string) => void
	editExpense: (expense: Expense, expenseId: string) => void
	dispatch: React.Dispatch<ExpenseAction>
}

// Create the context
export const ExpensesContext = createContext<ExpenseContextProps>({
	expenses: [],
	dispatch: () => {},
	addExpense: () => {},
	removeExpense: () => {},
	editExpense: () => {},
})

// Create a provider component
export const ExpensesProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	// Initialize the expenses state using the expense reducer
	const [state, dispatch] = useReducer(expenseReducer, {
		expenses: Dummy_EXPENSES,
	})

	// Add an expense
	const addExpense = (expense: Expense) => {
		dispatch({ type: ADD_EXPENSE, payload: { expense } })
	}

	// Remove an expense
	const removeExpense = (expenseId: string) => {
		dispatch({ type: REMOVE_EXPENSE, payload: { expenseId } })
	}

	// Edit an expense
	const editExpense = (expense: Expense, expenseId: string) => {
		dispatch({ type: EDIT_EXPENSE, payload: { expense, expenseId } })
	}

	// Context value object
	const contextValue: ExpenseContextProps = {
		expenses: state.expenses,
		dispatch,
		addExpense,
		removeExpense,
		editExpense,
	}

	// Provide the context value to the children components
	return (
		<ExpensesContext.Provider value={contextValue}>
			{children}
		</ExpensesContext.Provider>
	)
}

// Custom hook to access the expenses context
export const useExpensesContext = () => useContext(ExpensesContext)
