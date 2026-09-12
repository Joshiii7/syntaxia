import { defineConfig } from 'vitepress';

const SITE_TITLE = 'Syntaxia';
const SITE_DESCRIPTION = 'An interactive programming book covering languages, frameworks, and dev tools.';
const AUTHOR_NAME = 'Joshi Angelo Z. Adlawan';

// TODO: replace with the site's real deployed URL (GitHub Pages, a custom
// domain, etc.) once it exists. Canonical links, og:url, and JSON-LD @id/url
// fields all need a real, final URL to be correct — a placeholder here is a
// known, deliberate gap, not an oversight (see coding-standards-websites'
// "watch for a placeholder domain" note).
const SITE_URL = 'https://YOUR-DOMAIN-HERE.com';

const OG_IMAGE = `${SITE_URL}/syntaxia-logo.png`;

const SECTION_NAMES: Record<string, string> = {
	ide: 'IDEs',
	html: 'HTML',
	css: 'CSS',
	javascript: 'JavaScript',
	python: 'Python',
};

const SECTION_FIRST_LESSON: Record<string, string> = {
	ide: '/lessons/ide/introduction',
	html: '/lessons/html/introduction',
	css: '/lessons/css/intro-to-css',
	javascript: '/lessons/javascript/intro-to-javascript',
	python: '/lessons/python/intro-to-python',
};

// Mirrors VitePress's own cleanUrls: true routing, so this always matches
// the page's real, final address instead of a raw ".md" source path.
function pageToPath(page: string): string {
	if (page === 'index.md') return '/';
	if (page.endsWith('/index.md')) return `/${page.slice(0, -'index.md'.length)}`;
	return `/${page.replace(/\.md$/, '')}`;
}

export default defineConfig({
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	cleanUrls: true,

	head: [
		['link', { rel: 'icon', href: '/favicon.svg' }],
		['meta', { name: 'author', content: AUTHOR_NAME }],
	],

	// Runs once per page at build time, adding canonical/OG/Twitter meta tags
	// and JSON-LD structured data. Centralized here instead of repeated in
	// every lesson's frontmatter, so every current and future page gets it
	// automatically and consistently, driven by that page's own title and
	// description.
	transformHead({ page, pageData }) {
		const path = pageToPath(page);
		const url = `${SITE_URL}${path}`;
		const title = pageData.title || SITE_TITLE;
		const description = pageData.description || SITE_DESCRIPTION;

		const head: [string, Record<string, string>, string?][] = [
			['link', { rel: 'canonical', href: url }],
			['meta', { property: 'og:site_name', content: SITE_TITLE }],
			['meta', { property: 'og:title', content: title }],
			['meta', { property: 'og:description', content: description }],
			['meta', { property: 'og:url', content: url }],
			['meta', { property: 'og:image', content: OG_IMAGE }],
			// summary, not summary_large_image: the logo is a near-square mark,
			// not a wide banner, so the compact Twitter/X card fits it correctly
			// instead of stretching or heavily cropping it.
			['meta', { name: 'twitter:card', content: 'summary' }],
			['meta', { name: 'twitter:title', content: title }],
			['meta', { name: 'twitter:description', content: description }],
			['meta', { name: 'twitter:image', content: OG_IMAGE }],
		];

		const segments = page.split('/');
		const isHome = page === 'index.md';
		const isLessonsIndex = page === 'lessons/index.md';
		const isLessonPage = segments.length === 3 && segments[0] === 'lessons' && segments[1] in SECTION_NAMES;

		head.push(['meta', { property: 'og:type', content: isHome ? 'website' : 'article' }]);

		if (isHome) {
			head.push([
				'script',
				{ type: 'application/ld+json' },
				JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'WebSite',
					name: SITE_TITLE,
					url: `${SITE_URL}/`,
					description: SITE_DESCRIPTION,
					author: { '@type': 'Person', name: AUTHOR_NAME },
				}),
			]);
		} else if (isLessonPage) {
			const sectionSlug = segments[1];
			const sectionName = SECTION_NAMES[sectionSlug];
			const sectionUrl = `${SITE_URL}${SECTION_FIRST_LESSON[sectionSlug]}`;

			const breadcrumbItems: Record<string, unknown>[] = [
				{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
				{ '@type': 'ListItem', position: 2, name: 'Lessons', item: `${SITE_URL}/lessons/` },
				{ '@type': 'ListItem', position: 3, name: sectionName, item: sectionUrl },
			];
			// Only add a 4th crumb if this page isn't already that same
			// section-landing page, so the trail never repeats its last stop.
			if (url !== sectionUrl) {
				breadcrumbItems.push({ '@type': 'ListItem', position: 4, name: title, item: url });
			}

			head.push([
				'script',
				{ type: 'application/ld+json' },
				JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'BreadcrumbList',
					itemListElement: breadcrumbItems,
				}),
			]);

			head.push([
				'script',
				{ type: 'application/ld+json' },
				JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'Article',
					headline: title,
					description,
					url,
					author: { '@type': 'Person', name: AUTHOR_NAME },
					publisher: { '@type': 'Person', name: AUTHOR_NAME },
					isPartOf: { '@type': 'WebSite', name: SITE_TITLE, url: `${SITE_URL}/` },
				}),
			]);
		} else if (isLessonsIndex) {
			head.push([
				'script',
				{ type: 'application/ld+json' },
				JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'BreadcrumbList',
					itemListElement: [
						{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
						{ '@type': 'ListItem', position: 2, name: 'Lessons', item: `${SITE_URL}/lessons/` },
					],
				}),
			]);
		}

		return head;
	},

	themeConfig: {
		logo: { src: '/syntaxia-logo.png', alt: 'Syntaxia logo' },

		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Lessons', link: '/lessons/' },
		],

		sidebar: {
			'/lessons/': [
				{
					text: 'IDEs',
					collapsed: true,
					items: [
						{ text: '1. Introduction to IDEs', link: '/lessons/ide/introduction' },
						{ text: '2. Popular IDEs and Their History', link: '/lessons/ide/popular-ides' },
						{ text: '3. The Most Used IDE', link: '/lessons/ide/most-used-ide' },
					],
				},
				{
					text: 'HTML',
					collapsed: true,
					items: [
						{ text: '1. Introduction to HTML', link: '/lessons/html/introduction' },
						{ text: '2. Your First HTML File', link: '/lessons/html/your-first-html-file' },
						{ text: '3. Attributes', link: '/lessons/html/attributes' },
						{ text: '4. Basic Structure', link: '/lessons/html/basic-structure' },
						{ text: '5. Meta Tags and the Head', link: '/lessons/html/meta-and-head-tags' },
						{ text: '6. Headings and Paragraphs', link: '/lessons/html/headings-and-paragraphs' },
						{ text: '7. Text Formatting', link: '/lessons/html/text-formatting' },
						{ text: '8. Links', link: '/lessons/html/links' },
						{ text: '9. Images', link: '/lessons/html/images' },
						{ text: '10. Lists', link: '/lessons/html/lists' },
						{ text: '11. Tables', link: '/lessons/html/tables' },
						{ text: '12. Forms Part 1', link: '/lessons/html/forms-part-1' },
						{ text: '13. Forms Part 2', link: '/lessons/html/forms-part-2' },
						{ text: '14. Divs and Spans', link: '/lessons/html/divs-and-spans' },
						{ text: '15. Semantic HTML', link: '/lessons/html/semantic-html' },
						{ text: '16. Comments and Clean Code', link: '/lessons/html/comments-and-clean-code' },
						{ text: '17. Putting It All Together', link: '/lessons/html/putting-it-all-together' },
						{ text: '18. Final Quiz', link: '/lessons/html/final-quiz' },
					],
				},
				{
					text: 'CSS',
					collapsed: true,
					items: [
						{ text: 'Intro to CSS', link: '/lessons/css/intro-to-css' },
					],
				},
				{
					text: 'JavaScript',
					collapsed: true,
					items: [
						{ text: 'Intro to JavaScript', link: '/lessons/javascript/intro-to-javascript' },
					],
				},
				{
					text: 'Python',
					collapsed: true,
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
