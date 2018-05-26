---
title: "Encrypt a configuration section in a configuration file not hosted in IIS"
style: "snippet"
abstract: "Learn how to encrypt a configuration section in a configuration file not hosted in IIS"
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

```
aspnet_regiis -pef <section> <directory> -prov <provider> [-pkm]
```

| Option        | Description                                                           |
| ------------- | --------------------------------------------------------------------- |
| **section**   | The section of the web.config to be encrypted.                        |
| **directory** | The physical path to the web.config file.                             |
| **provider**  | The name of the provider to be used to encrypt (configProtectedData). |
| pkm           | Encrypts the machine config instead of the local config.              |

Note: this option looks for a web.config file, there is no way you can specify a difference name. If needed, rename your app.config to web.config, encryp/decrypt, then rename again.  

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
$ .\aspnet_regiis -pef "connectionStrings" "C:/inetpub/Application/" -prov "MyProtectedConfigurationProvider"
  Microsoft (R) ASP.NET RegIIS version 4.0.30319.18408
  Administration utility to install and uninstall ASP.NET on the local machine.
  Copyright (C) Microsoft Corporation.  All rights reserved.


```
