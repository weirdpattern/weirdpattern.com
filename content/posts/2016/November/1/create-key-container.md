---
title: "Create a key container"
style: "snippet"
image: "../../../images/security.png"
abstract: "Learn how to use ASP.NET IIS Registration Tool to create a RSA key container."
date: "2016-11-01"
author: "ptrevino"
category: "security"
tags:
    - security
    - key container
    - aspnet
---

<!-- start:abstract -->

#### Syntax

`gist:9c4e6151caa8d1da85e9b3b53c234384#syntax.text`

| Option         | Description                                                               |
| -------------- | ------------------------------------------------------------------------- |
| **container**  | The name of the container to be created.                                  |
| size <keySize> | The size of the key (default is 2048 bytes).                              |
| pku            | Substitutes a user-specified container for the default machine container. |
| exp            | Makes the container exportable.                                           |   
| csp <provider> | Specifies the container provider to use.                                  |

<!-- end:abstract -->

### Example

`gist:9c4e6151caa8d1da85e9b3b53c234384#example.ps1`

### References
[Walkthrough: Creating and Exporting an RSA Key Container](https://msdn.microsoft.com/en-us/library/2w117ede.aspx)
