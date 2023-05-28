import { slate, whiteGrey } from 'utils/constants/palette'

export const hexToGrayscale = (hex: string) => {
	const rgb = hexToRGB(hex)
	if (!rgb) return null

	const { r, g, b } = rgb
	const grayscale = Math.round(0.299 * r + 0.587 * g + 0.114 * b)

	return rgbToHex(grayscale, grayscale, grayscale)
}

const hexToRGB = (hex: string) => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	if (!result) return null

	return {
		r: result[1] ? parseInt(result[1], 16) : 0,
		g: result[2] ? parseInt(result[2], 16) : 0,
		b: result[3] ? parseInt(result[3], 16) : 0,
	}
}

const rgbToHex = (r: number, g: number, b: number) => {
	let red = r.toString(16)
	let green = g.toString(16)
	let blue = b.toString(16)

	if (red.length === 1) red = `0${red}`
	if (green.length === 1) green = `0${green}`
	if (blue.length === 1) blue = `0${blue}`

	return `#${red}${green}${blue}`
}

// Go lighter
export const computeTint = (hexColor: string, tintFactor = 0.25) => {
	const rgb = hexToRGB(hexColor)
	if (!rgb) return hexColor

	const { r, g, b } = rgb

	const rTint = Math.round(r + (255 - r) * tintFactor)
	const gTint = Math.round(g + (255 - g) * tintFactor)
	const bTint = Math.round(b + (255 - b) * tintFactor)

	return rgbToHex(rTint, gTint, bTint)
}

export const computeShade = (hexColor: string, shadeFactor = 0.075) => {
	const rgb = hexToRGB(hexColor)
	if (!rgb) return hexColor

	const { r, g, b } = rgb
	const rShade = Math.round(r * (1 - shadeFactor))
	const gShade = Math.round(g * (1 - shadeFactor))
	const bShade = Math.round(b * (1 - shadeFactor))
	const shadeHex = rgbToHex(rShade, gShade, bShade)
	return shadeHex
}

const isHexLight = (hexColor: string) => {
	const rgb = hexToRGB(hexColor)
	if (!rgb) return hexColor

	const { r, g, b } = rgb
	const yiq = (r * 299 + g * 587 + b * 114) / 1000

	return yiq >= 128
}

export const computeContrast = (hexColor: string) => {
	const isLight = isHexLight(hexColor)
	const baseColor = isLight ? slate : whiteGrey
	return {
		contrast: baseColor,
		contrast0: isLight ? computeTint(baseColor, 0.0) : computeShade(baseColor, 0.0),
		contrast5: isLight ? computeTint(baseColor, 0.05) : computeShade(baseColor, 0.05),
		contrast10: isLight ? computeTint(baseColor, 0.1) : computeShade(baseColor, 0.1),
		contrast25: isLight ? computeTint(baseColor, 0.25) : computeShade(baseColor, 0.25),
		contrast50: isLight ? computeTint(baseColor, 0.5) : computeShade(baseColor, 0.5),
		contrast75: isLight ? computeTint(baseColor, 0.75) : computeShade(baseColor, 0.75),
		contrast90: isLight ? computeTint(baseColor, 0.9) : computeShade(baseColor, 0.9),
		contrast95: isLight ? computeTint(baseColor, 0.95) : computeShade(baseColor, 0.95),
		contrast100: baseColor,
	}
}

export const computeVariants = (base: string, foreground: string) => {
	return {
		base,
		foreground,
		...computeShads(base),
		...computeTints(base),
		...computeContrast(base),
	}
}

export const computeShads = (hexColor: string) => {
	const shade = computeShade(hexColor, 0.25)
	return {
		shade,
		shade0: computeShade(hexColor, 0.0),
		shade5: computeShade(hexColor, 0.05),
		shade10: computeShade(hexColor, 0.1),
		shade25: shade,
		shade50: computeShade(hexColor, 0.5),
		shade75: computeShade(hexColor, 0.75),
		shade90: computeShade(hexColor, 0.9),
		shade95: computeShade(hexColor, 0.95),
		shade100: computeShade(hexColor, 1.0),
	}
}

export const computeTints = (hexColor: string) => {
	const tint = computeTint(hexColor, 0.25)
	return {
		tint,
		tint0: computeTint(hexColor, 0.0),
		tint5: computeTint(hexColor, 0.05),
		tint10: computeTint(hexColor, 0.1),
		tint25: tint,
		tint50: computeTint(hexColor, 0.5),
		tint75: computeTint(hexColor, 0.75),
		tint90: computeTint(hexColor, 0.9),
		tint95: computeTint(hexColor, 0.95),
		tint100: computeTint(hexColor, 1.0),
	}
}
