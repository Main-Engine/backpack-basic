import { computeVariants, hexToGrayscale } from 'utils/colors'

import { base as baseTheme } from './base'
import { ColorObject } from './types'

const grayscaleInt = {} as {
	[key: string]: ColorObject
}

// eslint-disable-next-line no-restricted-syntax
for (const [key, value] of Object.entries(baseTheme)) {
	const colorKey = key as keyof typeof baseTheme

	if (typeof value === 'string') {
		const grayscaleValue = hexToGrayscale(value) || '#00000000'
		const variants = computeVariants(grayscaleValue, grayscaleValue)
		grayscaleInt[colorKey] = {
			...variants,
		}
	} else {
		const { base, foreground } = value

		const grayscaleBase = hexToGrayscale(base) || '#00000000'
		const grayscaleForeground = hexToGrayscale(foreground) || '#00000000'
		const variants = computeVariants(grayscaleBase, grayscaleForeground)

		grayscaleInt[colorKey] = {
			...variants,
		}
	}
}

export const grayscale = grayscaleInt
