import { palette } from 'utils/constants'

export const base = {
	// Primary Colors
	primary: {
		base: palette.cerulean,
		foreground: palette.whiteSmoke,
	},
	secondary: {
		base: palette.fuchsia,
		foreground: palette.whiteSmoke,
	},

	danger: {
		base: palette.danger,
		foreground: palette.whiteSmoke,
	},

	shadow: {
		base: palette.black,
		foreground: palette.white,
	},

	highContrast: {
		base: palette.white,
		foreground: palette.black,
	},
	/* 
    The Base & Inverse colors are either a black or white shade, inverse is the oposite
    Commonly used for the background of the page
  */
	base: {
		base: palette.whiteSmoke,
		foreground: palette.slate,
	},
	transparent: '#00000000',
}
