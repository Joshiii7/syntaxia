---
title: Intro to CSS
description: Style HTML elements with CSS selectors and properties, and see the result in a live preview.
---

# Intro to CSS

**CSS** (Cascading Style Sheets) describes how HTML elements should *look* — color, spacing, layout — separately from the HTML that describes what they *are*.

A CSS rule has two parts:

```css
h1 {
	color: #3287a8;
}
```

- `h1` is the **selector** — which element(s) the rule applies to.
- `color: #3287a8;` is a **declaration** — a property and the value to set it to.

## Try it

The HTML below is fixed; edit the CSS pane and press **Run** to restyle it.

<WebPlayground
	:panes="['css']"
	:initial-html="'<h1>Style me</h1>\n<p>Change my color, spacing, or font in the CSS pane.</p>\n<button>And me too</button>'"
	:initial-css="'h1 {\n\tcolor: #3287a8;\n}\n\np {\n\tfont-style: italic;\n}\n\nbutton {\n\tpadding: 8px 16px;\n\tborder-radius: 6px;\n}\n'"
/>

## Try it yourself

Give the `<button>` a background color, and make the paragraph's text a different size. Press **Run** to check the result.

## Check your understanding

<Quiz
	question="In `h1 { color: #3287a8; }`, what is `color` called?"
	:options="['A selector', 'A property', 'A tag', 'An attribute']"
	:answer-index="1"
	explanation="color is the property being set; h1 is the selector choosing which elements it applies to."
/>
