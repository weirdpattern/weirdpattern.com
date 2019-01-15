---
title: "Pointer accuracy detection with pointer and any-pointer media features"
style: "snippet"
image: "../../../images/web.jpg"
abstract: "Learn how to use the pointer and any-pointer media features to better support devices with limited pointer accuracy."
date: "2019-01-11"
author: "ptrevino"
category: "web"
tags:
    - web
    - css
    - media
    - pointer
    - mobile
---

<!-- start:abstract -->

### Syntax

`gist:ce5644266832541e7e1368be706a9eb8#syntax.text`

| Option | Description                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------- |
| none   | Use when the primary input mechanism of the device does not include a pointing device             |
| coarse | Use when the primary input mechanism of the device includes a pointing device of limited accuracy |
| fine   | Use when the primary input mechanism of the device includes an accurate pointing device (mouse)   |

<!-- end:abstract -->  

For devices that support multiple input mechanisms, such as computers with 
touchscreen support (e.g. Microsoft Surface devices), `pointer` will only 
consider the primary input mechanism. The `any-pointer` media feature can help 
in those cases as it detects all input mechanisms in the device. 

### Example

`gist:ce5644266832541e7e1368be706a9eb8#example.html`

### Output

<style type="text/css">
	.container {
	  margin-top: 0px;
	}

  .container > span {
    display: block;
  }

  @media (pointer: fine) {
	  .container > span:after {
      content: "A high accuracy device has been detected!";
    }
	}

	@media (pointer: coarse) {
    input[type="checkbox"], 
	  input[type="radio"] {
			min-width:60px;
			min-height:70px;
			background:transparent;
	  }

    .container > span {
      font-size: 3em;
    }

    .container > span:after {
      content: "A limited accuracy device has been detected! Increasing size."
    }
	}
</style>

<div class="container">
  <span></span>
  <input type="checkbox">
  <input type="radio">
</div>
