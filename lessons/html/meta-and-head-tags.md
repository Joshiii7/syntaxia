---
title: Meta Tags and the Head
description: What meta tags are, and the other common tags that live inside the head.
---

# Meta Tags and the Head

Back in the Basic Structure lesson, you learned the head holds information about the page, not shown directly to a visitor. This lesson fills in the rest of what usually goes inside it.

## What is a meta tag

A `<meta>` tag gives the browser, and sometimes other services like search engines, a small piece of information about the page. It has no closing tag, just like `<img>` and `<input>`.

Think of it like the label printed on a food package. The label is not the food itself, it is information about the food, like its ingredients or how many calories it has. A meta tag works the same way for a webpage.

## The most important meta tags

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="A short summary of this page.">
```

- **charset** tells the browser which set of letters and symbols the page uses. `UTF-8` covers nearly every language and symbol in common use, so it is the safe default almost everyone uses.
- **viewport** tells phones and tablets how to size the page correctly on a small screen. Without it, a page can look tiny and zoomed out on a phone.
- **description** is a short summary of the page. Search engines like Google often show this text under your page's link in search results.

## Other tags found in the head

- `<title>`, which you already met in Basic Structure, sets the text shown in the browser's tab.
- `<link>` connects an outside file to your page. The most common use is linking a separate CSS file, which you will learn about in the CSS section.

```html
<link rel="stylesheet" href="style.css">
```

- `<script>` adds JavaScript to a page, which you will learn about in the JavaScript section. It can go in the head, or near the end of the body.

## A fuller head example

```html
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="A page about my favorite hobbies.">
	<title>My Hobbies</title>
	<link rel="stylesheet" href="style.css">
</head>
```

## Try it

<WebPlayground
	:panes="['html']"
	:initial-html="'<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset=\'UTF-8\'>\n\t<meta name=\'viewport\' content=\'width=device-width, initial-scale=1\'>\n\t<meta name=\'description\' content=\'A page about my favorite hobbies.\'>\n\t<title>My Hobbies</title>\n</head>\n<body>\n\t<h1>My Hobbies</h1>\n\t<p>I enjoy painting and hiking.</p>\n</body>\n</html>'"
/>

Just like the head itself, none of the meta tags show up in the preview. They only affect how the browser and other services handle the page.

## Try it yourself

Change the description meta tag's content to describe your own page idea.

## Check your understanding

<Quiz
	question="Which meta tag helps a page display correctly on a phone screen?"
	:options="['charset', 'description', 'viewport', 'title']"
	:answer-index="2"
	explanation="The viewport meta tag tells phones and tablets how to size the page correctly on a small screen."
/>

## What you learned

- A meta tag gives the browser or other services a small piece of information about the page, and has no closing tag.
- The charset meta tag sets which letters and symbols the page supports.
- The viewport meta tag makes a page display correctly on phones and tablets.
- The description meta tag is a short summary, often shown in search engine results.
- The link tag connects an outside file, most commonly a CSS stylesheet.
