import { useEffect } from 'react'

import { usePageContainerValues } from 'hooks/theme/usePageContainerValues'

import { useAnimatedStyle, useSharedValue, withTiming } from 'utils/reanimated'

export const useAnimatedPageMarginStyle = () => {
	const { left, right } = usePageContainerValues()

	const leftSharedValue = useSharedValue(left)
	const rightSharedValue = useSharedValue(right)

	useEffect(() => {
		leftSharedValue.value = left
		rightSharedValue.value = right
	}, [left, right, leftSharedValue, rightSharedValue])

	const customSpringStyles = useAnimatedStyle(() => {
		return {
			marginLeft: withTiming(leftSharedValue.value),
			marginRight: withTiming(rightSharedValue.value),
		}
	})

	return { animatedPageMarginStyle: customSpringStyles }
}
