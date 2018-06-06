---
title: "Exit and quit terminal with a single command"
style: "snippet"
image: "./images/shortcut.jpg"
abstract: "Use your .bash_profile to create a shortcut that will allow you to exit and quit a terminal with a single command."
date: "2016-09-26"
author: "ptrevino"
category: "shortcuts"
tags:
    - shortcuts
    - bash
    - profile
    - bash_profile
    - exit
    - quit
    - terminal
---

<!-- start:abstract -->

### Syntax

```bash
export TERMINAL=<TERMINAL>
alias quit='/usr/bin/osascript -e "tell application \"$TERMINAL\" to quit"; exit'
```

| Option       | Description                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------- |
| **TERMINAL** | An environment variable with the name of the terminal you prefer (I export this in .bash_exports) |

<!-- end:abstract -->  

### Example

```bash
$ quit 
  # This will exit the terminal process and then close the terminal window (no more ⌘ + Q)
```

### References
[Automatically quit Terminal when typing exit](http://apple.stackexchange.com/questions/3066/automatically-quit-terminal-when-typing-exit/15002#15002)


