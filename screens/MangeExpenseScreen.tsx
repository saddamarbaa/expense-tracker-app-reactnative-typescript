import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'

import { GlobalStyles } from '../constants'
import { Expense, MangeExpenseScreenProps } from '../types'
import { FormButton, FormInput, LoadingOverlay } from '../components'
import { useExpensesContext } from '../globalStates'

export function MangeExpenseScreen({
	route,
	navigation,
}: MangeExpenseScreenProps) {
	const [formState, setFormState] = useState({
		description: {
			value: '',
			isValid: true,
		},
		amount: {
			value: '',
			isValid: true,
		},
		date: {
			value: '',
			isValid: true,
		},
	})

	const { description, amount, date } = formState

	const isFormInvalid =
		!date.isValid ||
		!description.isValid ||
		!amount.isValid ||
		date.value === '' ||
		description.value === '' ||
		amount.value === ''

	const { expenses, addExpense, removeExpense, editExpense } =
		useExpensesContext()

	const editedExpenseId = route?.params?.expenseId
	const isEditing = !!editedExpenseId

	useEffect(() => {
		if (isEditing && editedExpenseId) {
			const editedExpense = expenses.find(
				(expense) => expense.id === editedExpenseId,
			)
			if (editedExpense) {
				setFormState((prevState) => ({
					...prevState,
					description: {
						...prevState.description,
						value: editedExpense.description,
					},
					amount: {
						...prevState.amount,
						value: editedExpense.amount.toString(),
					},
					date: {
						...prevState.date,
						value: editedExpense.date.toISOString().substring(0, 10),
					},
				}))
			}
		}
	}, [isEditing, editedExpenseId, expenses])

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit Expense' : 'Add Expense',
			headerTitleStyle: {
				fontWeight: 'bold',
				fontSize: 22,
			},
			headerTitleAlign: 'center',
		})
	}, [navigation, route?.params])

	function redirectHandler() {
		navigation.goBack()
	}

	const dismissKeyboard = () => {
		Keyboard.dismiss()
	}

	function handleConfirm() {
		const parsedAmount = Number(amount.value)
		dismissKeyboard()

		// Reset the validation status
		setFormState((prevState) => ({
			...prevState,
			amount: {
				...prevState.amount,
				isValid: true,
			},
			description: {
				...prevState.description,
				isValid: true,
			},
			date: {
				...prevState.date,
				isValid: true,
			},
		}))

		const expense: Expense = {
			id: editedExpenseId
				? editedExpenseId
				: new Date().toString() + Math.random().toString(),
			description: description.value,
			amount: parsedAmount,
			date: new Date(date.value),
		}

		if (isEditing && editedExpenseId) {
			editExpense(expense, editedExpenseId)
		} else {
			addExpense(expense)
		}

		redirectHandler()
	}

	function handleCancel() {
		redirectHandler()
	}

	const handleRemoveExpense = () => {
		if (editedExpenseId) {
			removeExpense(editedExpenseId)
			redirectHandler()
		}
	}

	const validateInput = (inputIdentifier, enteredValue) => {
		// Reset the validation status
		setFormState((prevState) => ({
			...prevState,
			[inputIdentifier]: {
				...prevState[inputIdentifier],
				isValid: true,
			},
		}))

		// Perform validation based on inputIdentifier
		if (inputIdentifier === 'amount') {
			const parsedAmount = Number(enteredValue)
			if (isNaN(parsedAmount) || parsedAmount < 1) {
				setFormState((prevState) => ({
					...prevState,
					amount: {
						...prevState.amount,
						isValid: false,
					},
				}))
			}
		} else if (inputIdentifier === 'description') {
			if (enteredValue.trim() === '') {
				setFormState((prevState) => ({
					...prevState,
					description: {
						...prevState.description,
						isValid: false,
					},
				}))
			}
		} else if (inputIdentifier === 'date') {
			if (
				enteredValue.trim() === '' ||
				!/^\d{4}-\d{2}-\d{2}$/.test(enteredValue)
			) {
				setFormState((prevState) => ({
					...prevState,
					date: {
						...prevState.date,
						isValid: false,
					},
				}))
				return
			}
		}
	}

	const handleInputChange = (
		inputIdentifier: 'date' | 'amount' | 'description',
		enteredValue: string,
	) => {
		validateInput(inputIdentifier, enteredValue)
		setFormState((prevState) => ({
			...prevState,
			[inputIdentifier]: {
				...prevState[inputIdentifier],
				value: enteredValue,
			},
		}))
	}

	// return <LoadingOverlay />

	return (
		<View style={styles.wrapper}>
			<View style={styles.form}>
				<FormInput
					value={amount.value}
					onChangeText={(text) => handleInputChange('amount', text)}
					placeholder=""
					label="Amount"
					keyboardType="decimal-pad"
					inputContainerStyle={amount.isValid ? styles.inputContainer : null}
					error={!amount.isValid}
					inputStyle={styles.input}
					errorMessage={!amount.isValid ? 'Invalid amount' : ''}
				/>

				<FormInput
					value={date.value}
					onChangeText={handleInputChange.bind(null, 'date')}
					placeholder="YYYY-MM-DD"
					label="Date"
					keyboardType="numeric"
					maxLength={10}
					inputContainerStyle={date.isValid ? styles.inputContainer : null}
					error={!date.isValid}
					inputStyle={styles.input}
					errorMessage={
						!date.isValid ? 'Enter a valid date in the format YYYY-MM-DD' : ''
					}
				/>
				<FormInput
					value={description.value}
					errorMessage={
						!description.isValid ? 'Please enter a description' : ''
					}
					error={!description.isValid}
					onChangeText={handleInputChange.bind(null, 'description')}
					inputContainerStyle={
						description.isValid
							? {
									...styles.inputContainer,
									...styles.descriptionInput,
							  }
							: {
									...styles.descriptionInput,
							  }
					}
					inputStyle={{
						...styles.input,
					}}
					textAlignVertical="top"
					placeholder=""
					label="Description"
					multiline={true}
					autoCorrect={false} // default is true
					autoCapitalize="sentences"
				/>

				<View style={styles.buttonsWrapper}>
					<FormButton
						disabled={isFormInvalid}
						buttonTitle={isEditing ? 'Update' : 'Add'}
						onPress={handleConfirm}
						buttonContainerStyle={[
							styles.buttonContainer,
							{
								backgroundColor: isFormInvalid
									? GlobalStyles.colors.primary300 // Disabled background color
									: GlobalStyles.colors.primary500, // Enabled background color
								opacity: isFormInvalid ? 0.5 : 1,
							},
						]}
					/>
					<FormButton
						buttonTitle="Cancel"
						mode="flat"
						onPress={handleCancel}
						buttonContainerStyle={{ flex: 1 }}
					/>
				</View>
				{isEditing && (
					<View style={styles.deleteIconContainer}>
						<FormButton
							isIconButton
							iconName="trash"
							iconSize={30}
							iconColor={GlobalStyles.colors.error500}
							onPress={handleRemoveExpense}
							iconPressedStyle={{
								backgroundColor: GlobalStyles.colors.error50,
							}}
						/>
					</View>
				)}
			</View>
		</View>
	)
}

export default MangeExpenseScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	wrapper: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary800,
	},
	deleteIconContainer: {
		marginBottom: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: 'center',
	},
	buttonsWrapper: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 15,
	},
	buttonContainer: {
		flex: 1,
	},
	inputContainer: {
		width: '100%',
		maxHeight: 50,
		backgroundColor: GlobalStyles.colors.primary100,
	},
	inputField: {
		backgroundColor: '#ffc2c2',
	},
	input: {
		width: '100%',
		color: GlobalStyles.colors.primary500,
	},
	form: {
		marginTop: 30,
	},
	descriptionInput: {
		maxHeight: 100,
		height: 80,
	},
})
