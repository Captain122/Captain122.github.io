<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Tree
    </title>
    <link rel="stylesheet" href="system/bulma.css">
    <link rel="stylesheet" href="system/font-awesome.css">
    <script src="system/js/jquery.js"></script>
    <script src="system/js/jquery-migrate.js"></script>
    <script src="system/js/orna.js"></script>
    <script src="system/js/handlebars.js"></script>
    <script src="system/js/aes.js"></script>
    <script src="system/js/pass.js"></script>
    <script src="system/js/admin.js"></script>
    <!-- CSS3 --> 
    <style>
      *, html {
        font-family: Verdana, Arial, Helvetica, sans-serif;
      }
     form {
        margin: 0;
        padding: 0;
      }
      body {
        
        margin: 0;
        padding:20px;
        min-width:580px;
      }
      img {
        border: none;
      }
      p {
        font-size: 1em;
        margin: 0 0 1em 0;
      }
      form{
        text-align: center;
      }
      h2{
        text-align: center;
      }
      ol.tree {
        padding: 0 0 0 30px;
        width: 300px;
      }
      li {
        position: relative;
        margin-left: -15px;
        list-style: none;
      }
      li.file {
        margin-left: -1px !important;
      }
      li.file a {
        background: url(system/img/document.png) 0 2px no-repeat;
        color: #fff;
        padding-left: 21px;
        text-decoration: none;
        display: block;
      }
      li.file a:hover {
        color: #aff;
        text-decoration: underline;
      }
      li.toggle {
        background: url(system/img/folder-horizontal.png) 15px 1px no-repeat;
        cursor: pointer;
        padding-left: 37px;
      }
      li.file [href*='.pdf']	{
        background: url(system/img/document-pdf.png) 0 0 no-repeat;
      }
      li.file [href*='.htm'], 
      li.file [href*='.html']	{
        background: url(system/img/document-html.png) 0 3px no-repeat;
      }
      li.file [href*='.txt'] {
        background: url(system/img/document-txt.png) 0 3px no-repeat;
      }
      li.file [href*='.zip'],
      li.file [href*='.gz'] {
        background: url(system/img/document-zip.png) 0 3px no-repeat;
      }
      li.file [href$='.jpg'],
      li.file [href$='.gif'],
      li.file [href$='.ico']	{
        background: url(system/img/document-jpg.png) 0 2px no-repeat;
      }
      li.file [href$='.png']	{
        background: url(system/img/document-png.png) 0 2px no-repeat;
      }
      li.file [href$='.css']	{
        background: url(system/img/document-css.png) 0 2px no-repeat;
      }
      li.file [href$='.js']	{
        background: url(system/img/document-js.png) 0 2px no-repeat;
      }
      li.file [href$='.php']	{
        background: url(system/img/document-php.png) 0 4px no-repeat;
      }
      li input {
        position: absolute;
        left: 0;
        margin-left: 0;
        opacity: 0;
        z-index: 2;
        cursor: pointer;
        height: 1em;
        width: 1em;
        top: 0;
      }
      li input + ol {
        background: url(system/img/toggle-small-expand.png) 5px -3px no-repeat;
        margin: -0.938em 0 0 -44px;
        /* 15px */
        height: 1em;
      }
      li input + ol > li {
        display: none;
        margin-left: -14px !important;
        padding-left: 1px;
      }
      li input:checked + ol {
        background: url(system/img/toggle-small.png) 5px 2px no-repeat;
        margin: -1.25em 0 0 -44px;
        /* 20px */
        padding: 1.563em 0 0 80px;
        height: auto;
      }
      li input:checked + ol > li {
        display: block;
        margin: 0 0 0.125em;
        /* 2px */}
      li input:checked + ol > li:last-child {
        margin: 0 0 0.063em;
        /* 1px */ }
        .wrapper{
            height: 300px;
            overflow: auto;
            background-color: #616161;
            color: #fff;
            padding: 10px;
        }
    </style> 
  </head> 
 <body>
<div id="mainNest"></div> 
    <script id="adminTemplate" type="text/x-handlebars-template">
    
    <div class="wrapper">
    <?php
$path = ".";
function createDir($path = '.')
{	
if ($handle = opendir($path)) 
{
echo '<ol class="tree">';
while (false !== ($file = readdir($handle))) 
{
if (is_dir($path.$file) && $file != '.' && $file !='..')
printSubDir($file, $path, $queue);
else if ($file != '.' && $file !='..')
$queue[] = $file;
}
printQueue($queue, $path);
echo "</ol>";
}
}
function printQueue($queue, $path)
{
foreach ($queue as $file) 
{
printFile($file, $path);
} 
}
function printFile($file, $path)
{
echo "<li class=\"file\"><a href=\"".$file."\">$file</a></li>";
}
function printSubDir($dir, $path)
{
echo "<li class=\"toggle\">$dir<input type=\"checkbox\">";
createDir($path.$dir."/");
echo "</li>";
}
createDir($path);
?>
   </div>
   <br>
    <h2>
      <p>
        <b> Uploading files 
        </b>
      </p>
    </h2>
    <form action="upload.php" method="post" enctype="multipart/form-data">
      <br>
      <input type="file" name="filename"  >
      <br> 
      <br> 
      <br> 
      <input type="submit" value="Upload" class="button">
      <br>
    </form>
    <br>
    <h2><a class="button is-primary is-active" href="admin.html">
     <span class="icon"><i class="fa fa-tachometer" aria-hidden="true"></i></span>
      <span>Admin</span>
    </a>  
    </h2>
  
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
        </script>
  <script id="passTemplate" type="text/x-handlebars-template">
      <br>
    <br>
    <br>
    <div class="columns">
        <div class="column"> </div>
        <h1 class="subtitle is-2 textincenter animated swing">Nest</h1>
        <div class="column"> </div>
    </div>
    <div class="columns">
        <div class="column"> </div>
        <p class="control">
            <input class="input is-info" type="password" placeholder="Password" id="pass"> </p> <a class="button is-info is-active" onclick="checkPass()">Enter</a>
        <div class="column"> </div>
    </div>
    <div class="columns">
        <div class="column"> </div>
        <div class="column"> <p class="control"> <a class="button is-info is-warning" onclick="hidePass()">HidePass</a> </p>
        
    <br><br>
     <article class="message is-info">
  <div class="message-header">
    Info
  </div>
  <div class="message-body">
 <a href="https://2ip.ru/" target="_blank" title="Узнай свой IP адрес"><img src="https://2ip.ru/sbar/2ip1.gif" alt="Узнай свой IP адрес"/></a>
  </div>
</article>
 
     
    
      </div>
       
        <div class="column"> </div>
    </div>
    <br>
    <p class="textincenter">ornaorg2016@gmail.com <br> 2016</p>
</script>
 </body>
</html> 
