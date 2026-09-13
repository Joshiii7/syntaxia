---
title: Basic IDE Navigation & Features
description: A tour of VS Code's main window, panel by panel, once a project is open.
---

# Basic IDE Navigation & Features

Once you have [a project folder open](/lessons/ide/setting-up-your-ide), VS Code's window fills up with several distinct panels. This lesson walks through what each one is for. You can see all of them live on the [official VS Code site](https://code.visualstudio.com), but the plain breakdown below is usually clearer the first time through.

## The file explorer

The panel on the left, open by default, lists every file and folder inside your open workspace. Clicking a file opens it in the main editor area. This is the same idea introduced back in [Introduction to IDEs](/lessons/ide/introduction), now with real buttons: a "new file" icon, a "new folder" icon, and right-click options for renaming or deleting.

## Tabs

Every file you open gets its own tab across the top of the editor area, exactly like tabs in a web browser. This matters once a project grows past one file, which happens quickly once you are working with HTML, CSS, and JavaScript together, as covered starting in [Basic Structure](/lessons/html/basic-structure). You can have several files open and switch between them with a click, instead of closing and reopening one file at a time.

## The command palette

Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac) to open the **command palette**, a search box for almost every action VS Code can perform. Instead of hunting through menus, you type what you want, for example "format document" or "new file," and press Enter. This becomes one of the fastest ways to use an IDE once you get used to it, and it is worth trying early rather than waiting until you already know every menu by heart.

## Search across files

The magnifying glass icon in the left sidebar searches every file in your open folder at once, not just the file you currently have open. This is useful the moment a project spans more than a couple of files, letting you find every place a particular tag or variable name appears without opening each file one by one.

## Split editing

Dragging a tab to the right edge of the editor area, or right-clicking a tab and choosing "Split Right," opens two files side by side. This is especially useful for HTML and CSS together, letting you see a page's structure and its styling at the same time instead of flipping back and forth between tabs.

## The status bar

The thin bar along the very bottom of the window shows small but useful details: which line and column your cursor is on, the file's detected language (for example "HTML"), and, if you have set up version tracking, which branch you are on. It is easy to overlook at first, but it becomes a quick at-a-glance check once you know it is there.

## Putting it together

None of these individually are complicated. What makes an IDE feel powerful is having all of them available in the same window, a single click or shortcut away, instead of needing separate programs for browsing files, searching text, and comparing two files side by side.

## Check your understanding

<Quiz
	question="What does the command palette (Ctrl+Shift+P / Cmd+Shift+P) let you do?"
	:options="['Change the color theme only', 'Search for and run almost any action by typing its name', 'Open the terminal exclusively', 'Delete the current file']"
	:answer-index="1"
	explanation="The command palette is a general-purpose search box for actions, letting you run almost any command by name instead of hunting through menus."
/>

## What you learned

- The file explorer lists every file/folder in your open workspace, on the left by default.
- Tabs let you keep multiple files open and switch between them, important once a project spans HTML, CSS, and JavaScript together.
- The command palette (Ctrl/Cmd+Shift+P) runs almost any action by typing its name.
- Search across files finds text anywhere in your open folder, not just the current file.
- Split editing shows two files side by side, and the status bar shows quick details like cursor position and file language.

The [next lesson](/lessons/ide/using-the-terminal) covers one more panel deliberately left out here: the built-in terminal.
