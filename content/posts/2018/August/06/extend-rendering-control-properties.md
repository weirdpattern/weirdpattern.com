---
title: "Customize a rendering instance using parameter templates and the mvc.renderRendering pipeline"
style: "post"
image: "../../../images/sitecore.jpg"
abstract: "Learn how to further customize a rendering using parameter templates and the mvc.renderRendering pipeline"
date: "2018-08-06"
author: "ptrevino"
category: "sitecore"
tags:
    - sitecore
    - template
    - rendering
    - parameter
    - editor 
    - editor options
---

<!-- start:abstract -->

I've always been amazed by how configurable and extensible Sitecore is. Every time 
I think I'm taming the beast, Sitecore just looks at me, smiles and reminds me 
I know nothing... Sitecore keeps me humble...  

This week I learned it is possible to have a more granular control over a rendering 
inside the presentation layer using a combination of `parameter templates` and 
the `mvc.renderRendering` pipeline. In my case I was looking for a way to invalidate 
the rendering's cache, but I only wanted to do it for specific pages while keeping 
the others intact. Thankfully, this combination was just what I needed.  

<!-- end:abstract -->

### Parameter templates and the Control Properties window

Parameter templates can be used to add new `presentation properties` to a rendering. 
These presentation properties can be updated in the control properties window which 
is accessible from both the `Presentation/Details` menu and the `Experience Editor`, 
so no matter what your preference is you can still make use of this.  

![Control Properties Window](./images/control-properties.png)
<center style="margin-top: -10px; margin-bottom: 20px"><span style="font-size: 10px;">The control properties window</span></center>  

It's important to understand that anything in this window affects only the currently 
active rendering (in other words, the instance of the rendering being updated), so 
even if you have two or more of instances of the same rendering in a page, the value 
will only be updated in the active one. This gives us an excellent customization point.  

### Creating parameter templates

Parameter templates are treated like any other template in Sitecore because they are 
basically templates inheriting from the `Standard Rendering Parameters` template, 
and while there is nothing stopping you from creating these in a different node, 
they are are usually stored in the same node as other templates (sitecore\Templates).  

![Standard Rendering Parameters](./images/template-creation.png)
<center style="margin-top: -10px; margin-bottom: 20px"><span style="font-size: 10px;">Template creation showing the standard rendering parameters</span></center>  

Add sections and properties to the newly created parameter template to complete it.  

![Template Builder](./images/template-builder.png)
<center style="margin-top: -10px; margin-bottom: 20px"><span style="font-size: 10px;">Template customization</span></center>  

### Adding a parameter template to a rendering 

Adding a parameter template to a rendering is as simple as selecting the rendering, 
opening the content editor on the right panel and setting the `Parameters Template` 
property value to the newly created template.  

![Assigning to Rendering](./images/rendering-setup.png)
<center style="margin-top: -10px; margin-bottom: 20px"><span style="font-size: 10px;">Use the Parameters Template to specify the desired template</span></center>  

### Adding the rendering to a page

Add the rendering to any page in the usual way and edit the rendering properties 
to open the control properties window.  

![Updating the page](./images/page-setup.png)
<center style="margin-top: -10px; margin-bottom: 20px"><span style="font-size: 10px;">Page setup</span></center>  

### Tying it all together

Last, but not least, use the `mvc.renderRendering` pipeline to apply any kind of 
customizations you want/need on your rendering. In my case, I'm reading the `Disable Caching` 
property to determine whether the rendering should set its cacheability property.  

Here is the code for the pipeline 

`gist:053e37fcb2137d82b7a8821ef972c73e?file=pipeline.cs`  

And here is the config patch file  

`gist:053e37fcb2137d82b7a8821ef972c73e?file=Z.MyCustom.Assembly.Caching.config`  

Hope this helps!