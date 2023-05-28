import { ImageAspect, ImageColors, ImageName } from 'utils/theme'

import { useTheme } from 'contexts/Theme'

// This hook converts an imageString into an image from the theme
export const useThemeImage = (imageString?: ImageName) => {
	const { theme } = useTheme()

	if (!imageString) return null

	const imageParts = imageString.split('.')

	if (imageParts.length !== 2) return null

	const imageDimensions = imageParts[0] as ImageAspect
	const imageColor = imageParts[1] as ImageColors

	return theme.images[imageDimensions][imageColor]
}
