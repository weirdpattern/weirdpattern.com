---
title: "Create a key container"
style: "snippet"
image: "./images/security.png"
abstract: "Learn how to use ASP.NET IIS Registration Tool to create an RSA public/private key pair in the specified container."
date: "2016-11-01"
author: "ptrevino"
category: "security"
tags:
    - security
    - encryption
    - decryption
    - key container
    - container
    - aspnet
---

<!-- start:abstract -->

#### Syntax

```
aspnet_regiis -pc <container> [-size <keySize>][-csp <provider>][-pku][-exp]
```

| Option        | Description                                   |
| ------------- | --------------------------------------------- |
| **container** | The name of the container to be created.      |
| keySize       | The size of the key (default is 2048 bytes).  |
| provider      | The container provide to be used (RSA/Dpapi). |
| pku           | Makes the container a user level container.   |
| exp           | Makes the container exportable.               |  

<!-- end:abstract -->

### Example

```powershell
$ cd "$env.WINDIR/Microsoft.NET/Framework64/v4.0.30319"
$ .\aspnet_regiis -pc MyKeyContainer -exp
  
  Microsoft (R) ASP.NET RegIIS version 4.0.30319.18408
  Administration utility to install and uninstall ASP.NET on the local machine.
  Copyright (C) Microsoft Corporation.  All rights reserved.


```

### References
[How to: Decrypt a web.config](https://msdn.microsoft.com/en-us/library/bb986792.aspx)
