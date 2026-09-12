---
title: Final Quiz
description: A review quiz covering everything from Your First HTML File through Putting It All Together.
---

# Final Quiz

Congratulations on making it through the whole HTML section. This page reviews everything from your first HTML file through your profile page project. Take your time with each question.

<Quiz
	question="What is a tag?"
	:options="['A type of file', 'A labeled instruction written in angle brackets', 'A picture on a webpage', 'A kind of browser']"
	:answer-index="1"
	explanation="A tag is a labeled instruction written in angle brackets, like h1, telling the browser what kind of thing follows."
/>

<Quiz
	question="Which attribute gives one specific element a unique name on the page?"
	:options="['class', 'id', 'title', 'style']"
	:answer-index="1"
	explanation="id gives one single element a unique name. class is meant to be shared across many elements."
/>

<Quiz
	question="Which part of a basic HTML page holds everything a visitor actually sees?"
	:options="['The head', 'The body', 'The DOCTYPE', 'The title']"
	:answer-index="1"
	explanation="The body holds everything shown to a visitor. The head holds information about the page, not shown directly."
/>

<Quiz
	question="Which meta tag helps a page display correctly on a phone screen?"
	:options="['charset', 'description', 'viewport', 'title']"
	:answer-index="2"
	explanation="The viewport meta tag tells phones and tablets how to size the page correctly on a small screen."
/>

<Quiz
	question="Which heading tag is the biggest?"
	:options="['<h6>', '<h1>', '<h4>', '<p>']"
	:answer-index="1"
	explanation="Headings count down in size from h1, the biggest, to h6, the smallest."
/>

<Quiz
	question="Which tag makes text italic?"
	:options="['<strong>', '<u>', '<em>', '<i-text>']"
	:answer-index="2"
	explanation="The em tag makes text italic. The strong tag is for bold, and u is for underline."
/>

<Quiz
	question="Which attribute holds the address a link points to?"
	:options="['src', 'href', 'link', 'to']"
	:answer-index="1"
	explanation="href stands for hyperlink reference, and holds the address a link points to."
/>

<Quiz
	question="What does the alt attribute on an image describe?"
	:options="['The size of the file', 'The image, in words', 'The website it links to', 'The color of the image']"
	:answer-index="1"
	explanation="Alt text describes the image in words, used when it fails to load, and read aloud by screen readers."
/>

<Quiz
	question="Which list tag would you use for numbered steps, where order matters?"
	:options="['<ul>', '<ol>', '<li>', '<steps>']"
	:answer-index="1"
	explanation="ol stands for ordered list, used when the order of items matters."
/>

<Quiz
	question="In a table, which tag is used for the labeled header row?"
	:options="['<td>', '<tr>', '<th>', '<table>']"
	:answer-index="2"
	explanation="th stands for table header, used to label a column."
/>

<Quiz
	question="How does a label connect to a specific input field?"
	:options="['They must sit right next to each other', 'The label for attribute matches the input id attribute', 'The browser connects them automatically', 'They share a type attribute']"
	:answer-index="1"
	explanation="A label's for attribute must match the input's id attribute exactly."
/>

<Quiz
	question="Why do radio buttons in the same group share a name attribute?"
	:options="['It has no real effect', 'It groups them, so only one can be picked at a time', 'It is only for styling', 'It is required for checkboxes too']"
	:answer-index="1"
	explanation="The shared name attribute groups radio buttons, so picking one unpicks the rest of that group."
/>

<Quiz
	question="Which tag would you use to mark a single word inside a sentence?"
	:options="['<div>', '<span>', '<p>', '<mark-word>']"
	:answer-index="1"
	explanation="span marks a small piece of text inside a line. div is for grouping a whole block of content."
/>

<Quiz
	question="Which semantic tag is meant for a self-contained blog post?"
	:options="['<section>', '<article>', '<div>', '<footer>']"
	:answer-index="1"
	explanation="article is meant for a self-contained piece of content that could stand on its own."
/>

<Quiz
	question="What happens to a comment when the page is shown in a browser?"
	:options="['It shows up in gray text', 'It is completely invisible on the page', 'It shows an error', 'It only appears on mobile']"
	:answer-index="1"
	explanation="A comment is completely ignored when the page is shown. It only exists in the raw code."
/>

<Quiz
	question="Which of these is part of good, clean HTML habits?"
	:options="['Writing every tag on one long line', 'Using consistent indentation', 'Avoiding lowercase tag names', 'Leaving unused code in place forever']"
	:answer-index="1"
	explanation="Consistent indentation keeps nested tags easy to read, which is one of the simplest habits for clean code."
/>

## Now open a real IDE

Every lesson so far let you practice inside this book's own built-in editor. That was on purpose, so you could focus on learning without installing anything. Now it is time to try it for real.

If you want a refresher on what an IDE is, revisit [Introduction to IDEs](/lessons/ide/introduction) from earlier in this book.

1. Open an IDE on your own computer, such as Visual Studio Code.
2. Create a new file, and save it as `profile.html`.
3. Rebuild your profile page from the Putting It All Together lesson, from scratch, in that real file.
4. Save the file, then double click it, so it opens for real in your browser.

Doing this once, outside of this book, is what makes the habit stick.

## What you learned

You just reviewed every lesson in the HTML section: tags and your first file, attributes, structure, meta tags and the head, headings and paragraphs, text formatting, links, images, lists, tables, both parts of forms, divs and spans, semantic HTML, comments, clean code, and building a full profile page.

That is a real, solid foundation. From here, the next step is learning how to make your pages look good, which is exactly what CSS is for.

**Continue to the next section:** [Intro to CSS](/lessons/css/intro-to-css)
