---
title: Forms Part 2
description: Buttons, dropdowns, checkboxes, and radio buttons.
---

# Forms Part 2

In the last lesson, you learned how to build a typing field with a label. Now let's add the other common pieces of a form.

## Buttons

A `<button>` tag creates a clickable button.

```html
<button>Submit</button>
```

Think of it like the "send" button on a paper form's drop box slot. It is the final step that says "I am done, use what I filled in."

## Dropdowns

A dropdown lets someone pick one choice from a list, without taking up much space on the page, like a menu at a restaurant where you pick one main dish from a printed list.

```html
<select>
	<option>Pizza</option>
	<option>Pasta</option>
	<option>Salad</option>
</select>
```

`<select>` wraps around the whole dropdown, and each `<option>` is one choice inside it.

## Checkboxes

A checkbox lets someone turn something on or off, or pick as many choices as they like from a group. Think of a paper to-do list where you can tick off more than one box.

```html
<input type="checkbox" id="topping1">
<label for="topping1">Extra cheese</label>
```

## Radio buttons

A radio button lets someone pick only one choice out of a small group, like a multiple-choice test question where only one answer counts. In fact, the quizzes in this very book use radio buttons for exactly that reason.

```html
<input type="radio" name="size" id="small">
<label for="small">Small</label>

<input type="radio" name="size" id="large">
<label for="large">Large</label>
```

Notice both radio buttons share the same `name` attribute, `size`. That shared name is what groups them together, so picking one automatically unpicks the other. If you gave them different names, they would act like separate, unrelated checkboxes instead.

## Try it

<WebPlayground
	:panes="['html']"
	:initial-html="'<form>\n\t<label for=\'flavor\'>Choose a flavor</label>\n\t<select id=\'flavor\'>\n\t\t<option>Vanilla</option>\n\t\t<option>Chocolate</option>\n\t</select>\n\n\t<p>\n\t\t<input type=\'radio\' name=\'size\' id=\'small\'>\n\t\t<label for=\'small\'>Small</label>\n\n\t\t<input type=\'radio\' name=\'size\' id=\'large\'>\n\t\t<label for=\'large\'>Large</label>\n\t</p>\n\n\t<p>\n\t\t<input type=\'checkbox\' id=\'sprinkles\'>\n\t\t<label for=\'sprinkles\'>Add sprinkles</label>\n\t</p>\n\n\t<button>Order</button>\n</form>'"
/>

## Try it yourself

Add a third dropdown option, and a second checkbox for another topping.

## Check your understanding

<Quiz
	question="Why must radio buttons in the same group share the same name attribute?"
	:options="['It makes them look prettier', 'It is required for buttons but not checkboxes', 'It groups them so only one can be picked at a time', 'It has no real effect']"
	:answer-index="2"
	explanation="The shared name attribute is what groups radio buttons together, so choosing one automatically unchooses the others in that same group."
/>

## What you learned

- The button tag creates a clickable button.
- The select and option tags create a dropdown, letting someone pick one choice.
- A checkbox lets someone turn something on or off, and multiple checkboxes can be picked at once.
- Radio buttons in the same group share a name attribute, and only one in that group can be picked at a time.
