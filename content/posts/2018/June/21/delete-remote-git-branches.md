---
title: "Delete a remote git branch using the terminal"
style: "snippet"
image: "../../../images/git.jpg"
abstract: "Learn how to keep a clean remote git repository by deleting unwanted or old branches"
date: "2018-06-21"
author: "ptrevino"
category: "git"
tags:
    - git
    - branch
    - delete
    - remote
    - repository
    - command
---

<!-- start:abstract -->

### Syntax

```
git push <remote> --delete <branch> 
```

| Option     | Description                      |
| ---------- | -------------------------------- |
| **remote** | The remote to be used.           |
| **branch** | The remote branch to be deleted. |

<!-- end:abstract -->  

### Example

```bash
# deletes remote branch "my-branch"
git -push origin --delete my-branch
```

### References
[git-branch](https://git-scm.com/docs/git-branch) 

