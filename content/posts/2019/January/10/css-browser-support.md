---
title: "Detect browser support for specific CSS features"
style: "guide"
image: "../../../images/web.jpg"
abstract: "Learn how to detect browser support for specific CSS features."
date: "2019-01-10"
author: "ptrevino"
category: "web"
tags:
    - web
    - css
    - browser
    - support
---

<!-- start:abstract -->

### Syntax

`gist:35b7f97df5f6e6fd0f8ebcaaa06cfab5#syntax.text`

| Option                 | Description                 |
| ---------------------- | --------------------------- |
| **supports-condition** | The feature to be evaluated |

<!-- end:abstract -->  

### Example

`gist:35b7f97df5f6e6fd0f8ebcaaa06cfab5#example.html`

### Output

<style>
  .support-font-size-adjust {
      width: 22px;
      display:inline-block; 
    }

  .support-font-size-adjust:after {
    content: '\274C';
    font-size: 12px;
  }
  
  .support-flexbox {
      width: 22px;
      display:inline-block; 
      padding-left: 3px
    }

  .support-flexbox:after {
    content: '\274C';
  }

  @supports(font-size-adjust) {
    .support-font-size-adjust:after {
      content: '\2713';
    }
  }
  
  @supports(display:flex) {
    .support-flexbox:after {
      content: '\2713';
    }
  }
</style>

<span class="support-font-size-adjust"></span>Supports 'font-size-adjust'  
<span class="support-flexbox"></span>Supports 'flexbox'
