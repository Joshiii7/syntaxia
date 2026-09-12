---
title: Intro to HTML
description: Write your first HTML element and see it rendered live, side by side with the code that produced it.
---

# Intro to HTML

HTML gives a web page its structure. Every element is a pair of tags — an opening tag and a closing tag — wrapped around some content: `<h1>Hello</h1>`.

Below is a live playground with three panes: HTML, CSS, and JavaScript. Edit any of them and press **Run** (it also re-runs automatically a moment after you stop typing) to see the result in the preview pane on the right.

<WebPlayground
	:initial-html="'<h1>Hello, world!</h1>\n<p>Try changing this text.</p>'"
	:initial-css="'h1 {\n\tcolor: #3451b2;\n}\n'"
	:initial-js="'console.log(\'Open devtools to see this log.\');'"
/>

## Try it yourself

Change the `<h1>` text to your own name, and add a second paragraph below it introducing yourself. Press **Run** to check the result.

## Check your understanding

<Quiz
	question="Which tag closes an opening <p> tag?"
	:options="['<p>', '</p>', '<end p>', '<close p>']"
	:answer-index="1"
	explanation="A closing tag repeats the element name with a leading slash: </p>."
/>
