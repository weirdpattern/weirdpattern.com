---
title: "Grant access to a key container"
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

# Grant access to a key container

## Syntax

```
aspnet_regiis -pa <container> <account> [-csp <provider>][-pku][-full]
```

## Arguments 

|   Required?   | Option    | Description                                   |
| :-----------: | --------- | --------------------------------------------- |
|   &#10003;    | container | The name of the container to be used.         |
|   &#10003;    | account   | The account to be granted permissions.        |
|               | provider  | The container provide to be used (RSA/Dpapi). |
|               | pku       | Makes the container a user level container.   |
|               | full      | Gives full access to the key container.       |   

## Example

```powershell
$ cd "$env.WINDIR/Microsoft.NET/Framework64/v4.0.30319"
$ .\aspnet_regiis -pa MyKeyContainer MyDomain\MyServiceAccount -full
  
  Microsoft (R) ASP.NET RegIIS version 4.0.30319.18408
  Administration utility to install and uninstall ASP.NET on the local machine.
  Copyright (C) Microsoft Corporation.  All rights reserved.


```