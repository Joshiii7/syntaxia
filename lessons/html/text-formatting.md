---
title: Text Formatting
description: Making text bold, italic, or underlined, and starting a new line with br.
---

# Text Formatting

Sometimes you want a word to stand out. Maybe you want to shout it, whisper it, or highlight it. HTML has tags for that too.

## Bold text

The `<strong>` tag makes text bold. Think of it like raising your voice on an important word when you speak.

```html
<p>Please arrive <strong>on time</strong>.</p>
```

## Italic text

The `<em>` tag makes text italic, meaning it leans to the side. Think of it like a softer, more thoughtful tone, the way you might say a word carefully to give it a different feeling.

```html
<p>I <em>really</em> enjoyed that movie.</p>
```

## Underlined text

The `<u>` tag underlines text, like drawing a line under a word with a pen to make it stand out.

```html
<p>Remember to bring your <u>umbrella</u>.</p>
```

## Starting a new line

Normally, a browser ignores extra spaces and line breaks in your HTML, and just wraps the text to fit the screen. If you want to force a new line in the middle of a paragraph, use the `<br>` tag. It has no closing tag, since it does not wrap around any content. It just marks a spot.

```html
<p>Roses are red.<br>Violets are blue.</p>
```

## Try it

<WebPlayground
	:panes="['html']"
	:initial-html="'<p>This is <strong>bold</strong>, this is <em>italic</em>, and this is <u>underlined</u>.</p>\n<p>Line one.<br>Line two.</p>'"
/>

## Try it yourself

Write a short sentence that uses all three formatting tags at once. Then add a two-line address using `<br>` to separate the lines.

## Check your understanding

<Quiz
	question="Which tag makes text bold?"
	:options="['<b-text>', '<strong>', '<bold>', '<em>']"
	:answer-index="1"
	explanation="The strong tag makes text bold. The em tag is for italic text, not bold."
/>

## What you learned

- The strong tag makes text bold.
- The em tag makes text italic.
- The u tag underlines text.
- The br tag forces a new line, and has no closing tag.
