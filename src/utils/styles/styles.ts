import { Color, ColorOption, Shadow, Space, Theme, UnwrappedResponsiveProps } from 'utils/theme'

import {
	ContainerProps,
	DisplayProps,
	FlexProps,
	PositionProps,
	SizeProps,
	SpacingProps,
	TypographyProps,
} from 'types/theme'

export const getDisplayStyles = ({
	display,
	overflow,
	aspectRatio,
}: UnwrappedResponsiveProps<DisplayProps>) =>
	`
		${getSimpleStyle('display', display)}
		${getSimpleStyle('overflow', overflow)}
		${getSimpleStyle('aspect-ratio', aspectRatio)}
	`

export const getFlexStyles = ({
	flexWrap,
	flex,
	flexDirection,
	align,
	justify,
}: UnwrappedResponsiveProps<FlexProps>) =>
	`
		${getSimpleStyle('flex-wrap', flexWrap)}
		${getSimpleStyle('flex', flex)}
		${getSimpleStyle('flex-direction', flexDirection)}
		${getSimpleStyle('align-items', align)}
		${getSimpleStyle('justify-content', justify)}
	`

export const getPositionStyles = ({
	position,
	top,
	right,
	bottom,
	left,
	zIndex,
}: UnwrappedResponsiveProps<PositionProps>) =>
	`
		${getSimpleStyle('position', position)}
		${getThemedSizeStyle('top', top)}
		${getThemedSizeStyle('right', right)}
		${getThemedSizeStyle('bottom', bottom)}
		${getThemedSizeStyle('left', left)}
		${getSimpleStyle('z-index', zIndex)}
	`

export const getSizeStyles = ({
	maxWidth,
	maxHeight,
	minWidth,
	minHeight,
	width,
	height,
}: UnwrappedResponsiveProps<SizeProps>) =>
	`
		${getThemedSizeStyle('width', width)}
		${getThemedSizeStyle('min-width', minWidth)}
		${getThemedSizeStyle('max-width', maxWidth)}
		${getThemedSizeStyle('height', height)}
		${getThemedSizeStyle('min-height', minHeight)}
		${getThemedSizeStyle('max-height', maxHeight)}
	`

export const getSpacingStyles = (theme: Theme, props: UnwrappedResponsiveProps<SpacingProps>) =>
	`
		${getMarginStyles(theme, props)}
		${getPaddingStyles(theme, props)}
	`

export const getContainerStyles = (
	theme: Theme,
	props: UnwrappedResponsiveProps<ContainerProps>,
) => {
	const { borderRadius, shadow, border, background, backgroundColorKey, opacity } = props

	return `
		${getShadowStyles(theme, shadow)}

		${getBorderRadiusStyles(theme, borderRadius)}
		${getFullBorderStyles(theme, border)}

		${getBorderStyles(theme, 'border-left', border)}
		${getBorderStyles(theme, 'border-right', border)}
		${getBorderStyles(theme, 'border-top', border)}
		${getBorderStyles(theme, 'border-bottom', border)}

		${getSimpleStyle('opacity', opacity)}
		${getColorStyles(
			theme,
			'background-color',
			{
				color: background,
				colorKey: backgroundColorKey,
			},
			'base',
		)}
	`
}

export const getTypographyStyles = (
	theme: Theme,
	props: UnwrappedResponsiveProps<TypographyProps>,
) => {
	const {
		color = 'base',
		colorKey = 'foreground',
		size = 'md',
		font = 'body',
		textAlign,
		weight = 'normal',
	} = props

	return `
		${getSimpleStyle('text-align', textAlign)}
		font-family: ${theme.typography.family.text[font][weight].name};
		font-size: ${theme.size.font[size]}px;
		font-weight: ${theme.typography.family.text[font][weight].weight};
		${getColorStyles(
			theme,
			'color',
			{
				color,
				colorKey,
			},
			'base',
		)}
	`
}

const getShadowStyles = (theme: Theme, value?: Shadow) =>
	value !== undefined
		? `
      shadow-radius: ${theme.shadow.base[value].shadowRadius}px;
      shadow-opacity: ${theme.shadow.base[value].shadowOpacity};
      shadow-color: ${theme.shadow.base[value].shadowColor};
      shadow-offset: ${theme.shadow.base[value].shadowOffset};
	  `
		: ''

const getBorderRadiusStyles = (
	theme: Theme,
	value?: UnwrappedResponsiveProps<ContainerProps>['borderRadius'],
) =>
	value !== undefined
		? `${getThemedSpaceStyle(theme, 'border-radius', value === 'full' ? 999 : value)}`
		: ''

const getFullBorderStyles = (
	theme: Theme,
	value?: UnwrappedResponsiveProps<ContainerProps>['border'],
) =>
	value !== undefined
		? `border: ${value.width}px ${value.style || 'solid'} ${
				theme.color[value.color || 'base'][value.colorKey || 'base']
		  };`
		: ''

const getBorderStyles = (
	theme: Theme,
	key: string,
	value?: UnwrappedResponsiveProps<ContainerProps>['border'],
) =>
	value !== undefined
		? `${
				value?.width !== undefined
					? `${key}-width: ${value.width !== undefined ? value.width : 0}px;`
					: ''
		  } ${
				value?.color !== undefined
					? `${key}-color: ${theme.color[value.color][value.colorKey || 'base']};`
					: ''
		  }`
		: ''

const getSizeFromStringOrNumber = (value: string | number) =>
	typeof value === 'string' ? value : `${value}px`

const getSimpleStyle = (key: string, value?: string | number) =>
	value !== undefined ? `${key}: ${value};` : ''

const getThemedSpaceStyle = (theme: Theme, key: string, value?: number | Space) =>
	value !== undefined
		? `${key}: ${typeof value === 'number' ? value : theme.space.base[value]}px;`
		: ''

const getThemedSizeStyle = (key: string, value?: number | string) =>
	value !== undefined ? `${key}: ${getSizeFromStringOrNumber(value)}` : ''

const getMarginStyles = (
	theme: Theme,
	{ marginTop, marginBottom, marginRight, marginLeft }: UnwrappedResponsiveProps<SpacingProps>,
) => `
	${getThemedSpaceStyle(theme, 'margin-top', marginTop)}
	${getThemedSpaceStyle(theme, 'margin-bottom', marginBottom)}
	${getThemedSpaceStyle(theme, 'margin-right', marginRight)}
	${getThemedSpaceStyle(theme, 'margin-left', marginLeft)}
`

const getPaddingStyles = (
	theme: Theme,
	{ paddingTop, paddingBottom, paddingLeft, paddingRight }: UnwrappedResponsiveProps<SpacingProps>,
) => `
	${getThemedSpaceStyle(theme, 'padding-top', paddingTop)}
	${getThemedSpaceStyle(theme, 'padding-bottom', paddingBottom)}
	${getThemedSpaceStyle(theme, 'padding-right', paddingRight)}
	${getThemedSpaceStyle(theme, 'padding-left', paddingLeft)}
`

const getColorStyles = (
	theme: Theme,
	key: string,
	value?: { color?: Color; colorKey?: ColorOption },
	defaultColorOption: ColorOption = 'base',
) => {
	if (value === undefined || !value.color || value.color === 'transparent') return ''
	const { color, colorKey = defaultColorOption } = value
	const colorValue = theme.color[color][colorKey]

	return getSimpleStyle(key, colorValue)
}
