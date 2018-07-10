---
title: "Get the latest installed .Net framework version"
style: "guide"
image: "../../../images/dotnet.jpg"
abstract: "Learn how to get the installed .net version on a machine"
date: "2018-06-15"
author: "ptrevino"
category: "infrastructure"
tags:
    - infrastructure
    - dotnet
    - framework
---

<div class="tldr" markdown="true">

  Question, what is the first thing you check before deploying to a production 
  environment?  

  If your answer was "What's the latest supported .Net version on the server?", 
  then congrats!!, you are on track and you can stop reading now!!   
  
  But if it wasn't, then keep reading...  

  If your team doesn't have full control over the production servers you use 
  (which, in my experience, is 90% of the time), then you have probably seen 
  this issue before. Your code is x number of versions ahead of the latest .Net version 
  installed on the server...  Bummer...

  Of course by the time you realize this, it's already too late... your code is live 
  and users of your app are already getting a nice `500 Internal Server Error` message...  

  So, how can you avoid this? Check the latest supported .Net version on the server 
  and update the target framework version on your solution...


</div>

<!-- start:abstract -->

### Steps
1. Hit `Ctrl + R`
2. In the run box, type `regexit.exe`
3. In the registry editor, open the following subkey: `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\NET Framework Setup\NDP`  
4. Based on the .Net Framework you want to support  
  4.1. For .Net Framework 4.5 and later  
    &emsp;&emsp;4.1.1. Open the entry `v4\Full`  
    &emsp;&emsp;4.1.2. Check for a DWORD value named Release. If it exists, then 
    .NET Framework 4.5 or newer has been installed on that computer.

  4.2. Anything else
    4.2.1. Open the corresponding .Net Framework version. (see references for more details)

### References
[How to: Determine which .NET Framework versions are installed](https://docs.microsoft.com/en-us/dotnet/framework/migration-guide/how-to-determine-which-versions-are-installed) 

