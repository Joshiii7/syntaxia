---
title: Divs and Spans
description: Grouping content with div, and marking a piece of text with span.
---

# Divs and Spans

Sometimes you need a plain container that does not mean anything special by itself. It is just there to group things together, usually so you can style or arrange that group later. HTML has two tags built exactly for this.

## The div tag

A `<div>` is a box you can put other elements inside, to group them as one chunk. Think of a cardboard box you pack a few related items into before moving house. The box itself is not "a couch" or "a lamp." It is just a container holding a few things together.

```html
<div>
	<h2>Contact Info</h2>
	<p>Email: hello@example.com</p>
</div>
```

## The span tag

A `<span>` does the same job as a div, but for a small piece of text inside a sentence, instead of a whole block. Think of circling a single word in a sentence with a pen, without touching anything else around it.

```html
<p>My favorite color is <span>blue</span>.</p>
```

On its own, a span looks exactly like plain text. It only becomes useful once you want to target that one small piece separately, usually with styling you will learn about in the CSS section of this book.

## Div versus span

- Use `<div>` for a whole block, like a section, a card, or a group of elements stacked on top of each other.
- Use `<span>` for a small piece of text inside a line, like one word or a few words you want to mark separately.

## Try it

<WebPlayground
	:panes="['html']"
	:initial-html="'<div>\n\t<h2>About Me</h2>\n\t<p>My name is <span>Alex</span> and I like <span>painting</span>.</p>\n</div>'"
/>

## Try it yourself

Wrap a second paragraph inside the same div, and mark one more word using a span.

## Check your understanding

<Quiz
	question="Which tag would you use to mark a single word inside a sentence?"
	:options="['<div>', '<span>', '<p>', '<mark-word>']"
	:answer-index="1"
	explanation="span is used for a small piece of text inside a line. div is used for grouping a whole block of content."
/>

## What you learned

- div groups a whole block of content together, like a section or a card.
- span marks a small piece of text inside a line, without breaking the flow of the sentence.
- Neither tag means anything special by itself. They are plain containers, mainly useful once you add styling.

**Next lesson:** [Semantic HTML](/lessons/html/semantic-html)
