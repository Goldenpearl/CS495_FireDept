<?php
include("dbconfig.php");
if($_SERVER["REQUEST_METHOD"] == "POST")
{
// username and password
$username=mysqli_real_escape_string($dbconfig,$_POST['email']);
$password=mysqli_real_escape_string($dbconfig,$_POST['p']);
$fName=mysqli_real_escape_string($dbconfig,$_POST['fName']);
$lName=mysqli_real_escape_string($dbconfig,$_POST['lName']);
$number=mysqli_real_escape_string($dbconfig,$_POST['number']);
$provider = mysqli_real_escape_string($dbconfig.$_POST['provider'])
if($password != "")
{
$password=hash('sha512',$password);
// get correct tablename
$sql2="Insert into firefighter(firstName, lastName, phoneNumber, email, phoneprovider) values('$fName','$lName', '$number','$email','$provider)";
$result2=mysqli_query($dbconfig,$sql2);
//get correct tablename
$sql="Insert into MyUser(pass) values('$password')";
$result=mysqli_query($dbconfig,$sql);
$msg="Registration Successfully";

header("location: loginpage.php");
}
else
{
	echo "<p> An Error has Occured </p>";
}
}
?>