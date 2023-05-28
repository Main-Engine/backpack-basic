import { GestureEvent, PanGestureHandlerEventPayload } from 'utils/reanimated'
import {
	BoxSpacing,
	Color,
	ColorOption,
	Radius,
	ResponsivePropWrapper,
	Shadow,
	Size,
	Space,
	TextFont,
	TextFontWeight,
} from 'utils/theme'

type _DisplayProps = {
	display?: 'flex' | 'grid' | 'block' | 'inline-block'
	overflow?: 'visible' | 'hidden' | 'scroll'
	visible?: boolean
	aspectRatio?: number
}
export type DisplayProps = ResponsivePropWrapper<_DisplayProps>

type _FlexProps = {
	flex?: number
	align?: Flex
	justify?: Flex
	flexDirection?: FlexDirection
	flexWrap?: 'wrap' | 'nowrap'
}
export type FlexProps = ResponsivePropWrapper<_FlexProps>

type _PositionProps = {
	position?: 'absolute' | 'relative'
	top?: Space | number | string
	right?: Space | number | string
	bottom?: Space | number | string
	left?: Space | number | string
	zIndex?: number
}
export type PositionProps = ResponsivePropWrapper<_PositionProps>

// Todo - Add | Size prop here and distinguish between Size and string 'xs' vs '100%'
type _SizeProps = {
	maxWidth?: string | number
	maxHeight?: string | number
	minWidth?: string | number
	minHeight?: string | number
	width?: string | number | 'auto'
	height?: string | number
}
export type SizeProps = ResponsivePropWrapper<_SizeProps>

type _SpacingProps = {
	margin?: Space | BoxSpacing
	padding?: Space | BoxSpacing
	paddingTop?: Space | number
	paddingBottom?: Space | number
	paddingRight?: Space | number
	paddingLeft?: Space | number
	marginTop?: Space | number
	marginBottom?: Space | number
	marginRight?: Space | number
	marginLeft?: Space | number
}
export type SpacingProps = ResponsivePropWrapper<_SpacingProps>

type _ContainerProps = {
	shadow?: Shadow

	borderRadius?: Radius | 'full'
	border?: BoxBorder

	borderLeft?: BoxBorder
	borderRight?: BoxBorder
	borderTop?: BoxBorder
	borderBottom?: BoxBorder

	opacity?: number
	background?: Color
	backgroundColorKey?: ColorOption
}
export type ContainerProps = ResponsivePropWrapper<_ContainerProps>

type _AnimationProps = {
	onGestureEvent?: (event: GestureEvent<PanGestureHandlerEventPayload>) => void
}
export type AnimationProps = ResponsivePropWrapper<_AnimationProps>

type _TypographyProps = {
	weight?: TextFontWeight
	font?: TextFont
	textAlign?: 'left' | 'center' | 'right'
	size?: Size

	color?: Color
	colorKey?: ColorOption
}
export type TypographyProps = ResponsivePropWrapper<_TypographyProps>

type Flex = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'

type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'

type BoxBorder = {
	width: number
	color?: Color
	colorKey?: ColorOption
	style?: 'solid' | 'dashed' | 'dotted'
}
