import { defineAsyncComponent, h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import Quiz from './components/Quiz.vue';
import HomeSections from './components/HomeSections.vue';
import RotatingCube from './components/RotatingCube.vue';
import ScrollToTopButton from './components/ScrollToTopButton.vue';
import SiteFooter from './components/SiteFooter.vue';
import './style.css';

export default {
	extends: DefaultTheme,
	Layout() {
		// layout-bottom is the default theme's supported slot for content
		// outside the scrolling doc area — a fixed scroll-to-top button and a
		// real, always-present page footer both belong here.
		//
		// home-hero-image is the default theme's supported slot for replacing
		// the hero's image side with arbitrary content (it normally renders
		// frontmatter's hero.image). Filling it with the cube is what actually
		// puts a live Vue component beside the h1, since hero.image only
		// accepts a static image/video source, not a component.
		return h(DefaultTheme.Layout, null, {
			'layout-bottom': () => [h(SiteFooter), h(ScrollToTopButton)],
			'home-hero-image': () => h(RotatingCube),
		});
	},
	enhanceApp({ app }) {
		// CodeMirror is heavy; code-split it into its own chunk so pages
		// without an editor don't pay for it.
		app.component('CodeEditor', defineAsyncComponent(() => import('./components/CodeEditor.vue')));
		app.component('WebPlayground', defineAsyncComponent(() => import('./components/WebPlayground.vue')));
		app.component('Quiz', Quiz);
		app.component('HomeSections', HomeSections);
	},
} satisfies Theme;
