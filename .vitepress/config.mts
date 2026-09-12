import { defineConfig } from 'vitepress';

export default defineConfig({
	title: 'Syntaxia',
	description: 'An interactive programming book covering languages, frameworks, and dev tools.',
	cleanUrls: true,

	head: [
		['link', { rel: 'icon', href: '/favicon.svg' }],
	],

	themeConfig: {
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Lessons', link: '/lessons/' },
		],

		sidebar: {
			'/lessons/': [
				{
					text: 'HTML, CSS & JS',
					collapsed: false,
					items: [
						{ text: 'Intro to HTML', link: '/lessons/html-css-js/intro-to-html' },
					],
				},
				{
					text: 'Python',
					collapsed: false,
					items: [
						{ text: 'Intro to Python', link: '/lessons/python/intro-to-python' },
					],
				},
			],
		},

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/Joshiii7/syntaxia' },
		],

		search: {
			provider: 'local',
		},
	},
});
