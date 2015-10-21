<!DOCTYPE html>
<html>
<head>
<style>
table {
    width: 100%;
    border-collapse: collapse;
}

table, td, th {
    border: 1px solid black;
    padding: 5px;
}

th {text-align: left;}
</style>
</head>
<body>

<?php
$q = intval($_GET['q']);
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
$sql = "SELECT firemanId, firstName, lastName, age FROM Fireman";
$result = $conn->query($sql);
$conn->close();

if ($result->num_rows > 0) {
    echo "<table><tr><th>ID</th><th>Name</th></tr>";
    // output data of each row
    while($row = $result->fetch_assoc()) {
        {
		if($row["firemanId"]==$q){
		echo "<tr><td>".$row["firemanId"]."</td><td>".$row["firstName"]." ".$row["lastName"]."</td></tr>";
	}}
	}
    echo "</table>";
} else {
    echo "0 results";
}
?>
</body>
</html>