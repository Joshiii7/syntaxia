---
title: Headings and Paragraphs
description: Using h1 through h6 for headings, and p for paragraphs.
---

# Headings and Paragraphs

Now that you know the basic skeleton of a page, let's start filling in the body with actual content. We will begin with the two most common tags of all: headings and paragraphs.

## Headings

Think of a newspaper. The biggest, boldest text on the front page is the main headline. Smaller headlines sit below it for each story, and even smaller ones for each section of a story.

HTML has six levels of headings, from biggest to smallest: `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, and `<h6>`.

```html
<h1>This is the biggest heading</h1>
<h2>This is a bit smaller</h2>
<h3>Smaller still</h3>
```

A page usually has only one `<h1>`, used for the main title of the page. Smaller headings are used to break up sections underneath it, similar to chapter titles and subheadings in a book.

## Paragraphs

A paragraph in HTML uses the `<p>` tag, just like a paragraph in a book or an essay. It groups a block of text together.

```html
<p>This is a paragraph. It can hold as many sentences as you like, and the browser will wrap the text automatically to fit the screen.</p>
```

## Try it

<WebPlayground
	:panes="['html']"
	:initial-html="'<h1>My Favorite Hobby</h1>\n<p>I enjoy reading books on rainy days.</p>\n<h2>Why I Like It</h2>\n<p>It lets me relax and imagine new places.</p>'"
/>

## Try it yourself

Add an `<h2>` and a `<p>` of your own below the existing ones. Try using an `<h3>` too, and notice how much smaller it looks compared to `<h1>` and `<h2>`.

## Check your understanding

<Quiz
	question="Which heading tag makes the biggest text?"
	:options="['<h6>', '<h1>', '<h3>', '<p>']"
	:answer-index="1"
	explanation="Headings count down in size from h1, the biggest, to h6, the smallest."
/>

## What you learned

- Headings range from h1, the biggest, down to h6, the smallest.
- A page usually has one h1 for its main title, with smaller headings for sections underneath.
- The p tag groups a block of text into a paragraph.
