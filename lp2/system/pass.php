<?php

$file1 = "newinfo.json";
$fileHandle1 = fopen($file1, 'w') or die("Error opening file");
if(isset($_POST)){
fwrite($fileHandle1, '{"password":"'.$_POST['text'].'"}');
//echo $_POST;
//unlink('info.json'); 
$file2 = "info.json";
$fileHandle2 = fopen($file2, 'w') or die("Error opening file");
fwrite($fileHandle2, '{"password":}');

}
    
    
    
    
    
    



?>