/**
 * Persisted, cross-session lesson completion, backed by localStorage. A
 * plain composable rather than Pinia/Vuex: this project ships fully static
 * (GitHub Pages, no server), has no existing state-library dependency, and
 * the entire feature is "read/write a small object to localStorage" — a
 * store would add setup/dependency cost for no functional gain at this
 * scale, and still needs the exact same SSR guard below either way.
 *
 * VitePress prerenders every page in Node at build time, where
 * `localStorage` doesn't exist — `inBrowser` (VitePress's own guard,
 * confirmed used internally by its default theme) is false during that
 * pass, so the persisted read/write below never runs during `vitepress
 * build`'s SSR step. Module-level singleton state (not a fresh ref per
 * useProgress() call) is intentional: every component that calls this
 * shares one reactive object, so a lesson completing is immediately
 * visible everywhere (sidebar checkmarks, etc.) with no event bus.
 */
import { inBrowser } from 'vitepress';
import { reactive, readonly, watch } from 'vue';

const STORAGE_KEY = 'syntaxia:progress:v1';

export interface ProgressState {
	completedLessons: Record<string, { completedAt: string }>;
}

const state = reactive<ProgressState>({ completedLessons: {} });

if (inBrowser) {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) Object.assign(state, JSON.parse(raw));
	} catch {
		// Corrupt/unreadable localStorage value: start fresh rather than crash.
	}
	watch(
		state,
		(value) => {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
			} catch {
				// Storage unavailable/full: progress just won't persist this session.
			}
		},
		{ deep: true },
	);
}

function key(trackSlug: string, lessonSlug: string): string {
	return `${trackSlug}/${lessonSlug}`;
}

export function useProgress() {
	return {
		completedLessons: readonly(state.completedLessons),
		isLessonComplete(trackSlug: string, lessonSlug: string): boolean {
			return key(trackSlug, lessonSlug) in state.completedLessons;
		},
		markLessonComplete(trackSlug: string, lessonSlug: string): void {
			const k = key(trackSlug, lessonSlug);
			if (!(k in state.completedLessons)) {
				state.completedLessons[k] = { completedAt: new Date().toISOString() };
			}
		},
		resetProgress(): void {
			for (const k of Object.keys(state.completedLessons)) delete state.completedLessons[k];
		},
	};
}
