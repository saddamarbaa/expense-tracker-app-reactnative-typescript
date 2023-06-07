import React, { useState } from 'react'
import {
	Text,
	TouchableOpacity,
	StyleSheet,
	View,
	StyleProp,
	ViewStyle,
	Pressable,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { windowHeight } from '../../utils'

type ButtonType = {
	buttonTitle?: string
	onPress?: () => void
	btnType?: string
	buttonTextStyle?: StyleProp<ViewStyle>
	buttonContainerStyle?: StyleProp<ViewStyle>
	isIconButton?: boolean
	iconName?: string
	iconSize?: number
	iconColor?: string
}

export function FormButton({
	buttonTitle,
	btnType,
	buttonTextStyle,
	buttonContainerStyle,
	isIconButton,
	iconName,
	iconSize,
	iconColor,
	...rest
}: ButtonType) {
	if (isIconButton) {
		return (
			<Pressable
				style={({ pressed }) => [
					styles.iconContainer,
					buttonContainerStyle,
					pressed && styles.iconPressed,
				]}
				{...rest}>
				<Ionicons
					name={iconName as 'add-circle'}
					size={iconSize}
					color={iconColor}
				/>
			</Pressable>
		)
	}

	return (
		<Pressable
			style={({ pressed }) => [
				styles.iconContainer,
				styles.buttonContainer,
				buttonContainerStyle,
				pressed && styles.buttonPressed,
			]}
			{...rest}>
			<View style={styles.btnTxtWrapper}>
				<Text style={[styles.buttonText, buttonTextStyle]}>{buttonTitle}</Text>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		marginTop: 16,
		width: '100%',
		height: windowHeight / 15,
		maxHeight: 45,
		backgroundColor: '#2e64e5',
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		cursor: 'pointer',
	},
	buttonPressed: {
		backgroundColor: '#1d4ed8',
	},
	iconContainer: {
		padding: 6,
		marginHorizontal: 8,
		marginVertical: 2,
		borderRadius: 20,
		cursor: 'pointer',
	},
	iconPressed: {
		backgroundColor: '#1d4ed8',
	},
	buttonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#ffffff',
		// fontFamily: 'Lato-Regular',
	},
	btnTxtWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default FormButton
