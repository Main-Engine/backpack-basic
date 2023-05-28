import { useFonts } from 'hooks/theme/useFonts'

import { fonts } from 'utils/constants'

export const useSetupFonts = () => {
	const [loaded, error] = useFonts({
		[fonts.headingFontBold]: require(`../../../../assets/fonts/gtwalsheim/GTWalsheim-Bd.otf`),
		[fonts.paragraphFont]: require(`../../../../assets/fonts/poppins/Poppins-Regular.ttf`),
		[fonts.paragraphFontMedium]: require(`../../../../assets/fonts/poppins/Poppins-Medium.ttf`),
		[fonts.paragraphFontBold]: require(`../../../../assets/fonts/poppins/Poppins-Bold.ttf`),

		[fonts.faProThin]: require(`../../../../assets/fonts/fontawesome/FA6Pro-Thin-100.otf`),
		[fonts.faProLight]: require(`../../../../assets/fonts/fontawesome/FA6Pro-Light-300.otf`),
		[fonts.faProRegular]: require(`../../../../assets/fonts/fontawesome/FA6Pro-Regular-400.otf`),
		[fonts.faProSolid]: require(`../../../../assets/fonts/fontawesome/FA6Pro-Solid-900.otf`),
		[fonts.faBrandsRegular]: require(`../../../../assets/fonts/fontawesome/FA6Brands-Regular-400.otf`),
	})

	return [loaded, error]
}
