import { defineAsyncComponent } from 'vue';
import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import Quiz from './components/Quiz.vue';
import './style.css';

export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		// CodeMirror is heavy; code-split it into its own chunk so pages
		// without an editor don't pay for it.
		app.component('CodeEditor', defineAsyncComponent(() => import('./components/CodeEditor.vue')));
		app.component('WebPlayground', defineAsyncComponent(() => import('./components/WebPlayground.vue')));
		app.component('Quiz', Quiz);
	},
} satisfies Theme;
