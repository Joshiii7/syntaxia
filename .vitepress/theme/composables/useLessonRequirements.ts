/**
 * Page-scoped gating registry: makes "disable Next Lesson until every
 * quiz/exercise on this page has passed" possible even though <Quiz>/
 * <Exercise> instances are independent components dropped directly into
 * Markdown, with no parent component to wire events to.
 *
 * Module-level singleton (same pattern as useProgress.ts/useActivePath.ts),
 * NOT provide/inject: VitePress's theme `Layout()` is a plain function that
 * VitePress re-invokes on re-renders (not a one-time setup()), so a
 * registry created and provide()'d inside it is not a stable, single object
 * across a page's lifetime — Quiz/LessonNav instances created/injected in
 * different Layout() executions can end up holding different registry
 * objects, silently disconnecting a Quiz's registration from the LessonNav
 * reading `allPassed`. A shared module-level reactive object sidesteps this
 * entirely: every caller (however/whenever it mounts) reads and writes the
 * exact same state.
 *
 * Deliberately ephemeral/per-page (reset whenever the current route's path
 * changes) — persisted, cross-session completion lives in useProgress.ts.
 * LessonNav.vue is what bridges "all requirements passed" into persisted
 * progress, keeping this file free of localStorage concerns.
 */
import { useRoute } from 'vitepress';
import { computed, reactive, type ComputedRef } from 'vue';

export interface LessonRequirement {
	id: string;
	kind: 'quiz' | 'exercise';
	passed: boolean;
}

const state = reactive<{ path: string | null; requirements: LessonRequirement[] }>({
	path: null,
	requirements: [],
});

function resetIfNewPage(currentPath: string) {
	if (state.path !== currentPath) {
		state.path = currentPath;
		state.requirements = [];
	}
}

export interface LessonRequirementsRegistry {
	register(id: string, kind: 'quiz' | 'exercise'): () => void;
	reportResult(id: string, passed: boolean): void;
	allPassed: ComputedRef<boolean>;
	requirements: LessonRequirement[];
}

export function useLessonRequirements(): LessonRequirementsRegistry {
	const route = useRoute();
	resetIfNewPage(route.path);

	function register(id: string, kind: 'quiz' | 'exercise') {
		resetIfNewPage(route.path);
		if (!state.requirements.some((r) => r.id === id)) {
			state.requirements.push({ id, kind, passed: false });
		}
		return () => {
			state.requirements = state.requirements.filter((r) => r.id !== id);
		};
	}

	function reportResult(id: string, passed: boolean) {
		const requirement = state.requirements.find((r) => r.id === id);
		if (requirement) requirement.passed = passed;
	}

	// Trivially true when the page has zero requirements — no artificial
	// quiz is invented for lessons that never had one.
	const allPassed = computed(() => state.requirements.every((r) => r.passed));

	return { register, reportResult, allPassed, requirements: state.requirements };
}
