---
title: "Get the delta between two git branches"
style: "snippet"
image: "./images/git.jpg"
abstract: "Learn how to create a release branch and get the delta changes between release and master."
date: "2018-06-05"
author: "ptrevino"
category: "git"
tags:
    - git
    - diff
    - delta
    - branch
    - command
---

<!-- start:abstract -->

### Syntax

```
git diff [options] <commit>[..<commit>] [--] [<path>...]
```

| Option     | Description                                                                                         |
| ---------- | --------------------------------------------------------------------------------------------------- |
| options    | The differen options that can be used to report the differences                                     |
| **commit** | An arbitrary commit/branch to be compared.                                                          |
| commit     | The second commit/branch to be compared, if omitted then HEAD (of the current branch) is used.      |
| path...    | If path is specified, then the comparison happens at the file level instead of commit/branch level. |

Note: common options are  
--minimal, spend extra time to make sure the smallest possible diff is produced.  
--summary, output a condensed summary of extended header information such as creations, renames and mode changes.  
--name-only, show only names of changed files.  
--name-status, show only names and status of changed files.  
--diff-filter, select only files that are:   
  <span style="display: block; margin-left: 30px;" markdown="1">Added (A)</span>
  <span style="display: block; margin-left: 30px;" markdown="1">Copied (C)</span>
  <span style="display: block; margin-left: 30px;" markdown="1">Deleted (D)</span>
  <span style="display: block; margin-left: 30px;" markdown="1">Modified (M)</span>
  <span style="display: block; margin-left: 30px;" markdown="1">Renamed (R)</span>
  <span style="display: block; margin-left: 30px;" markdown="1">Changed (T)</span>
  <span style="display: block; margin-left: 30px;" markdown="1">Unmerged (U)</span>
  <span style="display: block; margin-left: 30px;" markdown="1">Unknown (X)</span>
  <span style="display: block; margin-left: 30px;" markdown="1">airing Broken (B)</span>

<!-- end:abstract -->  

### Example

```bash
# get delta between HEAD and origin/master displaying status and name of the files
git diff --name-status origin/master

# get delta between HEAd and origin/master displaying status and name of the files and showing only added files
git diff --name-status --diff-filter A origin/master
```

### References
[git-diff](https://git-scm.com/docs/git-diff) 

