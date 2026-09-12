---
title: Images
description: Using the img tag to show pictures, and why alt text matters.
---

# Images

Words are not the only thing a webpage can show. This lesson covers pictures.

## The img tag

Adding an image uses the `<img>` tag. It has no closing tag, and no content between an opening and closing part, since it does not wrap around anything. It just points to a picture and shows it.

```html
<img src="cat.jpg" alt="A sleeping orange cat">
```

- `src` stands for "source." It is the location of the picture file.
- `alt` stands for "alternative text." It is a short written description of the picture.

## Why alt text matters

Think of alt text like the caption under a photo in a newspaper, describing what the photo shows. It matters for two reasons.

1. If the picture fails to load, the visitor sees the alt text instead, so they still know what was supposed to be there.
2. Some visitors use special software called a screen reader, which reads a page out loud instead of showing it. A screen reader reads your alt text aloud, since it cannot "see" the picture itself.

Because of this, always write alt text that actually describes the picture. Do not leave it blank, and do not just repeat the word "image."

## Try it

<WebPlayground
	:panes="['html']"
	:initial-html="'<h1>My Photo</h1>\n<img src=\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMTIwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iIzMyODdhOCIvPjx0ZXh0IHg9IjEwMCIgeT0iNjUiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+UGhvdG88L3RleHQ+PC9zdmc+\' alt=\'A placeholder photo\'>'"
/>

The picture above is just a simple placeholder built into this lesson, so it always works without needing the internet. On your own page, you would point `src` at a real picture file instead.

## Try it yourself

Change the alt text to describe the placeholder picture in your own words.

## Check your understanding

<Quiz
	question="What does the alt attribute do?"
	:options="['Changes the size of the image', 'Describes the image in words', 'Links the image to another page', 'Makes the image load faster']"
	:answer-index="1"
	explanation="Alt text describes the image in words, for when it fails to load, and for screen readers that read the page out loud."
/>

## What you learned

- The img tag shows a picture, using the src attribute to point to it.
- The img tag has no closing tag.
- The alt attribute describes the picture in words, for shown when it fails to load, and for screen readers.

**Next lesson:** [Lists](/lessons/html/lists)
