import { base } from './base'

export type ColorKey = 'base' | 'dark' | 'light' | 'grayscale'
export type Color = keyof typeof base

export type ColorObject = typeof base.primary & {
	// Base tints
	tint: string
	tint0: string
	tint5: string
	tint10: string
	tint25: string
	tint50: string
	tint75: string
	tint90: string
	tint95: string
	tint100: string

	// Base shades
	shade: string
	shade0: string
	shade5: string
	shade10: string
	shade25: string
	shade50: string
	shade75: string
	shade90: string
	shade95: string
	shade100: string

	// Color that contrasts with base
	contrast: string
	contrast0: string
	contrast5: string
	contrast10: string
	contrast25: string
	contrast50: string
	contrast75: string
	contrast90: string
	contrast95: string
	contrast100: string
}
