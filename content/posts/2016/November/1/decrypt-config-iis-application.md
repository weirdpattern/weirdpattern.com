---
title: "Decrypt a configuration section in an IIS application"
cover: "/images/encryption.jpg"
date: "11/01/2016"
category: "snippet"
tags:
    - security
    - encryption
    - decryption
    - aspnet
    - c#
---

# Decrypt a configuration section in an IIS application

## Syntax

```
aspnet_regiis -pd <section> -app <virtualPath> [-location <subPath>] [-pkm]
```

## Arguments 

|   Required?   | Option      | Description                                                   |
| :-----------: | ----------- | ------------------------------------------------------------- |
|   &#10003;    | section     | The section of the web.config to be encrypted.                |
|   &#10003;    | virtualPath | The IIS website that hosts the web.config.                    |
|               | subPath     | The subpath inside the IIS website that hosts the web.config. |
|               | pkm         | Encrypts the machine config instead of the local config.      |

## Example

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


```