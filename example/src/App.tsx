import { ThemeProvider, multiply } from 'backpack'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
	const [result, setResult] = React.useState<number | undefined>()

	React.useEffect(() => {
		multiply(3, 7).then(setResult)
	}, [])

	return (
		<ThemeProvider>
			<View style={styles.container}>
				<Text>Result: {result}</Text>
			</View>
		</ThemeProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
