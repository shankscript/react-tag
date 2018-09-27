<?php

try {
  $response = file_get_contents($_GET["url"]);
  echo $response;
}

//catch exception
catch(Exception $e) {
  echo 'Message: ' .$e->getMessage();
}


echo 'done';

?>