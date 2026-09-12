---
title: Links
description: Using the a tag to link to other pages.
---

# Links

Remember from lesson one that HTML was invented so documents could point to other documents. This lesson is about exactly that.

## The anchor tag

A link is made with the `<a>` tag, which stands for "anchor." Think of a link like a signpost on a road. It does not take you anywhere by itself, but it tells you which direction to go, and clicking it moves you there.

```html
<a href="https://example.com">Visit example.com</a>
```

- `<a>` starts the link.
- `href` stands for "hyperlink reference." It is an **attribute**, extra information placed inside the opening tag. Its value is the address the link points to, written in quotes.
- The words between `<a>` and `</a>` are what the visitor actually sees and clicks on.

## Linking to another page on the same site

A link does not always have to point to another website. It can point to another page within the same book or site, using just the page's name instead of a full address.

```html
<a href="about.html">About Us</a>
```

## Try it

<WebPlayground
	:panes="['html']"
	:initial-html="'<p>Check out <a href=\'https://example.com\'>this website</a> for more.</p>'"
/>

## Try it yourself

Add a second link below the first one, pointing to a different address of your choice.

## Check your understanding

<Quiz
	question="Which attribute holds the address a link points to?"
	:options="['src', 'link', 'href', 'to']"
	:answer-index="2"
	explanation="href stands for hyperlink reference, and holds the address the link points to."
/>

## What you learned

- The a tag creates a link.
- The href attribute holds the address a link points to.
- The text between the opening and closing a tags is what a visitor sees and clicks.

**Next lesson:** [Images](/lessons/html/images)
