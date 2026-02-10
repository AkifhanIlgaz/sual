const { heroui } = require('@heroui/theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)'],
				mono: ['var(--font-mono)']
			}
		}
	},
	darkMode: 'class'
}
