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

```
git branch <[-D | -d | --delete]> <branch> 
```

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

```bash
# deletes local branch "my-branch"
git branch --delete my-branch

# same as above
git branch -d my-branch

# forces the deletion of the local branch "my-branch"
git branch -D my-branch
```

### References
[git-branch](https://git-scm.com/docs/git-branch) 

