---
title: Lessons
description: Browse Syntaxia's interactive programming lessons by language.
# Without this, VitePress matches this page against the '/lessons/' sidebar
# config key too (same prefix as every actual lesson page), which silently
# gives this index page the has-sidebar nav/content layout — a reserved
# empty gutter on the left instead of the same full-width header every
# other public page (home, /paths/) gets, with no sidebar content to show
# in it (LessonSidebar.vue only renders on individual lesson pages).
sidebar: false
---

# Lessons

<LessonsIndex />
