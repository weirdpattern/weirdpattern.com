---
title: "Adding content via css content/attr function"
style: "snippet"
image: "../../../images/web.jpg"
abstract: "Learn how to use the attr function to extract information from the html and use it as content in css."
date: "2019-01-16"
author: "ptrevino"
category: "web"
tags:
    - web
    - css
    - features
    - attr
    - content
---

<!-- start:abstract -->

### Syntax

`gist:2bb448a481028531f6d783260f0cbcda#syntax.text`

| Option        | Description                                               |
| ------------- | --------------------------------------------------------- |
| **attribute** | The name of the attribute to be used to populate content. |

<!-- end:abstract -->  

### Example

`gist:2bb448a481028531f6d783260f0cbcda#example.html`

### Output

<style type="text/css">
	.simple:before {
    content: attr(message) ", I'm a div with a 'message' attribute";
	}  

  .data-based:before {
    content: attr(data-message) ", I'm a div with a 'data-message' attribute";
  }
</style>

<div class="simple" message="Hello there"></div>
<div class="data-based" data-message="Hello there"></div>

### References

content and attr\(\) \([https://developer.mozilla.org/en-US/docs/Web/CSS/content](https://developer.mozilla.org/en-US/docs/Web/CSS/content)\)
