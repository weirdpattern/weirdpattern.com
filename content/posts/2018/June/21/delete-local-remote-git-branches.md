---
title: "Delete a local and remote git branch using the terminal"
style: "snippet"
image: "../../../images/git.jpg"
abstract: "Learn how to keep a clean local and remote git repository by deleting unwanted or old branches"
date: "2018-06-21"
author: "ptrevino"
category: "git"
tags:
    - git
    - branch
    - delete
    - local
    - remote
    - repository
    - command
---

<!-- start:abstract -->

### Syntax

```
git branch <[-dr | --delete --remotes]> <remote>/<branch> 
```

| Option     | Description                      |
| ---------- | -------------------------------- |
| **remote** | The remote to be used.           |
| **branch** | The remote branch to be deleted. |

Note: valid options are:  
-dr, is a synonym of --delete --remotes  
--delete, deletes the local branch with no pending merges.  
--remotes, tells git to delete the remote tracking branch too.  

<!-- end:abstract -->  

### Example

```bash
# deletes remote and local branch "my-branch"
git branch --delete --remotes origin/my-branch

# same as above
git branch -dr origin/my-branch
```

### References
[git-branch](https://git-scm.com/docs/git-branch) 

