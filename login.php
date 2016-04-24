
<?php
include("dbconfig.php");
session_start();
if($_SERVER["REQUEST_METHOD"] == "POST")
{
// username and password received from loginform
$username=mysqli_real_escape_string($dbconfig,$_POST['email']);
$password=mysqli_real_escape_string($dbconfig,$_POST['p']);
$password= hash('sha512', $password);//convert into md5 encrypted password
$sql_query="SELECT userId FROM userTable3 WHERE email='$username' and password='$password'";
$result=mysqli_query($dbconfig,$sql_query);
$row=mysqli_fetch_array($result,MYSQLI_ASSOC);
$count=mysqli_num_rows($result);// If result matched $username and $password, table row must be 1 row
if($count==1)
{
$_SESSION['login_user']=$username;
echo "sessionStorage.email = ". $username;
header("location: userCheck.php");
}
else
{
header("location: loginpage.php");
$error="Username or Password is invalid";
}
}
?>

