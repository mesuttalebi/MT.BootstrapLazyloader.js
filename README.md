# MT.BootstrapTabsLazyloader.js
Lazy Loader For Bootstrap Tabs

This package adds lazyloading option to bootstrap tabs, so every tab's content will load when the user clicks it.


#How To Use
##Install

If you use nuget package manager, write down this command in nuget package manager console

<code>Install-Package MT.BootstrapTabsLazyLoader.js</code>

This packages also depends on: <br />
Jquery >=2.0.0<br />
Bootstrap >=3.0.0<br />
FontAwsome >=4.2.0<br />

If you don't use nuget package manager, just download source code, and copy MT.BootstrapTabsLazyLoader.js into your scripts folder.


##Using
1- Add a reference to **/Scripts/MT.BootstrapTabsLazyLoader.js** to the scripts part of your code, after **jquery.js** and **bootstrap.js**

2- add class **.lazyloading** to nav-tabs (bootstrap tabs ul tag)

3- add **data-url** to the **anchor** tag of every tab you want to lazyload. this attribute will contain the url of partial pages you want to load it into the tab.
**Example**

    
    <!-- Nav tabs -->
    <ul class="nav nav-tabs lazyload">
        <li class="active"><a href="#fullDesc" data-toggle="tab">Description</a></li>
        <li><a href="#specificationDetails" data-toggle="tab">Specifications</a></li>
        <li><a href="#relatedProducts" data-toggle="tab" data-url="@Url.Action("relatedproducts", new { model.product.id})">Related Products</a></li>
        <li><a href="#files" data-toggle="tab" data-url="@Url.Action("getproductfiles", new { model.product.id })">Product Files</a></li>
        <li><a href="#videos" data-toggle="tab" data-url="@Url.Action("getproductvideos", new { model.product.id })">Product Videos</a></li>
    </ul>
    
