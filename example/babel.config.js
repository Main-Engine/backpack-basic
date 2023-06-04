// const path = require('path')
// const pak = require('../package.json')

module.exports = function (api) {
	api.cache(true)

	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					extensions: ['.tsx', '.ts', '.js', '.json'],
					alias: {
						// Todo - figure out how to make this work in dev mode, so we dont have to build
						// For development, we want to alias the library to the source
						// [pak.name]: path.join(__dirname, '..', pak.source),
					},
				},
			],
		],
	}
}
