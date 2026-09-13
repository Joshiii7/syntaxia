<script setup>
/**
 * Everything on the home page below VitePress's native hero (index.md's
 * frontmatter): why-syntaxia, what-you'll-learn, how-it-works, try-it-now
 * (a live WebPlayground), who-this-is-for, FAQ, and a closing call to
 * action, in that order.
 *
 * Every pattern below (banner art, scroll-reveal, accordion) is ported
 * from ../../../../portfolio, not invented fresh, since that project
 * already has a proven, tested version of each:
 *
 * - Background art: portfolio's `.section-heading-art` puts one real
 *   banner illustration (an `<img alt="" aria-hidden="true">`, not a CSS
 *   background-image) behind exactly one section per page — its FAQ
 *   section is the direct precedent for putting one here too. Same
 *   technique here, but only on FAQ: "Why Syntaxia" had it too, but the
 *   illustration sat directly behind the benefit cards and made them hard
 *   to read, so it was dropped there and that section stays plain.
 *
 * - Scroll effect: portfolio has no actual differential-speed parallax.
 *   Its `.reveal` class is a one-time IntersectionObserver fade-up
 *   (opacity 0 -> 1, translateY(40px) -> 0) triggered once per element as
 *   it enters the viewport, not a continuous scroll-linked transform.
 *   That's simpler, cheaper, and already accessible (see the
 *   prefers-reduced-motion override below), so it replaces this file's
 *   earlier bespoke rAF-parallax entirely.
 *
 * - FAQ accordion: portfolio's button+panel accordion, single item open
 *   at a time, with a real height animation (JS measures scrollHeight,
 *   transitions to it, then swaps to `auto` once open) rather than a
 *   plain instant native <details> toggle.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue';

const rootEl = ref(null);

// Card structure, glow-on-hover, and colored-per-item styling are ported
// from ../../../../portfolio's "Languages & Frameworks" tech grid
// (services/index.html + css/style.css's .skills/.skill-card rules).
// Icons here are the same real logo files portfolio uses
// (../../../../portfolio/assets/svg/*.svg), inlined so they render through
// the same v-html mechanism as the rest of this card. Each `color` is the
// logo's own brand color, so the glow matches the mark sitting on top of it.
const sections = [
	{
		name: 'IDEs',
		description: 'See the tools real developers use to write code.',
		link: '/lessons/ide/introduction',
		color: '#007ACC',
		icon: '<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><path d="M29.01,5.03,23.244,2.254a1.742,1.742,0,0,0-1.989.338L2.38,19.8A1.166,1.166,0,0,0,2.3,21.447c.025.027.05.053.077.077l1.541,1.4a1.165,1.165,0,0,0,1.489.066L28.142,5.75A1.158,1.158,0,0,1,30,6.672V6.605A1.748,1.748,0,0,0,29.01,5.03Z" fill="#0065a9"/><path d="M29.01,26.97l-5.766,2.777a1.745,1.745,0,0,1-1.989-.338L2.38,12.2A1.166,1.166,0,0,1,2.3,10.553c.025-.027.05-.053.077-.077l1.541-1.4A1.165,1.165,0,0,1,5.41,9.01L28.142,26.25A1.158,1.158,0,0,0,30,25.328V25.4A1.749,1.749,0,0,1,29.01,26.97Z" fill="#007acc"/><path d="M23.244,29.747a1.745,1.745,0,0,1-1.989-.338A1.025,1.025,0,0,0,23,28.684V3.316a1.024,1.024,0,0,0-1.749-.724,1.744,1.744,0,0,1,1.989-.339l5.765,2.772A1.748,1.748,0,0,1,30,6.6V25.4a1.748,1.748,0,0,1-.991,1.576Z" fill="#1f9cf0"/></svg>',
	},
	{
		name: 'HTML',
		description: 'Structure every webpage. Learn tag by tag.',
		link: '/lessons/html/introduction',
		color: '#E44F26',
		icon: '<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><polygon points="5.902 27.201 3.655 2 28.345 2 26.095 27.197 15.985 30 5.902 27.201" fill="#e44f26"/><polygon points="16 27.858 24.17 25.593 26.092 4.061 16 4.061 16 27.858" fill="#f1662a"/><polygon points="16 13.407 11.91 13.407 11.628 10.242 16 10.242 16 7.151 15.989 7.151 8.25 7.151 8.324 7.981 9.083 16.498 16 16.498 16 13.407" fill="#ebebeb"/><polygon points="16 21.434 15.986 21.438 12.544 20.509 12.324 18.044 10.651 18.044 9.221 18.044 9.654 22.896 15.986 24.654 16 24.65 16 21.434" fill="#ebebeb"/><polygon points="15.989 13.407 15.989 16.498 19.795 16.498 19.437 20.507 15.989 21.437 15.989 24.653 22.326 22.896 22.372 22.374 23.098 14.237 23.174 13.407 22.341 13.407 15.989 13.407" fill="#fff"/><polygon points="15.989 7.151 15.989 9.071 15.989 10.235 15.989 10.242 23.445 10.242 23.445 10.242 23.455 10.242 23.517 9.548 23.658 7.981 23.732 7.151 15.989 7.151" fill="#fff"/></svg>',
	},
	{
		name: 'CSS',
		description: 'Style your pages. Add color, spacing, and layout.',
		link: '/lessons/css/intro-to-css',
		color: '#663399',
		icon: '<svg viewBox="0 0 1000 1000" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><path fill="#639" d="M0 0H840A160 160 0 0 1 1000 160V840A160 160 0 0 1 840 1000H160A160 160 0 0 1 0 840V0Z"/><path fill="#fff" d="m358.1,920c-64.23-.06-103.86-36.23-103.1-102.79,0,0,0-168.39,0-168.39,0-33.74,9.88-59.4,29.64-76.96,35.49-34.19,117.83-36.27,152.59.52,21.42,18.89,29.5,57.48,27.58,93.49h-73.72c.56-14.15-.19-35.58-8.51-43.65-10.81-14.63-39.36-12.91-46.91,2.32-4.64,8.26-6.96,20.49-6.96,36.67v146.18c0,30.65,10.65,46.15,31.96,46.49,9.96,0,17.53-3.62,22.68-10.85,7.19-8.58,8.31-27.58,7.73-41.32h73.72c5.04,70.07-36.32,119.16-106.71,118.29Zm234.04,0c-71.17.98-103.01-49.66-101.04-118.29h69.59c-1.93,29.92,8.35,57.17,32.99,55.27,10.99,0,18.73-3.44,23.2-10.33,8.5-12.59,10.09-48.95-2.06-63.02-8.49-13.55-39.03-25.51-55.16-33.57-23.03-11.02-39.61-24.1-49.75-39.26-22.87-33.64-20.75-107.48,11.34-137.4,31.18-36.92,112.61-38.62,143.82-.77,19.25,19.51,27.66,57.9,26.03,93.23h-67.02c.57-14.52-.8-37.95-6.44-46.49-3.95-7.23-11.43-10.85-22.42-10.85-19.59,0-29.38,11.71-29.38,35.12.21,24.86,9.9,35.06,32.48,45.45,29.24,11.36,66.42,30.76,79.9,54.24,40.2,71.54,12.62,180.82-86.09,176.65Zm224.76,0c-71.17.98-103.01-49.66-101.04-118.29h69.59c-1.93,29.92,8.35,57.17,32.99,55.27,10.99,0,18.73-3.44,23.2-10.33,8.5-12.59,10.09-48.95-2.06-63.02-8.49-13.55-39.03-25.51-55.16-33.57-23.03-11.02-39.61-24.1-49.75-39.26-22.87-33.64-20.75-107.48,11.34-137.4,31.18-36.92,112.61-38.62,143.82-.77,19.25,19.51,27.66,57.9,26.03,93.23h-67.02c.57-14.52-.8-37.95-6.44-46.49-3.95-7.23-11.43-10.85-22.42-10.85-19.59,0-29.38,11.71-29.38,35.12.21,24.86,9.9,35.06,32.48,45.45,29.24,11.36,66.42,30.76,79.9,54.24,40.2,71.54,12.62,180.82-86.09,176.65Z"/></svg>',
	},
	{
		name: 'JavaScript',
		description: 'Make your pages respond. Add life to your code.',
		link: '/lessons/javascript/intro-to-javascript',
		color: '#F7DF1E',
		icon: '<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="28" height="28" fill="#FFCA28"/><path d="M19 25.2879L21.0615 23.9237C21.2231 24.4313 22.2462 25.6368 23.5385 25.6368C24.8308 25.6368 25.4308 24.931 25.4308 24.463C25.4308 23.1878 24.1112 22.7382 23.4774 22.5223C23.374 22.4871 23.289 22.4581 23.2308 22.4328C23.2009 22.4198 23.1558 22.4025 23.0979 22.3804C22.393 22.1111 19.7923 21.1175 19.7923 18.2373C19.7923 15.065 22.8538 14.7002 23.5462 14.7002C23.9991 14.7002 26.1769 14.7557 27.2615 16.7939L25.2615 18.1898C24.8231 17.3015 24.0946 17.0081 23.6462 17.0081C22.5385 17.0081 22.3077 17.8201 22.3077 18.1898C22.3077 19.227 23.5112 19.6919 24.5273 20.0844C24.7932 20.1871 25.0462 20.2848 25.2615 20.3866C26.3692 20.91 28 21.7666 28 24.463C28 25.8136 26.8672 28.0002 24.0154 28.0002C20.1846 28.0002 19.1692 25.7003 19 25.2879Z" fill="#3E3E3E"/><path d="M9 25.5587L11.1487 24.1953C11.317 24.7026 11.9713 25.638 12.9205 25.638C13.8698 25.638 14.3557 24.663 14.3557 24.1953V15.0002H16.9982V24.1953C17.041 25.4636 16.3376 28.0002 13.2332 28.0002C10.379 28.0002 9.19242 26.3039 9 25.5587Z" fill="#3E3E3E"/></svg>',
	},
	{
		name: 'Python',
		description: 'Learn a language built for logic. Use it outside the browser.',
		link: '/lessons/python/intro-to-python',
		color: '#3776AB',
		icon: '<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.0164 2C10.8193 2 9.03825 3.72453 9.03825 5.85185V8.51852H15.9235V9.25926H5.97814C3.78107 9.25926 2 10.9838 2 13.1111L2 18.8889C2 21.0162 3.78107 22.7407 5.97814 22.7407H8.27322V19.4815C8.27322 17.3542 10.0543 15.6296 12.2514 15.6296H19.5956C21.4547 15.6296 22.9617 14.1704 22.9617 12.3704V5.85185C22.9617 3.72453 21.1807 2 18.9836 2H13.0164ZM12.0984 6.74074C12.8589 6.74074 13.4754 6.14378 13.4754 5.40741C13.4754 4.67103 12.8589 4.07407 12.0984 4.07407C11.3378 4.07407 10.7213 4.67103 10.7213 5.40741C10.7213 6.14378 11.3378 6.74074 12.0984 6.74074Z" fill="url(#paint0_linear_87_8204)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.9834 30C21.1805 30 22.9616 28.2755 22.9616 26.1482V23.4815L16.0763 23.4815L16.0763 22.7408L26.0217 22.7408C28.2188 22.7408 29.9998 21.0162 29.9998 18.8889V13.1111C29.9998 10.9838 28.2188 9.25928 26.0217 9.25928L23.7266 9.25928V12.5185C23.7266 14.6459 21.9455 16.3704 19.7485 16.3704L12.4042 16.3704C10.5451 16.3704 9.03809 17.8296 9.03809 19.6296L9.03809 26.1482C9.03809 28.2755 10.8192 30 13.0162 30H18.9834ZM19.9015 25.2593C19.1409 25.2593 18.5244 25.8562 18.5244 26.5926C18.5244 27.329 19.1409 27.9259 19.9015 27.9259C20.662 27.9259 21.2785 27.329 21.2785 26.5926C21.2785 25.8562 20.662 25.2593 19.9015 25.2593Z" fill="url(#paint1_linear_87_8204)"/><defs><linearGradient id="paint0_linear_87_8204" x1="12.4809" y1="2" x2="12.4809" y2="22.7407" gradientUnits="userSpaceOnUse"><stop stop-color="#327EBD"/><stop offset="1" stop-color="#1565A7"/></linearGradient><linearGradient id="paint1_linear_87_8204" x1="19.519" y1="9.25928" x2="19.519" y2="30" gradientUnits="userSpaceOnUse"><stop stop-color="#FFDA4B"/><stop offset="1" stop-color="#F9C600"/></linearGradient></defs></svg>',
	},
];

// Icons are the outline set from ../../../../project-icons/outline (same
// source the favicon was picked from), used as-is: `stroke="currentColor"`
// on every one of these files means they just inherit whatever CSS color
// is set on the badge wrapping them, no per-icon color edits needed.
const whySyntaxia = [
	{
		title: 'No installs needed',
		detail: 'Everything runs in your browser. Nothing to download.',
		icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" /><path d="m7 12 3.5 3.5L17 9" /></svg>',
	},
	{
		title: 'Completely free',
		detail: 'Every lesson is free to read and use. No account needed.',
		icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12 12 2h8a2 2 0 0 1 2 2v8l-10 10L2 12Z" /><circle cx="16" cy="6" r="1.3" /></svg>',
	},
	{
		title: 'Made for beginners',
		detail: 'We explain every term. Even simple ones like browser or file.',
		icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></svg>',
	},
	{
		title: 'Learn by doing',
		detail: 'Type real code. See it work right away.',
		icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4l14 8-14 8V4Z" /></svg>',
	},
];

const howItWorks = [
	{ step: '1', title: 'Read a short lesson', detail: 'Every page explains one idea, in plain language.' },
	{ step: '2', title: 'Try the code yourself', detail: 'Type it into the built-in editor. No setup needed.' },
	{ step: '3', title: 'See it work right away', detail: 'The live preview updates as soon as you press Run.' },
	{ step: '4', title: 'Check what you learned', detail: 'A short quiz closes out most lessons.' },
];

// Same "user" icon on every line on purpose: each line describes a type of
// person this book is for, so one consistent persona icon reads correctly
// repeated, unlike Why Syntaxia above where each card is a different idea.
const whoThisIsForIcon =
	'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></svg>';

const whoThisIsFor = [
	'You have never written a line of code.',
	'You want to learn at your own pace.',
	'You like learning by doing, not just reading.',
	'You are curious how websites and apps actually work.',
];

const faqs = [
	{
		question: 'Do I need to know anything about computers before starting?',
		answer: 'No. We start from zero. We explain every term the first time it comes up, even simple ones like browser or file.',
	},
	{
		question: 'Do I need to install anything?',
		answer: 'No. Every lesson has a built-in code editor. It runs right in your browser.',
	},
	{
		question: 'Is this free?',
		answer: 'Yes. Syntaxia is completely free to use. No account is needed.',
	},
	{
		question: 'How long does a lesson take?',
		answer: 'Most lessons take about five to ten minutes. Short enough to finish in one sitting.',
	},
	{
		question: 'What if I get stuck?',
		answer: 'Reread the lesson slowly, or try the example again in the editor. Each idea builds on a small, simple example, so it helps to go back one step.',
	},
	{
		question: 'Do I need a powerful computer or a specific browser?',
		answer: 'No. Any normal computer or laptop works. Use a modern browser, like Chrome, Firefox, Edge, or Safari.',
	},
	{
		question: 'Will this actually teach me enough to build real things?',
		answer: 'Yes. You will build a real project by the end of the HTML section, and every later section builds on real, practical skills.',
	},
];

// --- Scroll reveal, ported from portfolio/js/main.js's revealObserver ---
let revealObserver = null;

onMounted(() => {
	revealObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					revealObserver.unobserve(entry.target);
				}
			}
		},
		{ threshold: 0.15, rootMargin: '0px 0px -80px 0px' },
	);

	rootEl.value?.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
});

onBeforeUnmount(() => {
	revealObserver?.disconnect();
});

// --- FAQ accordion, ported from portfolio/js/main.js's initAccordion ---
const openFaqIndex = ref(null);
const faqPanelRefs = ref([]);

function setFaqPanelRef(el, index) {
	if (el) faqPanelRefs.value[index] = el;
}

function clearPendingHeightListener(panel) {
	if (panel._pendingHeightListener) {
		panel.removeEventListener('transitionend', panel._pendingHeightListener);
		panel._pendingHeightListener = null;
	}
}

// Height can't be transitioned to/from `auto` directly: expand to a
// measured pixel value, then swap to `auto` once the transition ends, so
// it stays reflow-safe if the panel's content ever changes size later.
function expandPanel(panel) {
	clearPendingHeightListener(panel);
	panel.style.height = `${panel.scrollHeight}px`;
	const onEnd = (event) => {
		if (event.propertyName !== 'height') return;
		panel.style.height = 'auto';
		panel.removeEventListener('transitionend', onEnd);
		panel._pendingHeightListener = null;
	};
	panel._pendingHeightListener = onEnd;
	panel.addEventListener('transitionend', onEnd);
}

// Pin the current rendered height as a pixel value first, forcing a
// reflow so the browser registers it, then drop to 0, so the collapse
// actually animates instead of snapping shut instantly.
function collapsePanel(panel) {
	clearPendingHeightListener(panel);
	panel.style.height = `${panel.scrollHeight}px`;
	void panel.offsetHeight;
	panel.style.height = '0px';
}

function setFaqOpen(index, isOpen) {
	const panel = faqPanelRefs.value[index];
	if (!panel) return;
	if (isOpen) {
		expandPanel(panel);
	} else {
		collapsePanel(panel);
	}
}

// Accordion behavior: opening one closes whichever other item was open.
function toggleFaq(index) {
	const wasOpen = openFaqIndex.value === index;
	if (openFaqIndex.value !== null && openFaqIndex.value !== index) {
		setFaqOpen(openFaqIndex.value, false);
	}
	openFaqIndex.value = wasOpen ? null : index;
	setFaqOpen(index, !wasOpen);
}
</script>

<template>
	<div ref="rootEl">
		<!--
			No `reveal` class here: this is the first section right after the
			hero, so on most screens it's already fully or partly in the
			initial viewport. Hiding it until scroll-triggered would just
			read as a dead, empty gap right after the hero on first load.
		-->
		<section id="why-syntaxia" class="home-section home-why">
			<div class="home-section__inner">
				<h2 class="home-section__title">Why Syntaxia</h2>
				<div class="home-why__grid">
					<div v-for="item in whySyntaxia" :key="item.title" class="home-why__card">
						<span class="home-why__icon" v-html="item.icon" aria-hidden="true"></span>
						<strong>{{ item.title }}</strong>
						<span>{{ item.detail }}</span>
					</div>
				</div>
			</div>
		</section>

		<section class="home-section home-showcase reveal">
			<div class="home-section__inner">
				<h2 class="home-section__title">What you'll learn</h2>
				<p class="home-section__subtitle">Five sections. Each one builds on the last.</p>

				<ul class="skills" aria-label="Languages, frameworks, and tools Syntaxia teaches">
					<li v-for="section in sections" :key="section.name" class="skills__item">
						<a :href="section.link" class="skill-card" :aria-label="`${section.name}: ${section.description}`">
							<div class="glow" :style="{ background: section.color }"></div>
							<div class="content">
								<span class="skill-card__icon" v-html="section.icon"></span>
								<p>{{ section.name }}</p>
							</div>
						</a>
					</li>
				</ul>
			</div>
		</section>

		<section class="home-section home-how reveal">
			<div class="home-section__inner">
				<h2 class="home-section__title">How it works</h2>
				<div class="home-how__grid">
					<div v-for="item in howItWorks" :key="item.step" class="home-how__card">
						<span class="home-how__step">{{ item.step }}</span>
						<strong>{{ item.title }}</strong>
						<span>{{ item.detail }}</span>
					</div>
				</div>
			</div>
		</section>

		<section class="home-section home-try-it reveal">
			<div class="home-section__inner home-try-it__inner">
				<h2 class="home-section__title">Try it right now</h2>
				<p class="home-section__subtitle">No sign up, no download. Edit the code below and watch it update.</p>
				<WebPlayground
					layout="side-by-side"
					preview-theme="dark"
					:panes="['html']"
					:initial-html="'<h1>Hello, world!</h1>\n<p>Change this text and watch the preview update.</p>'"
					preview-height="360px"
				/>
			</div>
		</section>

		<section class="home-section home-who reveal">
			<div class="home-section__inner">
				<h2 class="home-section__title">Who this is for</h2>
				<ul class="home-who__list">
					<li v-for="line in whoThisIsFor" :key="line">
						<span class="home-who__icon" v-html="whoThisIsForIcon" aria-hidden="true"></span>
						<span>{{ line }}</span>
					</li>
				</ul>
			</div>
		</section>

		<section id="faq" class="home-section home-section--art home-faq reveal">
			<img class="home-section__art" src="/banners/faq.svg" alt="" aria-hidden="true">
			<div class="home-section__inner">
				<h2 class="home-section__title">Frequently asked questions</h2>

				<div class="accordion">
					<div v-for="(faq, index) in faqs" :key="faq.question" class="accordion-item">
						<h3>
							<button
								:id="`faq-trigger-${index}`"
								type="button"
								class="accordion-trigger"
								:aria-expanded="openFaqIndex === index"
								:aria-controls="`faq-panel-${index}`"
								@click="toggleFaq(index)"
							>
								<span>{{ faq.question }}</span>
								<span class="accordion-icon" aria-hidden="true"></span>
							</button>
						</h3>
						<div
							:id="`faq-panel-${index}`"
							class="accordion-panel"
							:class="{ 'is-open': openFaqIndex === index }"
							role="region"
							:aria-labelledby="`faq-trigger-${index}`"
							:aria-hidden="openFaqIndex !== index"
							:ref="(el) => setFaqPanelRef(el, index)"
						>
							<p>{{ faq.answer }}</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="home-section home-cta reveal">
			<div class="home-section__inner home-cta__inner">
				<CtaBanner />
			</div>
		</section>
	</div>
</template>

<style scoped>
.home-section {
	position: relative;
	padding: 64px 24px;
}

/* Ported from portfolio's .reveal: a one-time fade-up as each section
   first scrolls into view, toggled by the IntersectionObserver above. */
.reveal {
	opacity: 0;
	transform: translateY(40px);
	transition: opacity 0.8s ease, transform 0.8s ease;
}

.reveal.is-visible {
	opacity: 1;
	transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
	.reveal {
		transition: none;
		opacity: 1;
		transform: none;
	}
}

/*
 * Banner art, ported from portfolio's .section-heading-art: only these two
 * sections (Why Syntaxia, FAQ) get a real illustration behind them, not
 * every section. The image is decorative only (alt="", aria-hidden), so a
 * plain <img> positioned absolute + a gradient overlay for text contrast
 * is the same technique portfolio uses, not a content image needing real
 * alt text.
 */
.home-section--art {
	overflow: hidden;
}

.home-section__art {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
	z-index: 0;
}

/*
 * Light enough that the banner illustration is actually visible (the
 * banner's own base gradient is already dark navy on its own), just
 * enough to guarantee the heading text has reliable contrast wherever it
 * happens to land over the art.
 */
.home-section--art::before {
	content: '';
	position: absolute;
	inset: 0;
	z-index: 0;
	background: linear-gradient(180deg, rgba(10, 15, 31, 0.25), rgba(10, 15, 31, 0.55));
}

/*
 * 80rem (1280px at the default 16px root size) applies to every section's
 * content by default. "Try it right now" is the one deliberate exception:
 * it overrides this back to full width further down (.home-try-it__inner),
 * since that's the page's interactive centerpiece and reads better
 * spanning the whole viewport than boxed in at the same width as every
 * text section.
 */
.home-section__inner {
	position: relative;
	z-index: 1;
	max-width: 80rem;
	margin: 0 auto;
	text-align: center;
}

.home-section__title {
	margin: 0 0 32px;
	font-size: 28px;
	font-weight: 700;
	color: var(--vp-c-text-1);
	border: none;
	padding: 0;
}

.home-section__subtitle {
	margin: 0 0 40px;
	font-size: 16px;
	color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
	.home-section__title {
		font-size: 22px;
	}
}

/* Why Syntaxia */

.home-why__grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 20px;
}

.home-why__card {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	padding: 24px 20px;
	border-radius: 10px;
	border: 1px solid transparent;
	background: var(--vp-c-bg-soft);
	text-align: center;
	transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}

.home-why__card:hover,
.home-why__card:focus-within {
	transform: translateY(-4px);
	border-color: color-mix(in srgb, var(--color-brand-400) 40%, transparent);
	background: var(--vp-c-bg-elv);
	box-shadow: 0 12px 28px rgba(10, 15, 31, 0.35);
}

/* Fixed brand-400 accent, not theme-swapped, matching .home-how__step's
   badge below: a decorative icon accent stays the same color in light and
   dark mode rather than following --vp-c-brand-1. */
.home-why__icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 56px;
	height: 56px;
	border-radius: 50%;
	background: color-mix(in srgb, var(--color-brand-400) 20%, transparent);
	color: var(--color-brand-400);
	transition: transform 0.25s ease, background-color 0.25s ease;
}

/* :deep() is required here: v-html-injected markup isn't part of this
   component's compiled template, so it never gets the scoped data-v
   attribute a plain descendant selector like `.home-why__icon svg` would
   need to match it. */
.home-why__icon :deep(svg) {
	width: 28px;
	height: 28px;
}

.home-why__card:hover .home-why__icon,
.home-why__card:focus-within .home-why__icon {
	transform: scale(1.1);
	background: color-mix(in srgb, var(--color-brand-400) 32%, transparent);
}

.home-why__card strong {
	font-size: 16px;
	color: var(--vp-c-brand-1);
}

.home-why__card span {
	font-size: 14px;
	line-height: 1.5;
	color: var(--vp-c-text-2);
}

/*
 * What you'll learn: ported from portfolio's "Languages & Frameworks"
 * tech grid (css/style.css's .skills/.skill-card rules), including the
 * glow-on-hover treatment. Each card's own color (set inline from the
 * section's `color` field) drives both the glow and, on hover, how far it
 * spreads and how strong it gets.
 */
.skills {
	list-style: none;
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	gap: 16px;
}

.skill-card {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	aspect-ratio: 1 / 1;
	max-width: 8rem;
	margin: 0 auto;
	cursor: pointer;
	border-radius: 16px;
	transition: transform 0.3s ease;
}

.skill-card:hover,
.skill-card:focus-visible {
	transform: scale(1.05);
}

.skill-card:focus-visible {
	outline: 2px solid var(--color-brand-500);
	outline-offset: 2px;
}

.skill-card .glow {
	position: absolute;
	inset: 0;
	border-radius: 16px;
	filter: blur(15px);
	opacity: 0.2;
	transition: filter 0.3s ease, opacity 0.3s ease;
}

.skill-card:hover .glow,
.skill-card:focus-visible .glow {
	filter: blur(30px);
	opacity: 0.7;
}

.skill-card .content {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	padding: 16px;
	border-radius: 16px;
	backdrop-filter: blur(10px);
	background-color: rgba(10, 15, 31, 0.45);
}

.skill-card__icon {
	display: flex;
	width: 32px;
	height: 32px;
	margin-bottom: 8px;
}

.skill-card .content p {
	margin: 8px 0 0;
	color: var(--vp-c-text-1);
	font-size: 14px;
	font-weight: 600;
	text-align: center;
}

/* How it works */

.home-how__grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 20px;
}

.home-how__card {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6px;
	padding: 24px 20px;
	border-radius: 10px;
	border: 1px solid transparent;
	background: var(--vp-c-bg-soft);
	text-align: center;
	transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}

.home-how__card:hover,
.home-how__card:focus-within {
	transform: translateY(-4px);
	border-color: color-mix(in srgb, var(--color-brand-400) 40%, transparent);
	background: var(--vp-c-bg-elv);
	box-shadow: 0 12px 28px rgba(10, 15, 31, 0.35);
}

.home-how__step {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 28px;
	height: 28px;
	margin-bottom: 6px;
	border-radius: 50%;
	background: var(--color-brand-400);
	color: var(--color-navy-900);
	font-weight: 700;
	font-size: 14px;
	transition: transform 0.25s ease;
}

.home-how__card:hover .home-how__step,
.home-how__card:focus-within .home-how__step {
	transform: scale(1.1);
}

.home-how__card strong {
	font-size: 15px;
	color: var(--vp-c-text-1);
}

.home-how__card span {
	font-size: 14px;
	line-height: 1.5;
	color: var(--vp-c-text-2);
}

/*
 * Try it right now: no max-width at all, unlike every other section
 * (capped at 960px by the base .home-section__inner rule), and no left or
 * right padding on the section itself either, so the editor/preview widget
 * runs flush to the true left and right edges of the viewport instead of
 * stopping at a gutter. Top/bottom padding stays, so it doesn't collide
 * with the sections above and below it.
 */
.home-try-it {
	padding-left: 0;
	padding-right: 0;
}

.home-try-it__inner {
	max-width: none;
	width: 100%;
}

/* Who this is for */

.home-who__list {
	list-style: none;
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	gap: 16px;
	max-width: 760px;
	margin: 0 auto;
	text-align: center;
}

.home-who__list li {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	padding: 20px 18px;
	border-radius: 8px;
	border: 1px solid transparent;
	background: var(--vp-c-bg-soft);
	font-size: 15px;
	color: var(--vp-c-text-2);
	transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}

.home-who__list li:hover,
.home-who__list li:focus-within {
	transform: translateY(-4px);
	border-color: color-mix(in srgb, var(--color-brand-400) 40%, transparent);
	background: var(--vp-c-bg-elv);
	box-shadow: 0 12px 28px rgba(10, 15, 31, 0.35);
}

.home-who__icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	width: 28px;
	height: 28px;
	border-radius: 50%;
	background: color-mix(in srgb, var(--color-brand-400) 16%, transparent);
	color: var(--color-brand-400);
	transition: transform 0.25s ease;
}

.home-who__list li:hover .home-who__icon,
.home-who__list li:focus-within .home-who__icon {
	transform: scale(1.1);
}

.home-who__icon :deep(svg) {
	width: 16px;
	height: 16px;
}

/* FAQ accordion, ported from portfolio's .accordion / .accordion-item */

.home-faq .home-section__inner {
	max-width: 720px;
	text-align: left;
}

.home-faq .home-section__title {
	text-align: center;
}

.accordion {
	max-width: 800px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.accordion-item {
	background: var(--vp-c-bg-soft);
	border: 1px solid var(--vp-c-divider);
	border-radius: 12px;
	overflow: hidden;
}

.accordion-item h3 {
	margin: 0;
	padding: 0;
	border: none;
	font-size: inherit;
}

.accordion-trigger {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
	background: none;
	border: none;
	color: var(--vp-c-text-1);
	font-weight: 600;
	font-size: 15px;
	text-align: left;
	padding: 16px 20px;
	cursor: pointer;
}

.accordion-trigger:hover {
	color: var(--vp-c-brand-1);
}

.accordion-trigger:focus-visible {
	outline: 2px solid var(--color-brand-500);
	outline-offset: -2px;
}

/* Plus-to-minus icon, built from two CSS pseudo-elements rather than an
   icon font or SVG: a horizontal and vertical bar form a plus sign, and
   the vertical bar fades out and rotates when the panel is expanded,
   leaving just the horizontal bar behind as a minus sign. */
.accordion-icon {
	position: relative;
	flex-shrink: 0;
	width: 16px;
	height: 16px;
}

.accordion-icon::before,
.accordion-icon::after {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	background: var(--vp-c-brand-1);
	transform: translate(-50%, -50%);
	transition: transform 0.2s ease, opacity 0.2s ease;
}

.accordion-icon::before {
	width: 100%;
	height: 2px;
}

.accordion-icon::after {
	width: 2px;
	height: 100%;
}

.accordion-trigger[aria-expanded='true'] .accordion-icon::after {
	opacity: 0;
	transform: translate(-50%, -50%) rotate(90deg);
}

.accordion-panel {
	height: 0;
	overflow: hidden;
	transition: height 0.35s ease;
}

.accordion-panel.is-open {
	height: auto;
}

.accordion-panel p {
	margin: 0;
	padding: 0 20px 18px;
	font-size: 14px;
	line-height: 1.6;
	color: var(--vp-c-text-2);
}

@media (prefers-reduced-motion: reduce) {
	.accordion-panel {
		/* Not 0/none: a transitionend event still has to fire so the JS step
		   that swaps height to auto after expanding still runs. */
		transition-duration: 0.001s;
	}

	.accordion-icon::before,
	.accordion-icon::after {
		transition: none;
	}
}

/* Closing call to action: CtaBanner is a full-bleed promo panel, so this
   section drops the default horizontal padding/max-width the same way
   .home-try-it does above — the banner's own background runs edge to edge,
   and CtaBanner centers its *content* at 80rem internally instead. */
.home-cta {
	padding-left: 0;
	padding-right: 0;
}

.home-cta__inner {
	max-width: none;
	width: 100%;
	text-align: left;
}
</style>
