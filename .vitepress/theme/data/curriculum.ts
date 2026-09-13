/**
 * Single source of truth for lesson order, chapter grouping, and titles used
 * in navigation (sidebar, breadcrumb, next/prev). Replaces three previously
 * hand-duplicated orderings: config.mts's static sidebar array, the prose
 * list in lessons/index.md, and hand-written "Next lesson" links at the
 * bottom of each lesson body.
 *
 * Plain data + pure functions only — no Vue/browser/Node APIs — so this file
 * imports identically from .vitepress/config.mts (Node, build-time) and from
 * any .vue component (browser + SSR).
 *
 * Lesson `title` is intentionally duplicated here rather than read from each
 * .md's frontmatter: config.mts needs this synchronously at config-load
 * time, and frontmatter `title` remains solely the <title>/meta-tag source,
 * unrelated to navigation order.
 */

export interface CurriculumLesson {
	/** URL slug, matches the .md filename without extension. */
	slug: string;
	title: string;
}

export interface CurriculumChapter {
	/** Stable id, kebab-case. Never appears in a URL. */
	id: string;
	title: string;
	lessons: CurriculumLesson[];
}

export interface CurriculumTrack {
	/** URL segment under /lessons/, matches the lessons/<slug>/ directory. */
	slug: string;
	title: string;
	/** Exactly one of `chapters`/`lessons` is set — enforced by assertValidCurriculum(). */
	chapters?: CurriculumChapter[];
	lessons?: CurriculumLesson[];
}

export const curriculum: CurriculumTrack[] = [
	{
		slug: 'ide',
		title: 'IDEs',
		lessons: [
			{ slug: 'introduction', title: 'Introduction to IDEs' },
			{ slug: 'popular-ides', title: 'Popular IDEs and Their History' },
			{ slug: 'most-used-ide', title: 'The Most Used IDE' },
		],
	},
	{
		slug: 'html',
		title: 'HTML',
		chapters: [
			{
				id: 'getting-started',
				title: 'Getting Started',
				lessons: [
					{ slug: 'introduction', title: 'Introduction to HTML' },
					{ slug: 'your-first-html-file', title: 'Your First HTML File' },
					{ slug: 'attributes', title: 'Attributes' },
					{ slug: 'basic-structure', title: 'Basic Structure' },
				],
			},
			{
				id: 'document-structure-and-text',
				title: 'Document Structure & Text',
				lessons: [
					{ slug: 'meta-and-head-tags', title: 'Meta Tags and the Head' },
					{ slug: 'headings-and-paragraphs', title: 'Headings and Paragraphs' },
					{ slug: 'text-formatting', title: 'Text Formatting' },
				],
			},
			{
				id: 'links-media-and-data',
				title: 'Links, Media & Data',
				lessons: [
					{ slug: 'links', title: 'Links' },
					{ slug: 'images', title: 'Images' },
					{ slug: 'lists', title: 'Lists' },
					{ slug: 'tables', title: 'Tables' },
				],
			},
			{
				id: 'forms-and-layout',
				title: 'Forms & Layout',
				lessons: [
					{ slug: 'forms-part-1', title: 'Forms Part 1' },
					{ slug: 'forms-part-2', title: 'Forms Part 2' },
					{ slug: 'divs-and-spans', title: 'Divs and Spans' },
				],
			},
			{
				id: 'semantic-html-and-wrap-up',
				title: 'Semantic HTML & Wrap-up',
				lessons: [
					{ slug: 'semantic-html', title: 'Semantic HTML' },
					{ slug: 'comments-and-clean-code', title: 'Comments and Clean Code' },
					{ slug: 'putting-it-all-together', title: 'Putting It All Together' },
					{ slug: 'final-quiz', title: 'Final Quiz' },
				],
			},
		],
	},
	{
		slug: 'css',
		title: 'CSS',
		lessons: [{ slug: 'intro-to-css', title: 'Intro to CSS' }],
	},
	{
		slug: 'javascript',
		title: 'JavaScript',
		lessons: [{ slug: 'intro-to-javascript', title: 'Intro to JavaScript' }],
	},
	{
		slug: 'python',
		title: 'Python',
		lessons: [{ slug: 'intro-to-python', title: 'Intro to Python' }],
	},
];

function assertValidCurriculum() {
	for (const track of curriculum) {
		const hasChapters = !!track.chapters;
		const hasLessons = !!track.lessons;
		if (hasChapters === hasLessons) {
			throw new Error(
				`curriculum.ts: track "${track.slug}" must set exactly one of chapters/lessons (has chapters: ${hasChapters}, lessons: ${hasLessons}).`,
			);
		}
	}
}
assertValidCurriculum();

export function lessonPath(trackSlug: string, lessonSlug: string): string {
	return `/lessons/${trackSlug}/${lessonSlug}`;
}

export function findTrack(trackSlug: string): CurriculumTrack | undefined {
	return curriculum.find((t) => t.slug === trackSlug);
}

/** Flattens a track's lessons (chaptered or flat) into one ordered list. */
export function flattenTrackLessons(
	track: CurriculumTrack,
): { chapter: CurriculumChapter | null; lesson: CurriculumLesson }[] {
	if (track.chapters) {
		return track.chapters.flatMap((chapter) => chapter.lessons.map((lesson) => ({ chapter, lesson })));
	}
	return (track.lessons ?? []).map((lesson) => ({ chapter: null, lesson }));
}

export interface ResolvedLesson {
	track: CurriculumTrack;
	chapter: CurriculumChapter | null;
	lesson: CurriculumLesson;
	/** Index within the track's fully flattened lesson list (chapters flattened transparently). */
	flatIndex: number;
	path: string;
}

export function resolveLesson(trackSlug: string, lessonSlug: string): ResolvedLesson | null {
	const track = findTrack(trackSlug);
	if (!track) return null;
	const flat = flattenTrackLessons(track);
	const flatIndex = flat.findIndex((entry) => entry.lesson.slug === lessonSlug);
	if (flatIndex === -1) return null;
	const { chapter, lesson } = flat[flatIndex];
	return { track, chapter, lesson, flatIndex, path: lessonPath(trackSlug, lessonSlug) };
}

function toResolvedLesson(track: CurriculumTrack, flat: ReturnType<typeof flattenTrackLessons>, index: number): ResolvedLesson | null {
	const entry = flat[index];
	if (!entry) return null;
	return { track, chapter: entry.chapter, lesson: entry.lesson, flatIndex: index, path: lessonPath(track.slug, entry.lesson.slug) };
}

/** Previous/next lesson strictly within this track's own default order — independent of any active guided path. */
export function trackPrevNext(
	trackSlug: string,
	lessonSlug: string,
): { prev: ResolvedLesson | null; next: ResolvedLesson | null } {
	const track = findTrack(trackSlug);
	if (!track) return { prev: null, next: null };
	const flat = flattenTrackLessons(track);
	const index = flat.findIndex((entry) => entry.lesson.slug === lessonSlug);
	if (index === -1) return { prev: null, next: null };
	return {
		prev: toResolvedLesson(track, flat, index - 1),
		next: toResolvedLesson(track, flat, index + 1),
	};
}
