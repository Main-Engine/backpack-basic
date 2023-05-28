module.exports = (api) => {
	api.cache(true)
	return {
		presets: ['module:metro-react-native-babel-preset'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./src'],
					alias: {
						'@mainengine/backpack': './src',
						common: './src/components/common',
						partials: './src/components/partials',
						pages: './src/components/pages',
						utils: './src/utils',
						navigators: './src/navigators',
						constants: './src/utils/constants',
						contexts: './src/contexts',
						api: './src/api',
					},
					extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
				},
			],
			[
				'babel-plugin-styled-components',
				{
					meaninglessFileNames: ['index', 'styles'],
				},
			],
			'@babel/plugin-proposal-export-namespace-from',
		],
	}
}
