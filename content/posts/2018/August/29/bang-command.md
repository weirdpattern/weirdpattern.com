---
title: "Using the bang command (!)"
style: "snippet"
image: "../../../images/bash.png"
abstract: "Learn how to use bash history to your advantage with the bang command"
date: "2018-08-29"
author: "ptrevino"
category: "bash"
tags:
    - bash
    - terminal
    - command
    - nix
    - unix
    - linux    
---

<div class="tldr" markdown="true">

  The bang command allows you to not only quickly retrieve several most 
  recent commands, but also reuse parts of the previous command (or any other 
  command within the bash history), thus making command chaining more easy to 
  implement and even more powerful.

</div>

<!-- start:abstract -->

### Syntax

`gist:37a4924f89e8cd4dd4a59bafda15397d#syntax.text`

| Option   | Description                                                               |
| -------- | ------------------------------------------------------------------------- |
| !        | Use the last command                                                      |
| \[n\]    | Use the n-th unique command in the history                                |
| -\[n\]   | Use the command n-th lines back in the history (can be repeated commands) |
| \[str\]  | Use the most recent command that starts with the given string             |
| ?\[str\] | Use the most recent command that contains the given string                |
| :0       | Use the previous command with no arguments                                |
| ^        | Use the first word of the previous command                                |
| :\[n\]   | Use the n-th word of the previous command                                 |
| $        | Use the last word of the previous command                                 |
| *        | Use the all words of the previous command                                 |
| :p       | Prints the matching command without executing it                          |

<!-- end:abstract -->

### Example

`gist:37a4924f89e8cd4dd4a59bafda15397d#example.sh`

### References
[Bang command](http://ss64.com/bash/bang.html)
