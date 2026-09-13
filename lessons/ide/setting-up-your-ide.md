---
title: Setting Up Your IDE
description: Installing Visual Studio Code and opening your first project folder, step by step.
---

# Setting Up Your IDE

The [previous lesson](/lessons/ide/choosing-the-right-ide) settled on Visual Studio Code as this book's IDE of choice. This lesson is the hands-on part: actually installing it, and opening a real folder in it for the first time.

You do not need to do any of this to continue the book. Every lesson's built-in editor still works fully in your browser. This is only for whenever you are ready to also try it on your own computer.

## Step 1: Download it

Visit the official Visual Studio Code website at [code.visualstudio.com](https://code.visualstudio.com) and click the download button for your operating system, Windows, Mac, or Linux. The site automatically detects which one you are using and offers the right download.

## Step 2: Install it

- **Windows:** run the downloaded `.exe` installer, accept the license agreement, and keep the default options unless you have a specific reason to change them.
- **Mac:** open the downloaded `.zip`, then drag the extracted `Visual Studio Code` application into your `Applications` folder.
- **Linux:** most distributions offer a `.deb` or `.rpm` package directly from the same download page, installable the same way you install any other application.

## Step 3: Open it, and open a folder

When VS Code first opens, it shows a **Welcome** tab. From here:

1. Go to **File > Open Folder...**
2. Create a new, empty folder somewhere you will remember, for example one named `my-first-project`, and select it.
3. VS Code reopens with that folder as your **workspace**, shown in the file explorer on the left.

Opening a *folder*, not a single file, matters. The [next lesson](/lessons/ide/ide-navigation-and-features) covers exactly why: a real project is a folder of related files working together, and VS Code's file explorer is built around browsing one.

## Step 4: Create your first real file

Inside that folder, in VS Code's file explorer:

1. Click the "new file" icon.
2. Name it `index.html`.
3. Type a small amount of HTML into it, for example the basic structure from [Your First HTML File](/lessons/html/your-first-html-file).
4. Save it with `Ctrl+S` (Windows/Linux) or `Cmd+S` (Mac).
5. Find the saved file in your operating system's file browser, and double-click it to open it in your actual browser.

That is the entire loop you will repeat constantly from here on: edit in VS Code, save, view in a browser.

## A note on extensions during setup

VS Code will likely suggest installing an extension or two based on the file types it notices in your folder, for example one for HTML. It is completely fine to skip these for now. The [Extensions & Customization](/lessons/ide/extensions-and-customization) lesson later in this section covers what extensions are and how to choose them deliberately, rather than installing everything VS Code suggests right away.

## Check your understanding

<Quiz
	question="In VS Code, what should you open to start a real project, rather than a single file?"
	:options="['A single .html file only', 'A folder, using File > Open Folder...', 'The Welcome tab', 'An extension']"
	:answer-index="1"
	explanation="Opening a folder gives VS Code a full workspace to browse in its file explorer, which is how it handles multi-file projects."
/>

## What you learned

- Visual Studio Code is downloaded from its official site, with installers for Windows, Mac, and Linux.
- A real project starts by opening a folder, not a single file, which becomes your workspace in the file explorer.
- The basic day-to-day loop is: edit in VS Code, save, then view the result in a browser.
- VS Code may suggest extensions automatically, but installing them deliberately, rather than by default, is worth waiting on.

The next lesson looks at what that file explorer, and the rest of the VS Code window, actually offer once a project is open.
