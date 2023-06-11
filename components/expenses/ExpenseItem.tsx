import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import { Card } from '../ui/Card'
import { Expense, RootStackParamList } from '../../types'
import { GlobalStyles } from '../../constants'

interface ExpenseItemPropsType {
	onProgress?: (id: string) => void
}

type PropsType = ExpenseItemPropsType & Expense

export default function ExpenseItem({
	id,
	amount,
	date,
	description,
	onProgress,
}: PropsType) {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>()

	const handlePress = (id: string) => {
		if (id && onProgress) {
			// navigation.navigate('MangeExpense', {
			// 	expenseId: id,
			// })

			// we can also call on press function
			onProgress(id)
		}
	}

	const androidRippleConfig = Platform.select({
		android: {
			color: 'rgba(0, 0, 0, 0.1)',
			borderless: false,
			android_disableSound: true,
			android_hapticFeedback: false,
		},
		// default: undefined,
	})

	return (
		<Card style={styles.shadowProp}>
			<Pressable
				onPress={() => {
					handlePress(id)
				}}
				style={({ pressed }) => {
					// for IOS ripple effect
					return pressed && styles.pressedItem
				}}
				android_ripple={androidRippleConfig}>
				<View style={styles.item}>
					<View>
						<Text style={[styles.textBase, styles.description]}>
							{description}
						</Text>
						<Text style={styles.textBase}>{date.toDateString()}</Text>
					</View>
					<View style={styles.amountContainer}>
						<Text style={styles.amount}>{amount.toFixed(2)}</Text>
					</View>
				</View>
			</Pressable>
		</Card>
	)
}

const styles = StyleSheet.create({
	shadowProp: {
		cursor: 'pointer',
		backgroundColor: GlobalStyles.colors.primary500,
		padding: 0,
		shadowColor: GlobalStyles.colors.gray500,
	},
	description: {
		fontSize: 17,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	amountContainer: {
		paddingHorizontal: 12,
		paddingVertical: 4,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
	},
	amount: {
		fontWeight: 'bold',
		color: GlobalStyles.colors.primary500,
	},
	pressedItem: {
		opacity: 0.5,
		backgroundColor: GlobalStyles.colors.gray500,
		borderRadius: 8,
		overflow: 'hidden',
	},

	item: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 15,
	},
	textBase: {
		color: GlobalStyles.colors.error50,
	},
})
