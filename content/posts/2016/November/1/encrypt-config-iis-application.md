---
title: "Encrypt a configuration section in a configuration file hosted in IIS"
style: "snippet"
image: "../../../images/security.png"
abstract: "Learn how to use ASP.NET IIS Registration Tool to encrypt a configuration section in a configuration file hosted in IIS."
date: "2016-11-01"
author: "ptrevino"
category: "security"
tags:
    - security
    - encryption
    - aspnet
---

<!-- start:abstract -->

### Syntax

`gist:e469c17d3efb899a1cadfc58ca35377a#syntax.text`

| Option              | Description                                                           |
| ------------------- | --------------------------------------------------------------------- |
| **section**         | The section of the web.config to be encrypted.                        |
| **virtualPath**     | The IIS website that hosts the web.config.                            |
| location <subPath>  | The subpath inside the IIS website that hosts the web.config.         |
| **prov <provider>** | The name of the provider to be used to encrypt (configProtectedData). |
| pkm                 | Encrypts the machine config instead of the local config.              |

<!-- end:abstract -->

### Example

`gist:e469c17d3efb899a1cadfc58ca35377a#example.ps1`

### References
[How to: Decrypt a web.config](https://msdn.microsoft.com/en-us/library/bb986792.aspx)
