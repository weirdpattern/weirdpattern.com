---
title: "Calculating values in css with calc"
style: "snippet"
image: "../../../images/web.jpg"
abstract: "Learn how to use the calc function to do basic arithmetic operations in css."
date: "2019-01-14"
author: "ptrevino"
category: "web"
tags:
    - web
    - css
    - features
    - calc
---

<!-- start:abstract -->

### Syntax

`gist:a11ff7bd49f7e5b5a24d2a2cc48554d3#syntax.text`

| Option         | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| **expression** | A mathematical expression, the result of which is used as the value. |

<!-- end:abstract -->  

### Example

`gist:a11ff7bd49f7e5b5a24d2a2cc48554d3#example.html`

### Output

<style type="text/css">
	.container {
    width: calc(100% - 50px);
    background-color: #CDEBC4;
    color:#6D8B64;
    text-align: center;
    padding: 25px 0;
    margin: 0 auto;
	}  
</style>

<div class="container">
  This div has a width of 100% - 50px
</div>

### References

calc\(\) \([https://developer.mozilla.org/en-US/docs/Web/CSS/calc](https://developer.mozilla.org/en-US/docs/Web/CSS/calc)\)
