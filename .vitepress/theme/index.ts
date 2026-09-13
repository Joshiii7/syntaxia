import { computed, defineAsyncComponent, h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import { useRoute } from 'vitepress';
import type { Theme } from 'vitepress';
import Quiz from './components/Quiz.vue';
import HomeSections from './components/HomeSections.vue';
import CtaBanner from './components/CtaBanner.vue';
import RotatingCube from './components/RotatingCube.vue';
import ScrollToTopButton from './components/ScrollToTopButton.vue';
import SiteFooter from './components/SiteFooter.vue';
import LessonSidebar from './components/LessonSidebar.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import LessonNav from './components/LessonNav.vue';
import LessonsIndex from './components/LessonsIndex.vue';
import PathsIndex from './components/PathsIndex.vue';
import './style.css';

export default {
	extends: DefaultTheme,
	Layout() {
		const route = useRoute();
		// Individual lesson pages only — excludes /lessons/ itself, which uses
		// LessonsIndex.vue in its body instead of the sidebar/breadcrumb/nav trio.
		const isLessonRoute = computed(() => route.path.includes('/lessons/') && route.path !== '/lessons/');

		// layout-bottom is the default theme's supported slot for content
		// outside the scrolling doc area — a fixed scroll-to-top button and a
		// real, always-present page footer both belong here.
		//
		// home-hero-image is the default theme's supported slot for replacing
		// the hero's image side with arbitrary content (it normally renders
		// frontmatter's hero.image). Filling it with the cube is what actually
		// puts a live Vue component beside the h1, since hero.image only
		// accepts a static image/video source, not a component.
		//
		// sidebar-nav-before/doc-before/doc-after are the default theme's
		// supported extension points around, respectively, its own
		// (neutralized, see config.mts) sidebar tree and the rendered doc body
		// — this is how LessonSidebar/Breadcrumb/LessonNav slot in without
		// replacing DefaultTheme.Layout wholesale.
		return h(DefaultTheme.Layout, null, {
			'layout-bottom': () => [h(SiteFooter), h(ScrollToTopButton)],
			'home-hero-image': () => h(RotatingCube),
			'sidebar-nav-before': () => (isLessonRoute.value ? h(LessonSidebar) : null),
			'doc-before': () => (isLessonRoute.value ? h(Breadcrumb) : null),
			'doc-after': () => (isLessonRoute.value ? h(LessonNav) : null),
		});
	},
	enhanceApp({ app }) {
		// CodeMirror is heavy; code-split it into its own chunk so pages
		// without an editor don't pay for it.
		app.component('CodeEditor', defineAsyncComponent(() => import('./components/CodeEditor.vue')));
		app.component('WebPlayground', defineAsyncComponent(() => import('./components/WebPlayground.vue')));
		app.component('Exercise', defineAsyncComponent(() => import('./components/Exercise.vue')));
		app.component('Quiz', Quiz);
		app.component('HomeSections', HomeSections);
		app.component('CtaBanner', CtaBanner);
		app.component('LessonsIndex', LessonsIndex);
		app.component('PathsIndex', PathsIndex);
	},
} satisfies Theme;
