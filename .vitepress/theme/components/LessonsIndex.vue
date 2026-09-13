<script setup>
/**
 * Data-driven replacement for lessons/index.md's hand-written prose list —
 * renders straight from curriculum.ts so this page can never drift from the
 * sidebar/breadcrumb again. Uses only plain semantic HTML that .vp-doc
 * already styles generically (headings, ordered lists, links), so this
 * introduces no new CSS.
 */
import { withBase } from 'vitepress';
import { curriculum, flattenTrackLessons } from '../data/curriculum';
</script>

<template>
	<div v-for="track in curriculum" :key="track.slug">
		<h2>{{ track.title }}</h2>

		<template v-if="track.chapters">
			<div v-for="chapter in track.chapters" :key="chapter.id">
				<h3>{{ chapter.title }}</h3>
				<ol>
					<li v-for="lesson in chapter.lessons" :key="lesson.slug">
						<a :href="withBase(`/lessons/${track.slug}/${lesson.slug}`)">{{ lesson.title }}</a>
					</li>
				</ol>
			</div>
		</template>
		<ol v-else>
			<li v-for="entry in flattenTrackLessons(track)" :key="entry.lesson.slug">
				<a :href="withBase(`/lessons/${track.slug}/${entry.lesson.slug}`)">{{ entry.lesson.title }}</a>
			</li>
		</ol>
	</div>
</template>
