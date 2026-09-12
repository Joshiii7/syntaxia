---
title: Lists
description: Ordered lists and unordered lists, using ol, ul, and li.
---

# Lists

A lot of real writing comes in the form of lists. This lesson covers how to make them in HTML.

## Unordered lists

An unordered list is a list where the order does not matter, like a grocery list. It does not matter if "milk" is written before or after "eggs." You just need everything on the list.

```html
<ul>
	<li>Milk</li>
	<li>Eggs</li>
	<li>Bread</li>
</ul>
```

- `<ul>` stands for "unordered list." It wraps around the whole list.
- `<li>` stands for "list item." Each item in the list goes in its own `<li>`.

By default, the browser shows unordered list items with a small dot, called a bullet, in front of each one.

## Ordered lists

An ordered list is a list where the order matters, like steps in a recipe. Step two only makes sense after step one.

```html
<ol>
	<li>Crack the eggs</li>
	<li>Whisk them</li>
	<li>Pour into the pan</li>
</ol>
```

`<ol>` stands for "ordered list." It works exactly like `<ul>`, except the browser numbers each item automatically, starting from one.

## Try it

<WebPlayground
	:panes="['html']"
	:initial-html="'<h2>Shopping List</h2>\n<ul>\n\t<li>Apples</li>\n\t<li>Bread</li>\n</ul>\n\n<h2>Steps to Make Toast</h2>\n<ol>\n\t<li>Put bread in the toaster</li>\n\t<li>Wait until golden</li>\n\t<li>Add butter</li>\n</ol>'"
/>

## Try it yourself

Add a third item to each list. Notice the ordered list automatically renumbers itself.

## Check your understanding

<Quiz
	question="Which tag would you use for a list of numbered cooking steps, where the order matters?"
	:options="['<ul>', '<ol>', '<li>', '<list>']"
	:answer-index="1"
	explanation="ol stands for ordered list, used when the sequence of the items matters, like steps in a recipe."
/>

## What you learned

- ul creates an unordered list, shown with bullets, for when order does not matter.
- ol creates an ordered list, shown with numbers, for when order matters.
- Each item in either kind of list goes inside its own li tag.

**Next lesson:** [Tables](/lessons/html/tables)
