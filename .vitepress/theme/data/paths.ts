/**
 * Guided paths: cross-track lesson sequences (e.g. "Build a Todo App"
 * pulling one lesson at a time from HTML, CSS, and JavaScript), kept
 * separate from each track's own default order in curriculum.ts.
 *
 * Steps reference curriculum lessons by (trackSlug, lessonSlug) rather than
 * duplicating titles, so a path never goes stale relative to curriculum.ts's
 * own titles.
 */
import { resolveLesson, type ResolvedLesson } from './curriculum';

export interface GuidedPathStep {
	trackSlug: string;
	lessonSlug: string;
	/** Optional path-specific framing shown only while this path is active. Falls back to the curriculum lesson title when absent. */
	note?: string;
}

export interface GuidedPath {
	/** kebab-case, stable, used in the URL: /paths/<id> */
	id: string;
	title: string;
	description: string;
	steps: GuidedPathStep[];
}

export const guidedPaths: GuidedPath[] = [
	{
		id: 'build-a-todo-app',
		title: 'Build a Todo App',
		description:
			"Learn just enough HTML, CSS, and JavaScript to build a working todo list, pulling one lesson at a time from each language track.",
		steps: [
			{ trackSlug: 'html', lessonSlug: 'introduction' },
			{ trackSlug: 'html', lessonSlug: 'basic-structure' },
			{ trackSlug: 'html', lessonSlug: 'forms-part-1' },
			{ trackSlug: 'css', lessonSlug: 'intro-to-css' },
			{ trackSlug: 'javascript', lessonSlug: 'intro-to-javascript' },
		],
	},
];

export function findPath(id: string): GuidedPath | undefined {
	return guidedPaths.find((p) => p.id === id);
}

export interface ResolvedPathStep extends ResolvedLesson {
	note?: string;
	stepIndex: number;
}

/**
 * Resolves every step against curriculum.ts. A step whose lesson can't be
 * resolved (e.g. a renamed slug) is dropped with a console.warn rather than
 * thrown, so a content mistake doesn't break the whole path page.
 */
export function resolvePath(id: string): ResolvedPathStep[] {
	const path = findPath(id);
	if (!path) return [];
	const resolved: ResolvedPathStep[] = [];
	path.steps.forEach((step, stepIndex) => {
		const lesson = resolveLesson(step.trackSlug, step.lessonSlug);
		if (!lesson) {
			console.warn(
				`paths.ts: path "${id}" step ${stepIndex} references unknown lesson "${step.trackSlug}/${step.lessonSlug}" — skipped.`,
			);
			return;
		}
		resolved.push({ ...lesson, note: step.note, stepIndex });
	});
	return resolved;
}

export function pathPrevNext(
	pathId: string,
	trackSlug: string,
	lessonSlug: string,
): { prev: ResolvedPathStep | null; next: ResolvedPathStep | null } {
	const steps = resolvePath(pathId);
	const index = steps.findIndex((s) => s.track.slug === trackSlug && s.lesson.slug === lessonSlug);
	if (index === -1) return { prev: null, next: null };
	return { prev: steps[index - 1] ?? null, next: steps[index + 1] ?? null };
}
