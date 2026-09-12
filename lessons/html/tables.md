---
title: Tables
description: Building a grid of rows and columns with table, tr, th, and td.
---

# Tables

Some information fits best in a grid, with rows going across and columns going down, like a class schedule or a calendar. HTML has tags built just for that.

## The building blocks

```html
<table>
	<tr>
		<th>Day</th>
		<th>Class</th>
	</tr>
	<tr>
		<td>Monday</td>
		<td>Art</td>
	</tr>
	<tr>
		<td>Tuesday</td>
		<td>Math</td>
	</tr>
</table>
```

- `<table>` wraps around the whole grid.
- `<tr>` stands for "table row." Each row of the grid goes inside its own `<tr>`.
- `<th>` stands for "table header." It is used for the top row, which labels each column. Browsers usually show it bold.
- `<td>` stands for "table data." It is a normal cell, holding the actual information.

Think of `<table>` as the whole calendar page, `<tr>` as one week's row, and `<td>` as one single day's box inside it.

## Try it

<WebPlayground
	:panes="['html']"
	:initial-html="'<table>\n\t<tr>\n\t\t<th>Name</th>\n\t\t<th>Favorite Color</th>\n\t</tr>\n\t<tr>\n\t\t<td>Maria</td>\n\t\t<td>Blue</td>\n\t</tr>\n\t<tr>\n\t\t<td>Sam</td>\n\t\t<td>Green</td>\n\t</tr>\n</table>'"
/>

## Try it yourself

Add a third row with your own name and favorite color.

## Check your understanding

<Quiz
	question="Which tag is used for the labeled header row at the top of a table?"
	:options="['<td>', '<tr>', '<th>', '<table>']"
	:answer-index="2"
	explanation="th stands for table header, used to label each column, usually shown bold by the browser."
/>

## What you learned

- table wraps around the whole grid.
- tr is one row of the grid.
- th is a header cell, used to label a column.
- td is a normal cell, holding regular information.

**Next lesson:** [Forms Part 1](/lessons/html/forms-part-1)
