---
title: Forms Part 1
description: Building a simple form with input fields and labels.
---

# Forms Part 1

A form is how a webpage asks a visitor for information, like their name or email address. Think of a paper form you fill out at a doctor's office, with blank lines to write on, and a label next to each line telling you what to write.

This lesson covers the first two pieces: input fields and labels. In our editor here, a form will not actually send information anywhere, since that needs a server on the other end. We are only learning what a form looks like and how to build one.

## The input tag

An `<input>` tag creates a blank field for typing into. Like `<img>`, it has no closing tag.

```html
<input type="text">
```

The `type` attribute controls what kind of field it is. `type="text"` makes a normal typing box. Later in this book, you will see other types, like checkboxes and buttons.

## The label tag

A `<label>` tag is the text that tells a visitor what to type into a field. On its own, an input field is just a blank box. A label gives it meaning.

```html
<label for="name">Your Name</label>
<input type="text" id="name">
```

Notice two matching pieces here.

- The label's `for` attribute.
- The input's `id` attribute.

Both are set to the same value, `name` in this example. This connects the label to that exact input. Once connected, clicking the label text also moves your cursor into the matching field, which makes forms much easier to use.

## Try it

<WebPlayground
	:panes="['html']"
	:initial-html="'<form>\n\t<label for=\'first-name\'>First Name</label>\n\t<input type=\'text\' id=\'first-name\'>\n\n\t<label for=\'email\'>Email Address</label>\n\t<input type=\'email\' id=\'email\'>\n</form>'"
/>

## Try it yourself

Add a third label and input pair for a "Last Name" field. Give the label and input matching id and for values, just like the examples above.

## Check your understanding

<Quiz
	question="How does a label connect to a specific input field?"
	:options="['They must be right next to each other in the code', 'The label needs a name attribute matching the input', 'The label for attribute matches the input id attribute', 'They are automatically connected by the browser']"
	:answer-index="2"
	explanation="A label's for attribute must match the input's id attribute exactly. That match is what connects them."
/>

## What you learned

- The input tag creates a field for typing into, and has no closing tag.
- The type attribute controls what kind of field an input is.
- The label tag describes what a field is for.
- A label connects to an input by matching the label's for attribute to the input's id attribute.

**Next lesson:** [Forms Part 2](/lessons/html/forms-part-2)
