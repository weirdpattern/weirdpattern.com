---
title: "Rebase a pull request"
style: "guide"
image: "../../../images/git.jpg"
abstract: "Learn how to rebase a pull request."
date: "2018-11-28"
author: "ptrevino"
category: "git"
tags:
    - git
    - rebase
    - branch
    - command 
    - maintenance
---

<div class="tldr" markdown="true">
  <!-- start:abstract -->

  There is nothing more daunting than rebasing your first pull request. I still
  remember the day I was asked to do this and, honestly, I can't recall how I 
  pulled it off, but I did... of course this was years ago when there was no 
  `Update branch` button in `Github` (which by the way, does a merge commit 
  which I personally dislike). So I'm gonna save you some time and a lot of 
  trouble with this mini guide.
  
  <!-- end:abstract -->
</div>

### Steps
1. Clone the repository (if you don't have it already).
   `gist:ea9fc44a4af30a0ec085d1a1ec6f53b7#1.sh`

2. Add the remote repository (if you don't have it already).
   `gist:ea9fc44a4af30a0ec085d1a1ec6f53b7#2.sh`
   
3. Checkout the branch you want to rebase.
   `gist:ea9fc44a4af30a0ec085d1a1ec6f53b7#3.sh`

4. Fetch the latest from the remote branch.
   `gist:ea9fc44a4af30a0ec085d1a1ec6f53b7#4.sh`

5. Rebase the remote branch onto your current branch.
   `gist:ea9fc44a4af30a0ec085d1a1ec6f53b7#5.sh`

6. Resolve any conflicts (if any)
   `gist:ea9fc44a4af30a0ec085d1a1ec6f53b7#6.sh`

7. Force a push (this is important, otherwise is mess up the entire history).
   `gist:ea9fc44a4af30a0ec085d1a1ec6f53b7#7.sh`

That's it... this wasn't so bad, was it?

Happy Coding!
