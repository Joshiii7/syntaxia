/**
 * Which guided path (if any) the learner has activated, so LessonSidebar/
 * Breadcrumb/LessonNav can switch from default track-order view to a
 * cross-track path view. Same localStorage + inBrowser-guard pattern as
 * useProgress.ts — see that file for the SSR-safety rationale.
 */
import { inBrowser } from 'vitepress';
import { computed, ref, watch } from 'vue';
import { resolvePath, type ResolvedPathStep } from '../data/paths';

const STORAGE_KEY = 'syntaxia:active-path:v1';

const activePathId = ref<string | null>(null);

if (inBrowser) {
	try {
		activePathId.value = localStorage.getItem(STORAGE_KEY);
	} catch {
		// Storage unavailable: default to no active path.
	}
	watch(activePathId, (value) => {
		try {
			if (value) localStorage.setItem(STORAGE_KEY, value);
			else localStorage.removeItem(STORAGE_KEY);
		} catch {
			// Storage unavailable: activation just won't persist this session.
		}
	});
}

const activePath = computed<ResolvedPathStep[] | null>(() => (activePathId.value ? resolvePath(activePathId.value) : null));

export function useActivePath() {
	return {
		activePathId: computed(() => activePathId.value),
		activePath,
		activatePath(pathId: string): void {
			activePathId.value = pathId;
		},
		deactivatePath(): void {
			activePathId.value = null;
		},
	};
}
