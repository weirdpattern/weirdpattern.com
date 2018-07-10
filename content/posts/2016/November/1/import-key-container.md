---
title: "Import a key container"
style: "snippet"
image: "../../../images/security.png"
abstract: "Learn how to use ASP.NET IIS Registration Tool to import a RSA key container."
date: "2016-11-01"
author: "ptrevino"
category: "security"
tags:
    - security
    - key container    
    - aspnet
---

<!-- start:abstract -->

### Syntax

`gist:5039f5dfbd20a9efa15f35eaf42da471#syntax.text`

| Option         | Description                                                               |
| -------------- | ------------------------------------------------------------------------- |
| **container**  | The name of the container to be imported.                                 |
| **path**       | The path to the exported RSA key container xml file.                      |
| pku            | Substitutes a user-specified container for the default machine container. |
| exp            | Specifies that private keys can be exported.                              |
| csp <provider> | Specifies the container provider to use.                                  |

<!-- end:abstract -->

### Example

`gist:5039f5dfbd20a9efa15f35eaf42da471#example.ps1`

### References
[Importing and Exporting Protected Configuration RSA Key Containers](https://msdn.microsoft.com/en-us/library/yxw286t2.aspx)
