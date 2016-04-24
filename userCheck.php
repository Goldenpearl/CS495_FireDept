<?php
include("dbconfig.php");
session_start();
if(!isset($_SESSION['login_user']))
{
	alert('Unauthorized to view page');
	header("Location: loginpage.php");
}
else
{
	$login_session=$_SESSION['login_user'];
	//header("Location: homepage.php");
}
?>