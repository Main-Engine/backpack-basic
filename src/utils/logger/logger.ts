import { InteractionManager } from 'react-native'

import { consoleTransport, logger as libLogger, transportFunctionType } from './lib'

const transport: transportFunctionType = (props) => {
	return consoleTransport(props)
}

const defaultConfig = {
	levels: {
		debug: 0,
		info: 100,
		success: 200,
		warn: 300,
		error: 400,
		fatal: 500,
	},
	severity: 'debug',
	transport,
	transportOptions: {
		colors: {
			debug: '',
			info: 'blueBright',
			success: 'greenBright',
			warn: 'yellowBright',
			error: 'redBright',
			fatal: 'red',
		},
		extensionColors: {
			DEFAULT: 'whiteBright',
			REALM: 'magentaBright',
		},
	},
	enabledExtensions: ['DEFAULT', 'REALM'],
	async: true,
	asyncFunc: InteractionManager.runAfterInteractions,
	dateFormat: 'time',
	printLevel: false,
	printDate: false,
	enabled: true,
}

const baseLogger = libLogger.createLogger(defaultConfig)
const defaultLogger = baseLogger.extend('DEFAULT')
const realmLogger = baseLogger.extend('REALM')

export const { debug, info, success, warn, error, fatal } = defaultLogger

export const logger = {
	realm: realmLogger,
}
