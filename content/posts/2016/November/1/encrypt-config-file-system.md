---
title: "Encrypt a configuration section in a configuration file not hosted in IIS"
style: "snippet"
image: "../../../images/security.png"
abstract: "Learn how to use ASP.NET IIS Registration Tool to encrypt a configuration section in a configuration file not hosted in IIS."
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

`gist:62d4565f1288362ae87f355fb0e1802d#syntax.text`

| Option              | Description                                                           |
| ------------------- | --------------------------------------------------------------------- |
| **section**         | The section of the web.config to be encrypted.                        |
| **directory**       | The physical path to the web.config file.                             |
| **prov <provider>** | The name of the provider to be used to encrypt (configProtectedData). |
| pkm                 | Encrypts the machine config instead of the local config.              |

Note: this option looks for a web.config file, there is no way you can specify a difference name. If needed, rename your app.config to web.config, encryp/decrypt, then rename again.  

<!-- end:abstract -->

### Example

`gist:62d4565f1288362ae87f355fb0e1802d#example.ps1`

### References
[How to: Decrypt a web.config](https://msdn.microsoft.com/en-us/library/bb986792.aspx)
