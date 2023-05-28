import { usePage } from 'contexts/Page'
import { useTheme } from 'contexts/Theme'
import { useWindow } from 'contexts/Window'

export const usePageContainerValues = (maxWidth?: number) => {
	const { insets, breakpoint } = useWindow()
	const { theme } = useTheme()
	const { isMobile } = breakpoint

	const { layout } = usePage()

	// Todo - remove the hard coded 1000 later to work around the type issue of theme.maxWidth
	const pageMaxWidth = maxWidth || theme.maxWidth || 1000

	// If the content is wider than the page, we need to compute the extra space to the left and right
	const contentExtraSpace = layout.width > pageMaxWidth ? layout.width - pageMaxWidth : 0

	// We divide the extra space by 2 to get the margin space for either side
	const layoutMarginSpace = Math.ceil(contentExtraSpace / 2)

	// The minimum space we want to have on either side of the content
	const minimumBaseSpace = theme.space.base.xs
	const minimumLeftSpace = isMobile ? insets.left || minimumBaseSpace : minimumBaseSpace
	const minimumRightSpace = insets.right || minimumBaseSpace

	const left = minimumLeftSpace > layoutMarginSpace ? minimumLeftSpace : layoutMarginSpace
	const right = minimumRightSpace > layoutMarginSpace ? minimumRightSpace : layoutMarginSpace

	return {
		left,
		right,
	}
}
