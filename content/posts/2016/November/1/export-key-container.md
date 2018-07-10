---
title: "Export a key container"
style: "snippet"
image: "../../../images/security.png"
abstract: "Learn how to use ASP.NET IIS Registration Tool to export a RSA key container."
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

`gist:f00e52a7af85bd295616b1436c383f89#syntax.text`

| Option         | Description                                                               |
| -------------- | ------------------------------------------------------------------------- |
| **container**  | The name of the container to be exported.                                 |
| **path**       | The path where the RSA key container is to be exported.                   |
| pku            | Substitutes a user-specified container for the default machine container. |
| csp <provider> | Specifies the container provider to use.                                  |

<!-- end:abstract -->

### Example

`gist:f00e52a7af85bd295616b1436c383f89#example.ps1`

### References
[Importing and Exporting Protected Configuration RSA Key Containers](https://msdn.microsoft.com/en-us/library/yxw286t2.aspx)
