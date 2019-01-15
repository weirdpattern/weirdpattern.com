---
title: "Page loading optimization with defer and async scripts"
style: "snippet"
image: "../../../images/web.jpg"
abstract: "Learn how to optimize page loading times with deferred and asynchronous scripts."
date: "2019-01-09"
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
  good idea to optimize web pages. One of the most common and easiest ways to 
  achieve this level of optimization is by loading scripts asynchronously with 
  either `defer` or `async` attributes in the `script` tag.

  <!-- end:abstract -->  
</div>

### Syntax

`gist:9ed573e049cb01c4a47c391e846ac631#syntax.text`

### Explanation

Given the following code:  

`gist:9ed573e049cb01c4a47c391e846ac631#script1.js`
`gist:9ed573e049cb01c4a47c391e846ac631#script2.js`
`gist:9ed573e049cb01c4a47c391e846ac631#benchmark.html`

The **deferred script** can guarantee the message will be rendered correctly, 
because the `defer` attribute forces the browser to load the script in parallel 
without blocking the html rendering process (thus decreasing loading times) while 
holding off the script execution until the page has been fully loaded (thus 
ensuring the correct execution of the script, if the script depends on/uses the DOM).  

The **async script** cannot guarantee the message will be rendered correctly
because, unlike the `defer` attribute, the `async` attribute doesn't hold off the 
script execution. It still forces the browser to load the script in parallel 
without blocking the html rendering process, so if your code doesn't depend on 
the DOM then this option can be safely used.  

The **first inline block** won't render the message, because it's executed before 
the element even exists in the DOM.  

The **second inline block** will render the message, but it will block the rest of 
the page while it does it. This is why is a good idea to move all inline blocks 
to the end of the page... it will still block it, but at least the user will be 
able to see the html.  

The following graph shows the execution of each script.  

![Script loading](./images/loading-chart.jpg)  

See how easy is to improve loading times?  

Happy Coding!
