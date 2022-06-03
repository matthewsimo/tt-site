const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'base-content-faded': '#273658'
			}
		}
	},

	plugins: [require('daisyui')],

	daisyui: {
		themes: [
			'winter',
			{
				darkWinter: {
					primary: '#057AFF',
					secondary: '#463AA1',
					accent: '#C149AD',
					neutral: '#FFFFFF',
					'base-100': '#021431',
					info: '#93E6FB',
					success: '#80CED1',
					warning: '#EFD8BD',
					error: '#E58B8B'
				}
			}
		],
		darkTheme: 'darkWinter'
	}
};

module.exports = config;
