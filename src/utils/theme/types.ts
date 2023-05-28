import { color, font, image, radius, size, space } from './template'
import { theme } from './theme'

export type Theme = ReturnType<typeof theme>

export type BreakpointArray = [number, number, number, number, number, number, number]
export type BreakpointSizeMatrix = {
	[key in size.Size]: BreakpointArray
}

export type BaseColor = color.Color

export type Breakpoints = size.Size & space.Space
export type Breakpoint = {
	readable: Breakpoints
	index: number
	isMobile: boolean
}

export type Color = keyof Theme['color']
export type ColorOption = keyof Theme['color']['base']
export type CompoundColor = `${Color}.${ColorOption}`
export type ColorKey = color.ColorKey
export type Size = size.Size
export type Space = space.Space
export type Shadow = space.Space
export type Radius = radius.Radis
export type ImageName = image.ImageName
export type ImageAspect = image.ImageAspect
export type ImageColors = image.ImageColors

export type TextFont = font.TextFontFamily
export type IconFont = font.IconFontFamily

export type TextFontWeight = font.TextFontWeight
export type IconFontWeight = font.IconFontWeight

export interface BoxSpacing {
	vertical?: Space | number
	horizontal?: Space | number
	top?: Space | number
	right?: Space | number
	bottom?: Space | number
	left?: Space | number
}

export type SkeletonProps = {
	width?: ResponsivePropWrapper<number | string>
	height?: ResponsivePropWrapper<number | string>
	minWidth?: ResponsivePropWrapper<number>
	maxWidth?: ResponsivePropWrapper<number>
	color?: ResponsivePropWrapper<Color>
	lines?: ResponsivePropWrapper<number>
}

export type ResponsiveObject<T> = {
	[key in Breakpoints]?: T
}

export type ResponsiveArray<T> = Array<T>

export type ResponsiveProp<T> = ResponsiveObject<T> | ResponsiveArray<T> | T
export type ResponsivePropWrapper<T> = { [key in keyof T]: ResponsiveProp<T[key]> }

export type UnwrappedResponsiveProp<T> = T extends ResponsiveProp<infer U> ? U : never
export type UnwrappedResponsiveProps<T> = {
	[key in keyof T]: UnwrappedResponsiveProp<T[key]>
}

type LoadingPropsWithSkeleton = {
	isLoading: ResponsivePropWrapper<boolean>
	skeleton?: SkeletonProps
}

export type WithLoadingWrapper<BaseProps, RequiredUnlessLoadingProp> = BaseProps &
	(
		| (Partial<RequiredUnlessLoadingProp> & LoadingPropsWithSkeleton)
		| (RequiredUnlessLoadingProp & Partial<LoadingPropsWithSkeleton>)
	)

// Try and fix this later...
// export type WithLoadingWrapper2<BaseProps, RequiredUnlessLoadingKeys> =
//   | (BaseProps & Partial<LoadingProps>)
//   | ({
//       [K in keyof BaseProps]: K extends RequiredUnlessLoadingKeys
//         ? Partial<BaseProps[K]>
//         : Partial<BaseProps[K]>
//     } & LoadingProps)

// This is the ideal API for this
// export type TextProps = WithLoadingWrapper2<RequiredTextProps, 'children'>
