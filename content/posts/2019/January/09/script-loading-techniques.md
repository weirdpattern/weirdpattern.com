---
title: "Page loading optimization with defer and async scripts"
style: "guide"
image: "../../../images/web.jpg"
abstract: "Learn how to optimize page loading times with deferred and asynchronous scripts."
date: "2018-11-28"
author: "ptrevino"
category: "web"
tags:
    - web
    - script
    - javascript
    - defer
    - async
    - optimization    
---

<div class="tldr" markdown="true">
  <!-- start:abstract -->

  Loading time is a major contributing factor to page abandonment. The average
  user has no patience for a page that takes too long to load, so it's always a 
  good idea to optimize our pages. One of the most common and easiest ways to 
  achieve this optimization is by loading scripts asynchronously with 
  either `<script defer>` or `<script async>`.

  <!-- end:abstract -->  
</div>
  
### Syntax

`gist:#syntax.text`

### Explanation

Given the following code:  

`gist:#example.html`

The **deferred script** can guarantee the message will be rendered correctly at the
end of the execution cycle, because the `defer` attribute forces the browser to load 
the script in parallel without blocking the html rendering process (thus increasing 
loading times) while holding off the script execution until the page has been 
fully loaded (thus ensuring the correct execution of the script, if the script 
depends on/uses the DOM).  

The **async script** cannot guarantee the message will be rendered correctly at the 
end of the execution cycle because, unlike the `defer` attribute, the `async` attribute 
doesn't hold off the script execution. It still forces the browser to load the 
script in parallel without blocking the html rendering process, so if your code 
doesn't depend on the DOM then this option can be safely used.  

The **first inline block** won't render the message, because it's executed before 
the element even exists in the DOM.  

The **second inline block** will render the message, but it will block the rest of 
the page while it does it. This is why is a good idea to move all inline blocks 
to the end of the page... it will still block it, but at least the user will be 
able to see the html.  
