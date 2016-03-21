<?php

$q = $_GET['q'];//intval($_GET['q']);
echo $q;
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fireDept";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$sql = "SELECT username from user";
$userResult = $conn->query($sql);
$sql2 = "SELECT password from user";
$passwordResult = $conn->query($sql2);
$conn->close();

echo "<script>";
echo "var userCorrect = false";
echo "var passwordCorrect = false";
echo "";
echo "</script>";

if ($userResult->num_rows > 0) {
    echo "<table><tr><th>Username</th></tr>";
    // output data of each row
    while($row = $userResult->fetch_assoc()) {
        {
		if($row["username"]==$q){
		echo "<tr><td>".$row["username"]."</td></tr>";
	}}
	}
    echo "</table>";
} else {
    echo "0 results";
}

{
echo "<p>hello</p>";
}
?>