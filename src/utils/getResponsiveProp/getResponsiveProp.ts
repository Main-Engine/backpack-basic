import { Breakpoint, Breakpoints, ResponsiveObject, ResponsiveProp } from 'utils/theme'

export const getResponsiveProp = <T>({
	breakpoint,
	prop,
}: {
	breakpoint: Breakpoint
	prop?: ResponsiveProp<T>
}): T | undefined => {
	const { index } = breakpoint

	if (!prop || prop === undefined) {
		return prop
	}

	if (
		typeof prop !== 'object' ||
		(!('xss' in prop) &&
			!('xs' in prop) &&
			!('sm' in prop) &&
			!('md' in prop) &&
			!('lg' in prop) &&
			!('xl' in prop) &&
			!('xxl' in prop))
	) {
		return prop as T
	}

	if (Array.isArray(prop)) {
		if (index > prop.length - 1) return prop[prop.length - 1]
		return prop[breakpoint?.index]
	}

	const exampleObject = {
		none: undefined,
		xxs: undefined,
		xs: undefined,
		sm: undefined,
		md: undefined,
		lg: undefined,
		xl: undefined,
		xxl: undefined,
	}

	const finalObject = { ...exampleObject, ...prop }
	const finalObjectKeys = Object.keys(finalObject) as Breakpoints[]
	finalObjectKeys.forEach((key, exampleIndex) => {
		// If index === 0, do nothing
		if (!exampleIndex) return

		const prevKey = finalObjectKeys[exampleIndex - 1] as Breakpoints
		const isPreviousSame = finalObject[key] === finalObject[prevKey]

		const isCurrentNullOrUndefined = finalObject[key] === null || finalObject[key] === undefined

		// If the previous isnt the same, and the current is null; then fill it in with the previous value!
		if (!isPreviousSame && isCurrentNullOrUndefined) {
			finalObject[key] = finalObject[prevKey]
		}
	})

	const propKeys = Object.keys(prop) as Breakpoints[]

	// Otherwise, if the index > lastPropIndex; then return the lastProp
	const lastPropKey = propKeys[propKeys?.length - 1] as Breakpoints
	const lastPropIndex = Object.keys(exampleObject).indexOf(lastPropKey)
	if (index > lastPropIndex) return (prop as ResponsiveObject<T>)[lastPropKey]

	return finalObject[breakpoint?.readable]
}
