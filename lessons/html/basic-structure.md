---
title: Basic Structure
description: The html, head, and body tags that every HTML page needs.
---

# Basic Structure

Every proper HTML page follows the same basic skeleton. Once you know this skeleton, you can build almost anything on top of it.

## Think of a letter

Imagine you are writing a letter. A letter has two parts.

1. An envelope, with information like the address. Nobody reads this part out loud, but it is needed to deliver the letter.
2. The actual letter inside, the part your friend reads and enjoys.

An HTML page works the same way. It has one part that sets up information about the page, and another part that holds everything a visitor actually sees.

## The three main tags

```html
<!DOCTYPE html>
<html>
	<head>
		<title>My Page</title>
	</head>
	<body>
		<h1>Hello, world!</h1>
	</body>
</html>
```

Let's go through this line by line.

- `<!DOCTYPE html>` goes at the very top. It tells the browser "this is a modern HTML page." It is not really a tag, and it does not need a closing tag. You just place it once, at the top.
- `<html>` wraps around the entire page. Everything else goes inside it.
- `<head>` is the "envelope" part. It holds information about the page that is not shown directly on the page itself, like the page's title (the text shown in the browser's tab).
- `<title>` goes inside `<head>`, and sets that tab text.
- `<body>` is the "letter" part. Everything a visitor actually sees, like headings, paragraphs, and pictures, goes inside `<body>`.

## Try it

<WebPlayground
	:panes="['html']"
	:initial-html="'<!DOCTYPE html>\n<html>\n<head>\n\t<title>My Page</title>\n</head>\n<body>\n\t<h1>Hello, world!</h1>\n</body>\n</html>'"
/>

Notice the preview only shows what is inside `<body>`. That is because `<head>` is not meant to be visible on the page itself.

## Try it yourself

Change the text inside `<title>` to your own name. Then open your browser's actual tab (if you are viewing this book in one) to notice that page titles work the same way everywhere.

## Check your understanding

<Quiz
	question="Which part of an HTML page actually shows up for a visitor to see?"
	:options="['The head', 'The body', 'The DOCTYPE', 'The title']"
	:answer-index="1"
	explanation="The body holds everything a visitor sees. The head holds information about the page, like its title, which is not shown directly on the page."
/>

## What you learned

- Every HTML page has a basic skeleton: DOCTYPE, html, head, and body.
- The DOCTYPE tells the browser this is a modern HTML page.
- The head holds information about the page, like its title, which is not shown on the page itself.
- The body holds everything a visitor actually sees.

**Next lesson:** [Meta Tags and the Head](/lessons/html/meta-and-head-tags)
