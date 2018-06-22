---
title: "Prunes the repository from deleted remote branches using the terminal"
style: "snippet"
image: "../../../images/git.jpg"
abstract: "Learn how to prune your repository form deleted remote branches"
date: "2018-06-21"
author: "ptrevino"
category: "git"
tags:
    - git
    - branch
    - prune
    - local
    - remote
    - repository
    - command
---

<!-- start:abstract -->

### Syntax

```
git fetch [remote] [-p | --prune]
```

| Option | Description                                 |
| ------ | ------------------------------------------- |
| remote | The remote to be used (defaults to origin). |

<!-- end:abstract -->  

### Example

```bash
# prunes the remote repository origin
git fetch --prune

# same as above
git fetch -p

# prunes the remote repository upstream
git fetch upstream --prune

# same as above
git fetch upstream -p
```

### References
[git-fetch](https://git-scm.com/docs/git-fetch) 

