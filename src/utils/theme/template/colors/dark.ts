import { palette } from 'utils/constants'

import { base } from './base'

export const dark = {
	...base,
	/* 
    The Base & Inverse colors are either a black or white shade, inverse is the oposite
    Commonly used for the background of the page
  */
	base: {
		base: palette.slate,
		foreground: palette.whiteSmoke,
	},
	inverse: {
		base: palette.whiteSmoke,
		foreground: palette.slate,
	},
}
