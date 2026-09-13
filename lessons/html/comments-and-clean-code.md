---
title: Comments and Clean Code
description: Leaving notes in your code with comments, and why tidy code matters.
---

# Comments and Clean Code

This lesson covers two small habits that make a big difference once your pages start growing bigger: comments, and keeping your code tidy.

## What is a comment

A comment is a note you leave inside your code that the browser completely ignores. It never shows up on the actual page. It exists only for you, or anyone else reading the raw code later.

```html
<!-- This is a comment. It will not show up on the page. -->
<h1>Welcome</h1>
```

Think of it like a sticky note you leave inside a recipe book, reminding yourself "double this recipe for parties." A guest eating the food never sees that note. It is only for the cook.

Comments are useful for:

- Explaining why you wrote something a certain way, for your future self.
- Leaving a reminder to fix or finish something later.
- Temporarily hiding a piece of code you are not ready to remove yet.

## Why clean code matters

"Clean code" just means code that is easy to read, not just code that works. Two pages can look identical in a browser, while one is a messy pile of code and the other is neat and easy to follow.

Think of it like handwriting a letter. A messy scrawl might technically contain the same words as neat handwriting, but the neat version is far easier for someone else, or even future you, to actually read.

A few simple habits keep your HTML clean:

1. **Use consistent indentation.** Indenting means adding a small space before a line to show it is "inside" something else. Every tag inside another tag should be indented a little further than its parent.
2. **Use lowercase tag names.** `<div>` instead of `<DIV>`. It is not strictly required, but it is the common habit almost everyone follows.
3. **Keep related tags close together.** Do not scatter parts of the same section far apart in your file.
4. **Remove code you are not using.** Old, unused code left lying around only makes a file more confusing to read later.

## Try it

<WebPlayground
	:panes="['html']"
	:initial-html="'<!-- This is the page title -->\n<h1>My Page</h1>\n\n<!-- TODO: write a real introduction here -->\n<p>Welcome to my page.</p>'"
/>

Notice the comments do not appear at all in the preview on the right.

## Try it yourself

Add a comment above the paragraph, explaining in your own words what that paragraph is for.

## Check your understanding

<Quiz
	question="What happens to an HTML comment when the page is shown in a browser?"
	:options="['It shows up in small gray text', 'It is completely invisible on the page', 'It shows up only on mobile phones', 'It causes an error']"
	:answer-index="1"
	explanation="A comment is completely ignored by the browser when showing the page. It only exists in the raw code, for people reading it."
/>

## What you learned

- A comment starts with `<!--` and ends with `-->`, and is completely invisible on the actual page.
- Comments are useful for explanations, reminders, and temporarily hiding code.
- Clean code means code that is easy to read, using habits like consistent indentation and lowercase tag names.
