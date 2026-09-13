---
title: Semantic HTML
description: Using header, footer, nav, section, and article tags that describe what a part of the page actually is.
---

# Semantic HTML

In the last lesson, you learned about div, a plain box that does not say anything about what is inside it. This lesson introduces tags that do the opposite. They describe exactly what a part of the page is for.

## Why this matters

Imagine a house where every room is just labeled "Room 1," "Room 2," "Room 3." You could still find your way around, but it would be confusing. Now imagine the same house with rooms labeled "Kitchen," "Bedroom," and "Bathroom." Instantly, you know what each room is for, without even looking inside.

Semantic tags do the same thing for a webpage. Instead of a page built entirely from unlabeled `<div>` boxes, semantic tags name each part by its purpose.

## The main semantic tags

- `<header>` is the top part of a page or a section, often holding a title or a logo.
- `<nav>` holds the main links used to move around the site, like a table of contents.
- `<section>` groups together a related chunk of content, like one topic on a page.
- `<article>` holds a self-contained piece of content that could stand on its own, like a blog post or a news story.
- `<footer>` is the bottom part of a page or a section, often holding small print or contact details.

```html
<header>
	<h1>My Blog</h1>
	<nav>
		<a href="#">Home</a>
		<a href="#">About</a>
	</nav>
</header>

<section>
	<article>
		<h2>My First Post</h2>
		<p>Today I learned about semantic HTML.</p>
	</article>
</section>

<footer>
	<p>Made with care.</p>
</footer>
```

## Semantic tags still just work like divs

Under the hood, these tags behave a lot like `<div>`. The real difference is the name itself, which tells you, other developers reading your code, and even screen readers, what each part of the page actually is for. A screen reader can announce "navigation" or "footer" directly, letting a visitor jump straight to the part they want, instead of guessing from a wall of unlabeled boxes.

## Try it

<WebPlayground
	:panes="['html']"
	:initial-html="'<header>\n\t<h1>Maria\'s Recipes</h1>\n</header>\n\n<section>\n\t<article>\n\t\t<h2>Pancakes</h2>\n\t\t<p>Mix flour, eggs, and milk.</p>\n\t</article>\n</section>\n\n<footer>\n\t<p>Thanks for visiting.</p>\n</footer>'"
/>

## Try it yourself

Add a `<nav>` inside the `<header>`, with two links inside it using the `<a>` tag from an earlier lesson.

## Check your understanding

<Quiz
	question="Which tag would you use for a self-contained blog post that could stand on its own?"
	:options="['<section>', '<article>', '<div>', '<footer>']"
	:answer-index="1"
	explanation="article is meant for a self-contained piece of content, like a blog post or a news story, that would still make sense on its own."
/>

## What you learned

- Semantic tags describe what a part of a page actually is, instead of using a plain, unlabeled div.
- header marks a top section, nav marks the main links, section groups related content, article marks a self-contained piece of content, and footer marks a bottom section.
- Semantic tags help other developers and screen readers understand a page's structure.
