<script setup>
/**
 * HTML/CSS/JS lesson playground: three CodeMirror editors plus a sandboxed
 * iframe preview beside them. The preview iframe is rebuilt from srcdoc, so
 * the user's script never runs in the site's own origin/context.
 */
import { onBeforeUnmount, ref } from 'vue';
import CodeEditor from './CodeEditor.vue';

const props = defineProps({
	initialHtml: {
		type: String,
		default: '<h1>Hello, world!</h1>\n<p>Edit the HTML, CSS, and JS panes, then press Run.</p>',
	},
	initialCss: {
		type: String,
		default: 'h1 {\n\tcolor: #3451b2;\n}\n',
	},
	initialJs: {
		type: String,
		default: 'console.log("Hello from the sandboxed preview!");\n',
	},
	previewHeight: {
		type: String,
		default: '260px',
	},
});

const htmlCode = ref(props.initialHtml);
const cssCode = ref(props.initialCss);
const jsCode = ref(props.initialJs);
const previewDoc = ref('');

let debounceTimer = null;

function buildPreviewDocument() {
	return `<!doctype html>
<html>
<head><meta charset="utf-8"><style>${cssCode.value}</style></head>
<body>${htmlCode.value}
<script>${jsCode.value}<\/script>
</body>
</html>`;
}

function runPreview() {
	previewDoc.value = buildPreviewDocument();
}

function scheduleAutoRun() {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(runPreview, 600);
}

onBeforeUnmount(() => clearTimeout(debounceTimer));

runPreview();
</script>

<template>
	<div class="web-playground">
		<div class="web-playground__editors">
			<section class="web-playground__pane">
				<h4 class="web-playground__pane-title">HTML</h4>
				<CodeEditor
					v-model="htmlCode"
					language="html"
					label="HTML code editor"
					min-height="120px"
					@update:modelValue="scheduleAutoRun"
				/>
			</section>
			<section class="web-playground__pane">
				<h4 class="web-playground__pane-title">CSS</h4>
				<CodeEditor
					v-model="cssCode"
					language="css"
					label="CSS code editor"
					min-height="120px"
					@update:modelValue="scheduleAutoRun"
				/>
			</section>
			<section class="web-playground__pane">
				<h4 class="web-playground__pane-title">JavaScript</h4>
				<CodeEditor
					v-model="jsCode"
					language="javascript"
					label="JavaScript code editor"
					min-height="120px"
					@update:modelValue="scheduleAutoRun"
				/>
			</section>
			<button type="button" class="web-playground__run" @click="runPreview">
				Run
			</button>
		</div>

		<div class="web-playground__preview">
			<h4 class="web-playground__pane-title">Preview</h4>
			<iframe
				class="web-playground__frame"
				:style="{ height: previewHeight }"
				:srcdoc="previewDoc"
				sandbox="allow-scripts"
				title="Live preview of your HTML, CSS, and JavaScript"
			></iframe>
		</div>
	</div>
</template>

<style scoped>
.web-playground {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
	margin: 24px 0;
}

@media (max-width: 719px) {
	.web-playground {
		grid-template-columns: 1fr;
	}
}

.web-playground__pane {
	margin-bottom: 12px;
}

.web-playground__pane-title {
	margin: 0 0 6px;
	font-size: 13px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.04em;
	color: var(--vp-c-text-2);
}

.web-playground__run {
	display: inline-flex;
	align-items: center;
	padding: 8px 16px;
	border: none;
	border-radius: 6px;
	background: var(--vp-c-brand-1);
	color: var(--vp-c-white);
	font-weight: 600;
	cursor: pointer;
}

.web-playground__run:hover {
	background: var(--vp-c-brand-2);
}

.web-playground__run:focus-visible {
	outline: 2px solid var(--vp-c-brand-1);
	outline-offset: 2px;
}

.web-playground__preview {
	display: flex;
	flex-direction: column;
}

.web-playground__frame {
	width: 100%;
	border: 1px solid var(--vp-c-divider);
	border-radius: 8px;
	background: #fff;
}
</style>
