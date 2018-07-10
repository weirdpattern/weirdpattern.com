---
title: "Redirecting streams to the /dev/null sink"
style: "snippet"
image: "../../../images/bash.png"
abstract: "Learn the proper way of redirecting unwanted streams to /dev/null."
date: "2016-08-31"
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

  Redirects the stdout/stderr (or both) to a special location called /dev/null.  

  The /dev/null device is a special file (not a directory) and it's typically used 
  as a sink for unwanted output streams of a process, or as a convenient empty 
  file for input streams. This is usually done by redirection.  

  Why is this important? Well imagine you have a very important process that 
  cannot not be interrupted, redirecting outputs is a good way to avoid 
  unhandled errors.

</div>

<!-- start:abstract -->

### Syntax

`gist:ce54fdb1e5621b5966e146026995b974#syntax.text`

| Option        | Description                                    |
| ------------- | ---------------------------------------------- |
| **operation** | The operation whose output will be redirected. |
| n             | The stream to be redirected (see below).       |
| options       | The stream redirection options.                |

Valid values for [n]:
<span style="display: block; margin-left: 30px;" markdown="1">1, standard out</span>
<span style="display: block; margin-left: 30px;" markdown="1">2, standard error</span>
<span style="display: block; margin-left: 30px;" markdown="1">&, both</span>

<!-- end:abstract -->

### Example

`gist:ce54fdb1e5621b5966e146026995b974#example.sh`

### References
[Null device](https://en.wikipedia.org/wiki/Null_device)
