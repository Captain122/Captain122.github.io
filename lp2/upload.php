<html>
<head>
  <title>File Loader</title>
  <link rel="stylesheet" href="system/bulma.css">
<link rel="stylesheet" href="system/font-awesome.css">
</head>
<style>
    body{
        padding: 10px;
    }
    h2{
        text-align: center;
    }
</style>
<body>
<?php
    $dir_name = "LoadedFiles";
    $max_file_size =20000000; //20000000 = 20MB
     echo "<br><br>";
 echo "File size: ".$_FILES["filename"]["size"];
    echo "<br><br><br>";
    
   if($_FILES["filename"]["size"] > $max_file_size)
   {
     echo ("<div class='notification is-warning'>File size more than maximum!</div>");
     exit;
   }
  
   if(is_uploaded_file($_FILES["filename"]["tmp_name"]))
   {
       if(!is_dir ($dir_name)){
     mkdir("LoadedFiles", 0777);
       }
     move_uploaded_file($_FILES["filename"]["tmp_name"], $dir_name."/".$_FILES["filename"]["name"]);
    echo("<div class='notification is-success'>Loaded successfully!</div>");
   } else {
      echo("<div class='notification is-danger'>Loading error!</div>");
   }
?>
<br>
<h2><a class="button is-primary is-active" href="admin.html">
     <span class="icon"><i class="fa fa-tachometer" aria-hidden="true"></i></span>
      <span>Admin</span>
    </a>   <a class="button" href="tree.php"> <span class="icon">
    <i class="fa fa-file"></i>
  </span> <span>File Tree</span> </a></h2>
<br>
</body>
</html>