---
title: "Decrypt a configuration section in a configuration file not hosted in IIS"
style: "snippet"
image: "../../../images/security.png"
abstract: "Learn how to use ASP.NET IIS Registration Tool to decrypt a configuration section in a configuration file not hosted in IIS."
date: "2018-11-01"
author: "ptrevino"
category: "security"
tags:
    - security
    - decryption
    - aspnet
---

<!-- start:abstract -->

### Syntax

`gist:f5093b4b0ac5b4c26f4c81a4e9e20735#syntax.text`

| Option             | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| **section**        | The section of the web.config to be encrypted.                |
| **directory**      | The IIS website that hosts the web.config.                    |
| pkm                | Encrypts the machine config instead of the local config.      |

Note: this option looks for a web.config file, there is no way you can specify a difference name. If needed, rename your app.config to web.config, encryp/decrypt, then rename again.  

<!-- end:abstract -->

### Example

`gist:f5093b4b0ac5b4c26f4c81a4e9e20735#example.ps1`

### References
[How to: Decrypt a web.config](https://msdn.microsoft.com/en-us/library/bb986792.aspx)
