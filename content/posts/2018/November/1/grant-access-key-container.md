---
title: "Grant access to a key container"
style: "snippet"
image: "../../../images/security.png"
abstract: "Learn how to use ASP.NET IIS Registration Tool to grant access to a RSA key container."
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

`gist:ab3b4f9b33b4af22f391586c57c86dd4#syntax.text`

| Option         | Description                                                               |
| -------------- | ------------------------------------------------------------------------- |
| **container**  | The name of the container to be used.                                     |
| **account**    | The account to be granted permissions.                                    |
| pku            | Substitutes a user-specified container for the default machine container. |
| full           | Gives full access to the key container.                                   |   
| csp <provider> | Specifies the container provider to use.                                  |

<!-- end:abstract -->

### Example

`gist:ab3b4f9b33b4af22f391586c57c86dd4#example.ps1`

### References
[Walkthrough: Creating and Exporting an RSA Key Container](https://msdn.microsoft.com/en-us/library/2w117ede.aspx)
