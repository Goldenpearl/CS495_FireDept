<?php
$emailSubject = 'Shift Reminder';
$sender = 'ytfscheduler@gmail.com';
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$body = <<<EOD
<br><hr><br>
Name: $name <br>
Email: $email <br>
Message: $message <br>
EOD;
$headers = "From: $sender\r\n";
$headers .= "Content-type: text/html\r\n";
$sucess = mail($sender, $emailSubject, $body, $headers);
$theResults = <<<EOD
EOD;
echo "$theResults";
?>