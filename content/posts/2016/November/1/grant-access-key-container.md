---
title: "Grant access to a key container"
style: "snippet"
image: "./images/security.png"
abstract: "Learn how to use ASP.NET IIS Registration Tool to grant access to a RSA key container."
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

```
aspnet_regiis -pa <container> <account> [-pku] [-full] [-csp <provider>]
```

| Option         | Description                                                               |
| -------------- | ------------------------------------------------------------------------- |
| **container**  | The name of the container to be used.                                     |
| **account**    | The account to be granted permissions.                                    |
| pku            | Substitutes a user-specified container for the default machine container. |
| full           | Gives full access to the key container.                                   |   
| csp <provider> | Specifies the container provider to use.                                  |

<!-- end:abstract -->

### Example

```powershell
$ cd "$env.WINDIR/Microsoft.NET/Framework64/v4.0.30319"
$ .\aspnet_regiis -pa MyKeyContainer MyDomain\MyServiceAccount -full
  
  Microsoft (R) ASP.NET RegIIS version 4.0.30319.18408
  Administration utility to install and uninstall ASP.NET on the local machine.
  Copyright (C) Microsoft Corporation.  All rights reserved.
  Adding ACL for access to the RSA Key Container...
  Succeedded!
```

### References
[Walkthrough: Creating and Exporting an RSA Key Container](https://msdn.microsoft.com/en-us/library/2w117ede.aspx)
