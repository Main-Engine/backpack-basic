import React, { createContext, useCallback, useContext, useState } from 'react'

import { LayoutRectangle } from 'types/react'

type PageContextState = {
	layout: LayoutRectangle
	setLayout: (value: LayoutRectangle) => void
	loaded: boolean
}

const defaultLayout = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
}

const PageContext = createContext({} as PageContextState)

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
	const [layout, setLayout] = useState<LayoutRectangle>(defaultLayout)
	const [loaded, setLoaded] = useState<boolean>(false)

	const setInternalLayout = useCallback(
		(_layout: LayoutRectangle) => {
			if (!loaded) setLoaded(true)
			setLayout(_layout)
		},
		[setLayout, loaded],
	)

	const value = {
		layout,
		setLayout: setInternalLayout,
		loaded,
	}

	return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

export const usePage = () => {
	const pageContext = useContext(PageContext)
	if (PageContext == null) {
		throw new Error('usePage() called outside of a PageProvider?')
	}
	return pageContext
}
