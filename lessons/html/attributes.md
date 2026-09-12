---
title: Attributes
description: What an HTML attribute is, and a reference list of the most common ones.
---

# Attributes

In earlier lessons, you already saw things like `href="https://example.com"` and `alt="A cat"` sitting inside a tag. This lesson finally explains what those actually are, and gives you a full list to come back to whenever you need it.

## What is an attribute

An **attribute** is extra information added inside an opening tag, written as a name and a value, like `name="value"`.

Think of a tag like a noun. A tag such as `<img>` says "there is a picture here." An attribute is like an adjective describing that picture in more detail, such as which file it comes from, or what it shows.

```html
<img src="cat.jpg" alt="A sleeping cat">
```

Here, `<img>` is the tag. `src` and `alt` are both attributes, each with their own value in quotes. A tag can have as many attributes as it needs, each separated by a space.

## Attributes do not need a closing tag of their own

Attributes always live inside the opening tag itself. They are never written separately, and they never get their own closing tag. Only the whole element gets a closing tag, if it needs one at all.

```html
<a href="https://example.com" title="Goes to example.com">Click here</a>
```

## Global attributes

A few attributes can be added to almost any tag at all. These are called **global attributes**.

- **id**: gives one single element a unique name on the page. Think of it like a house's street address. Only one house should ever have that exact address.
- **class**: gives one or more elements a shared label. Many elements can share the same class, similar to how many players on a team wear the same jersey, marking them as part of the same group.
- **title**: adds a small tooltip that appears when a visitor hovers their mouse over the element.
- **style**: adds a bit of styling directly onto one element. It works, but the CSS section later in this book teaches a better way to style a whole page at once, instead of one element at a time.
- **lang**: tells the browser what human language the content is written in, like `lang="en"` for English.

## A reference list of common attributes

Keep this table handy. You do not need to memorize it, just know it is here to check whenever you forget.

| Attribute | Used on | What it does |
|---|---|---|
| id | any tag | Gives one element a unique name, for linking or styling it specifically. |
| class | any tag | Gives one or more elements a shared label, for styling or grouping many at once. |
| src | img | Points to the file location of a picture. |
| href | a | Points to the address a link goes to. |
| alt | img | Describes a picture in words. |
| title | any tag | Adds a small tooltip shown on hover. |
| style | any tag | Adds a bit of direct styling. Covered properly in the CSS section. |
| type | input, button | Sets what kind of input or button it is. |
| value | input | Sets the starting text or state of a field. |
| placeholder | input | Shows light gray hint text inside an empty field. |
| name | input, select | Groups related fields together, especially radio buttons. |
| for | label | Connects a label to a specific input, matching its id. |
| checked | checkbox, radio | Makes a checkbox or radio button start out already selected. |
| disabled | input, button | Grays out a field or button so it cannot be used. |
| required | input | Marks a field as one that must be filled in before a form can be sent. |
| target | a | Controls whether a link opens in the same tab or a new one. |
| width, height | img | Sets the size of a picture. |
| lang | html | Tells the browser what language the page's text is written in. |

## Try it

<WebPlayground
	:panes="['html']"
	:initial-html="'<h1 id=\'main-title\' title=\'This is the page title\'>Hello!</h1>\n<p class=\'note\'>Hover over the heading above to see its tooltip.</p>\n<input type=\'text\' placeholder=\'Type your name\'>'"
/>

## Try it yourself

Add a `title` attribute to the paragraph, with your own tooltip text. Hover over it in the preview to see it appear.

## Check your understanding

<Quiz
	question="Which attribute gives one specific element a unique name on the page?"
	:options="['class', 'id', 'title', 'style']"
	:answer-index="1"
	explanation="id gives one single element a unique name. class is meant to be shared across many elements."
/>

## What you learned

- An attribute is extra information added inside an opening tag, written as name equals value.
- Attributes always live inside the opening tag, and never get their own closing tag.
- Global attributes like id, class, title, style, and lang can be used on almost any tag.
- A reference table of common attributes is here whenever you need to look one up again.

**Next lesson:** [Basic Structure](/lessons/html/basic-structure)
