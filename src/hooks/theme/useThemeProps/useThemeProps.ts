import { getBoxSpacing } from 'utils/getBoxSpacing'
import { getResponsiveProp } from 'utils/getResponsiveProp'
import { UnwrappedResponsiveProps } from 'utils/theme'

import { useWindow } from 'contexts/Window'

type OptionalResponsiveProps<T> = {
	[key in keyof T]: T[key]
}

export const boxKeys = ['padding', 'margin']

/*
  This hook converts responsive props into a single value based on the current breakpoint.
  It also converts box props into their corresponding spacing props.
*/
export const useThemeProps = <T>(
	props: OptionalResponsiveProps<T>,
): UnwrappedResponsiveProps<T> => {
	const { breakpoint } = useWindow()

	return Object.entries(props).reduce((accumulator, [key, value]) => {
		// Convert responsive props into a single value based on the current breakpoint.
		const responsiveValue =
			value === null || value === undefined
				? undefined
				: getResponsiveProp({ breakpoint, prop: value })

		// Convert box props into their corresponding spacing props. Only for boxKeys.
		if (boxKeys.includes(key)) {
			const boxSpacingValue = getBoxSpacing(key, responsiveValue)
			return { ...accumulator, ...boxSpacingValue }
		}

		return { ...accumulator, [key]: responsiveValue }
	}, {} as UnwrappedResponsiveProps<T>)
}
