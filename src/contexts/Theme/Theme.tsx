import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { useColorScheme } from 'hooks/theme/useColorScheme'

import { ThemeProvider as StyledComponentsThemeProvider } from 'utils/styled'
import { ColorKey, Theme, theme } from 'utils/theme'

import { useWindow } from 'contexts/Window'

type ThemeContextState = {
	theme: Theme
	toggleTheme: () => void
}

const ThemeContext = createContext({} as ThemeContextState)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const { breakpoint } = useWindow()
	const deviceTheme = useColorScheme()

	const useDeviceTheme = false
	const [userOptions, setUserOptions] = useState<{
		themeColor: ColorKey
	}>({ themeColor: useDeviceTheme ? deviceTheme || 'base' : 'base' })

	useEffect(() => {
		if (deviceTheme && useDeviceTheme) {
			setColor(deviceTheme)
		}
	}, [useDeviceTheme, deviceTheme])

	const computedTheme = theme({
		userOptions,
		breakpointIndex: breakpoint.index,
	})

	const setColor = (themeColorKey: ColorKey = 'base') => {
		setUserOptions((options) => {
			return {
				...options,
				themeColor: themeColorKey,
			}
		})
	}

	const toggleTheme = useCallback(() => {
		const { themeColor } = userOptions
		if (themeColor === 'base') {
			setColor('dark')
		} else if (themeColor === 'dark') {
			setColor('light')
		} else if (themeColor === 'light') {
			setColor('grayscale')
		} else {
			setColor('base')
		}
	}, [userOptions])

	return (
		<ThemeContext.Provider
			value={{
				theme: computedTheme,
				toggleTheme,
			}}
		>
			{/* This is necessary for the styled-components to receive the theme via their props */}
			<StyledComponentsThemeProvider theme={computedTheme}>
				{children}
			</StyledComponentsThemeProvider>
		</ThemeContext.Provider>
	)
}

export const useTheme = () => {
	const themeContext = useContext(ThemeContext)
	if (themeContext == null) {
		throw new Error('useTheme() called outside of a ThemeProvider?')
	}
	return themeContext
}
