---
title: "Create a key container"
cover: "/images/encryption.jpg"
date: "11/01/2016"
category: "snippet"
tags:
    - security
    - encryption
    - aspnet
    - c#
---

# Create a key container

## Syntax

```
aspnet_regiis -pc <container> [-size <keySize>][-csp <provider>][-pku][-exp]
```

## Arguments 

|   Required?   | Option    | Description                                   |
| :-----------: | --------- | --------------------------------------------- |
|   &#10003;    | container | The name of the container to be created.      |
|               | keySize   | The size of the key (default is 2048 bytes).  |
|               | provider  | The container provide to be used (RSA/Dpapi). |
|               | pku       | Makes the container a user level container.   |
|               | exp       | Makes the container exportable.               |  

## Example

```powershell
$ cd "$env.WINDIR/Microsoft.NET/Framework64/v4.0.30319"
$ .\aspnet_regiis -pc MyContainer -exp
  
  Microsoft (R) ASP.NET RegIIS version 4.0.30319.18408
  Administration utility to install and uninstall ASP.NET on the local machine.
  Copyright (C) Microsoft Corporation.  All rights reserved.


```
