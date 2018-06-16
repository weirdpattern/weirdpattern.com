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

```
aspnet_regiis -pd <section> -app <virtualPath> [-location <subPath>] [-pkm]
```

| Option             | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| **section**        | The section of the web.config to be encrypted.                |
| **virtualPath**    | The IIS website that hosts the web.config.                    |
| location <subPath> | The subpath inside the IIS website that hosts the web.config. |
| pkm                | Encrypts the machine config instead of the local config.      |

<!-- end:abstract -->

### Example

```powershell
# Given a configuration fle like
# <configuration>
#   <configProtectedData>
#     <providers>
#       <add name="MyProtectedConfigurationProvider" 
#            type="System.Configuration.RsaProtectedConfigurationProvider, ..." 
#            keyContainerName="MyKeyContainer" 
#            useMachineContainer="true" />
#     </providers>
#   </configProtectedData>
# </configuration>

$ cd "$env.WINDIR/Microsoft.NET/Framework64/v4.0.30319"
$ .\aspnet_regiis -pd connectionStrings -app "/Default Website"
  Microsoft (R) ASP.NET RegIIS version 4.0.30319.18408
  Administration utility to install and uninstall ASP.NET on the local machine.
  Copyright (C) Microsoft Corporation.  All rights reserved.
  Decrypting configuration sections...
  Succeeded!
```

### References
[How to: Decrypt a web.config](https://msdn.microsoft.com/en-us/library/bb986792.aspx)
