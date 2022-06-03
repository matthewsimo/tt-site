const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [require('daisyui')],

	daisyui: {
		themes: ['emerald', 'business'],
		darkTheme: 'business'
	}
};

module.exports = config;
