---
title: "Export a key container"
style: "snippet"
image: "./images/security.png"
abstract: "Learn how to use ASP.NET IIS Registration Tool to export a RSA key container."
date: "2016-11-01"
author: "ptrevino"
category: "security"
tags:
    - security
    - key
    - container
    - key container    
    - aspnet
---

<!-- start:abstract -->

### Syntax

```
aspnet_regiis -px <container> <path> [-pku] [-cpu <provider>]
```

| Option         | Description                                                               |
| -------------- | ------------------------------------------------------------------------- |
| **container**  | The name of the container to be exported.                                 |
| **path**       | The path where the RSA key container is to be exported.                   |
| pku            | Substitutes a user-specified container for the default machine container. |
| csp <provider> | Specifies the container provider to use.                                  |

<!-- end:abstract -->

### Example

```powershell
$ cd "$env.WINDIR/Microsoft.NET/Framework64/v4.0.30319"
$ .\aspnet_regiis -px MyKeyContainer C:\Temp\MyKeyContainer.xml
  
  Microsoft (R) ASP.NET RegIIS version 4.0.30319.18408
  Administration utility to install and uninstall ASP.NET on the local machine.
  Copyright (C) Microsoft Corporation.  All rights reserved.
  Exporting RSA Keys from file...
  Succeedded!
```

### References
[Importing and Exporting Protected Configuration RSA Key Containers](https://msdn.microsoft.com/en-us/library/yxw286t2.aspx)
