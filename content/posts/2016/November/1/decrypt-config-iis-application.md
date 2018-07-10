---
title: "Decrypt a configuration section in a configuration file hosted in IIS"
style: "snippet"
image: "../../../images/security.png"
abstract: "Learn how to use ASP.NET IIS Registration Tool to decrypt a configuration section in a configuration file hosted in IIS."
date: "2016-11-01"
author: "ptrevino"
category: "security"
tags:
    - security
    - decryption
    - aspnet
---

<!-- start:abstract -->

### Syntax

`gist:7843ce03e79e9526f2b0a57c20690001#syntax.text`

| Option             | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| **section**        | The section of the web.config to be encrypted.                |
| **virtualPath**    | The IIS website that hosts the web.config.                    |
| location <subPath> | The subpath inside the IIS website that hosts the web.config. |
| pkm                | Encrypts the machine config instead of the local config.      |

<!-- end:abstract -->

### Example

`gist:7843ce03e79e9526f2b0a57c20690001#example.ps1`

### References
[How to: Decrypt a web.config](https://msdn.microsoft.com/en-us/library/bb986792.aspx)
