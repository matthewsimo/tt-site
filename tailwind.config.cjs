const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [require('daisyui')],

	daisyui: {
		themes: ['lofi', 'black'],
		darkTheme: 'black'
	}
};

module.exports = config;
