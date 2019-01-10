---
title: "Removes access from a key container"
style: "snippet"
image: "../../../images/security.png"
abstract: "Learn how to use ASP.NET IIS Registration Tool to remove access from a RSA key container."
date: "2018-11-01"
author: "ptrevino"
category: "security"
tags:
    - security
    - key container
    - aspnet
---

<!-- start:abstract -->

### Syntax

`gist:0096fe1bc8fe8db1eaa52599758b4830#syntax.text`

| Option         | Description                                                               |
| -------------- | ------------------------------------------------------------------------- |
| **container**  | The name of the container to be used.                                     |
| **account**    | The account to be removed.                                                |
| pku            | Substitutes a user-specified container for the default machine container. |
| csp <provider> | Specifies the container provider to use.                                  |

<!-- end:abstract -->

### Example

`gist:0096fe1bc8fe8db1eaa52599758b4830#example.ps1`

### References
[Walkthrough: Creating and Exporting an RSA Key Container](https://msdn.microsoft.com/en-us/library/2w117ede.aspx)
