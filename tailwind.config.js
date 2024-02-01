/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				letterGoth: ['letter-gothic-std', 'sans serif'],
			},
		},
	},
	plugins: [],
};
