---
title: Putting It All Together
description: A small project combining everything learned so far, a simple profile page.
---

# Putting It All Together

You have now learned every basic building block of HTML. This lesson is a project, where you combine them into one small page: a simple "About Me" profile page.

## What we are building

A profile page usually includes:

- A main heading with your name.
- A picture of yourself, or a placeholder.
- A short paragraph describing you.
- A list of your hobbies or interests.
- A link to something you like, like a favorite website.

That list itself is a great example of everything fitting together. Notice it uses an unordered list, just like you learned earlier.

## A starting template

Here is a starting point. It already uses the basic structure from an earlier lesson, plus a semantic header and footer.

```html
<!DOCTYPE html>
<html>
<head>
	<title>About Me</title>
</head>
<body>
	<header>
		<h1>Your Name Here</h1>
	</header>

	<section>
		<p>Write a short introduction about yourself here.</p>
	</section>

	<section>
		<h2>My Hobbies</h2>
		<ul>
			<li>Hobby one</li>
			<li>Hobby two</li>
		</ul>
	</section>

	<footer>
		<p>Thanks for visiting my page.</p>
	</footer>
</body>
</html>
```

## Try it

Use the editor below to build your own version. Replace the placeholder text with real information about yourself, add a picture, and add a link.

<WebPlayground
	:panes="['html']"
	:initial-html="'<!DOCTYPE html>\n<html>\n<head>\n\t<title>About Me</title>\n</head>\n<body>\n\t<header>\n\t\t<h1>Your Name Here</h1>\n\t</header>\n\n\t<section>\n\t\t<p>Write a short introduction about yourself here.</p>\n\t</section>\n\n\t<section>\n\t\t<h2>My Hobbies</h2>\n\t\t<ul>\n\t\t\t<li>Hobby one</li>\n\t\t\t<li>Hobby two</li>\n\t\t</ul>\n\t</section>\n\n\t<footer>\n\t\t<p>Thanks for visiting my page.</p>\n\t</footer>\n</body>\n</html>'"
	preview-height="380px"
/>

## Your project checklist

Before moving on, check that your page has all of these.

- [ ] A heading with your name, inside a header.
- [ ] At least one paragraph about yourself.
- [ ] A list of at least two hobbies or interests.
- [ ] A link to a website, using the a tag from an earlier lesson.
- [ ] A footer at the bottom.
- [ ] At least one comment somewhere in your code.

If you have all six, you have just built a real webpage using nothing but what you learned in this book so far. That is worth being proud of.

## What you learned

- How to combine structure, headings, paragraphs, lists, links, and semantic tags into one complete page.
- That building a real page is just a matter of putting familiar, small pieces together.
