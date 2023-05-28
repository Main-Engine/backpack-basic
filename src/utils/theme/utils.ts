import { size } from './template'
import { BreakpointArray, BreakpointSizeMatrix } from './types'

export const selectValueFromBreakpoint = (options: BreakpointArray, breakpointIndex: number) => {
	return options[breakpointIndex]
}

/*
  reduceTemplateMatrixFromBreakpoint
  * Calculate the theme based on the size of the screen
  * Given a known current breakpoint, set the theme to the correct column measurements

  Breakpoints: |xxs, xs, sm, md, lg, xl, xxl|
  
  xxs:          [ 2,  2,  2,  2,  2,  4,  4],
  xs:           [ 4,  4,  4,  4,  4,  8,  8],
  sm:           [ 6,  6,  6,  6,  6, 12, 12],
  md:           [ 8,  8,  8,  8,  8, 16, 16],
  lg:           [12, 12, 12, 12, 12, 24, 24],
  xl:           [16, 16, 16, 16, 16, 32, 32],
  xxl:          [24, 24, 24, 24, 24, 48, 48]

  If the screen is currently 'xl', then the breakpointIndex will be 5 and the results will be:
  {xxs: 4, xs: 8, sm: 12, md: 16, lg: 24, xl: 32, xxl: 48}
*/

export const reduceTemplateMatrixFromBreakpoint = (
	sizeRecord: BreakpointSizeMatrix,
	breakpointIndex: number, // index of the current breakpoint in the array
) => {
	let spacingResult!: {
		[key in size.Size]: number
	}

	const sizeKeys = Object.keys(sizeRecord) as size.Size[]
	sizeKeys.forEach((key) => {
		const breakpointSpecificSpacing = selectValueFromBreakpoint(
			sizeRecord[key] as BreakpointArray,
			breakpointIndex,
		)
		spacingResult = {
			...spacingResult,
			[key]: breakpointSpecificSpacing,
		}
	})

	return spacingResult
}
