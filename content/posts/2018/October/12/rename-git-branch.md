---
title: "Rename a git branch"
style: "guide"
image: "../../../images/git.jpg"
abstract: "Learn how to rename a git branch."
date: "2018-10-12"
author: "ptrevino"
category: "git"
tags:
    - git
    - branch
    - command 
    - maintenance
---

<div class="tldr" markdown="true">
  <!-- start:abstract -->

  > There are only two hard things in Computer Science: cache invalidation and naming things.  
  > -- Phil Karlton

  As Phil Karlton says, naming things has, is, and will always be hard.
  This is especially true when you are the new guy in the office and you are 
  still trying to memorize the thousands and thousands of code standards/conventions 
  the new team has.  

  Fortunately for the new guy, almost everything has a fix and when it comes down to 
  branch naming conventions it is as easy as following the steps described in this guide.
  
  <!-- end:abstract -->
</div>

### Steps
1. Renaming the local branch
   `gist:957bf61d2b47df703881728e896530b8#1.sh`

2. Replacing the old remote branch with the new local branch.
   `gist:957bf61d2b47df703881728e896530b8#2.sh`

3. Resetting the upstream branch in the new local branch.
   `gist:957bf61d2b47df703881728e896530b8#3.sh`
