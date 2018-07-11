---
title: "Delete a local git branch using the terminal"
style: "snippet"
image: "../../../images/git.jpg"
abstract: "Learn how to keep a clean local git repository by deleting unwanted or old branches"
date: "2018-06-21"
author: "ptrevino"
category: "git"
tags:
    - git
    - branch
    - delete
    - local
    - repository
    - command
---

<!-- start:abstract -->

### Syntax

`gist:4e0d8c535d879df6d02248c4e30fa9bf#syntax.text`

| Option     | Description                     |
| ---------- | ------------------------------- |
| **option** | The delete option to be used.   |
| **branch** | The local branch to be deleted. |

Note: valid options are:  
-D, forces the deletion of the local branch even if there are pending merges.  
-d, is a synonym of --delete.  
--delete, deletes the local branch with no pending merges.  

<!-- end:abstract -->  

### Example

`gist:4e0d8c535d879df6d02248c4e30fa9bf#example.sh`

### References
[git-branch](https://git-scm.com/docs/git-branch) 

