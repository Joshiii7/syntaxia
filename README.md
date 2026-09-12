# Syntaxia

An interactive, author-written programming book covering multiple languages, frameworks, and dev tools. Every lesson is a Markdown page that can embed a live code editor and a quiz. Built with [VitePress](https://vitepress.dev).

## Getting started

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build     # static production build to .vitepress/dist
npm run preview   # preview the production build locally
```

## Project structure

```
syntaxia/
├── .vitepress/
│   ├── config.mts              # site title, nav, sidebar, theme config
│   └── theme/
│       ├── index.ts            # extends the default theme, registers global components
│       ├── style.css           # cross-cutting style overrides only
│       └── components/
│           ├── CodeEditor.vue      # generic CodeMirror editor, language configurable
│           ├── WebPlayground.vue   # HTML/CSS/JS editor trio + sandboxed live preview
│           └── Quiz.vue            # multiple-choice quiz placeholder
├── lessons/
│   ├── html-css-js/intro-to-html.md
│   └── python/intro-to-python.md
├── public/                     # static assets (favicon, etc.)
└── index.md                    # home page
```

## Components

Both components are registered globally (see `.vitepress/theme/index.ts`), so any lesson Markdown file can use them directly with no import.

### `CodeEditor`

A single CodeMirror 6 instance. Use it for any language that doesn't need a live preview.

```md
<CodeEditor
	language="python"
	label="Python practice editor"
	:model-value="'print(\"hi\")'"
/>
```

`language` accepts `html`, `css`, `javascript`, `python`, or `plaintext` (the fallback for every other language in the book — you still get an editor with line numbers, selection, and history, just without syntax highlighting until a dedicated `@codemirror/lang-*` package is added for that language).

### `WebPlayground`

For HTML/CSS/JS lessons specifically: three `CodeEditor` panes (HTML, CSS, JS) beside a sandboxed `<iframe>` preview. The preview rebuilds from `srcdoc` — debounced on every keystroke and on a manual **Run** button — so the learner's script only ever runs inside the sandboxed iframe (`sandbox="allow-scripts"`, no `allow-same-origin`), never in the site's own page context.

```md
<WebPlayground
	:initial-html="'<h1>Hi</h1>'"
	:initial-css="'h1 { color: teal; }'"
	:initial-js="'console.log(1 + 1);'"
/>
```

### `Quiz`

A single multiple-choice question with immediate feedback.

```md
<Quiz
	question="Which tag closes an opening <p> tag?"
	:options="['<p>', '</p>', '<end p>', '<close p>']"
	:answer-index="1"
	explanation="A closing tag repeats the element name with a leading slash."
/>
```

## Running/checking code for non-browser languages

`WebPlayground` covers HTML/CSS/JS because the browser can already execute all three natively and safely, sandboxed in an iframe. Every other language the book will eventually cover (Python, and later others) needs an actual interpreter/compiler somewhere, since none of that can run in a plain browser tab. Two realistic approaches, evaluated for this project:

### Option A — Client-side execution via Pyodide (or an equivalent WASM runtime)

Pyodide compiles CPython to WebAssembly and runs it entirely in the learner's browser.

**Pros**
- No server to run, scale, rate-limit, or pay for — fits a static site hosted on GitHub Pages/Netlify/Vercel with zero backend.
- No network round-trip once the runtime is loaded, so repeated runs (which a learner does constantly while experimenting) are instant.
- No user code ever leaves the browser — nothing to sandbox against on a server, no abuse vector to defend.

**Cons**
- Large initial download (Pyodide's core bundle is tens of MB, more once common packages like `numpy` are pulled in) — needs lazy-loading only when a Python lesson is opened, and a visible "loading the Python runtime…" state.
- Python-only (or whatever specific WASM runtime exists for a given language) — there's no single WASM runtime that covers every language the book wants to teach. Each additional non-web language needs its own runtime story evaluated separately, and some languages simply don't have a mature WASM runtime yet.
- Real-world library support is partial — pure-Python packages generally work; anything with C extensions needs Pyodide's own prebuilt package, which doesn't exist for every PyPI package.

### Option B — Server-side execution via a code execution API (Judge0, Piston)

The editor sends the learner's code to a hosted or self-hosted sandboxed execution service and displays the returned stdout/stderr.

**Pros**
- One integration covers dozens of languages immediately (Judge0 and Piston both support C, C++, Java, Go, Rust, Ruby, etc. out of the box) — the natural fit for a book that explicitly covers "multiple programming languages, frameworks, and dev tools," not just Python.
- No large runtime download in the browser; the editor stays lightweight regardless of how many languages are added.
- Execution happens in a real, isolated environment per language, so behavior matches what a learner would see running the same code locally.

**Cons**
- Needs a backend dependency: either a paid hosted API (rate limits, cost per execution, an API key to protect — see [[security-standards]], never expose it client-side) or self-hosting Judge0/Piston (a real server to provision, patch, and keep available — this stops being a "static site" in the deployment sense).
- A network round-trip per run adds latency a learner feels on every single edit-run cycle, unlike the instant local loop of Option A.
- Running arbitrary user-submitted code on a server is a genuine security surface (resource exhaustion, sandbox escapes) — both projects handle this, but it's the operator's responsibility to keep it patched and rate-limited, not something to treat as solved-and-forgettable.

### Recommendation

Use **Pyodide for Python specifically** — it's the language actually scaffolded in this book right now, a mature WASM runtime already exists for it, and running fully client-side keeps the site static with no backend or API cost, which matches the project's current scope (an author-written static book, no server infrastructure yet).

For every other non-web language the book adds later, evaluate case by case:
- If a mature WASM runtime exists for that language (e.g. many focus on Python/Ruby/Lua-style dynamic languages) and it's genuinely used interactively, prefer the client-side approach for the same reasons as Python.
- Once the book covers several languages that have no realistic WASM story (C, Java, Go, etc.), a single Judge0/Piston integration is the more scalable move — one backend covers all of them at once, rather than chasing a WASM runtime per language. At that point, self-host Piston (open source, no per-request cost, no API key to leak) behind the book's own thin API route rather than calling a third-party hosted Judge0 endpoint directly from the browser.

This scaffold ships the Python lesson with `CodeEditor` only (syntax highlighting, no execution) so the Pyodide integration can be added as its own deliberate piece of work rather than bundled into the initial scaffold.

## Conventions

- Indentation is tabs, width 4 (`.editorconfig`).
- No inline `<script>`/`style="..."` — Vue SFC `<script setup>` and scoped `<style>` blocks are the only sanctioned way to add behavior/styling to a component.
- Every editor and quiz control is native HTML (`<button>`, `<input type="radio">`, `<fieldset>`/`<legend>`) with visible focus states, so keyboard and screen-reader support come for free rather than being reimplemented with ARIA.
