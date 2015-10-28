<?php
$q = intval($_GET);
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
echo "<select id='fireman_select' onchange='showUser(this.value)'>";
if ($result->num_rows > 0) {
	mysqli_data_seek($result, 0);
    while($row = $result->fetch_assoc()) {
		echo "<option value= '". $row['firemanId']."'>".$row["firstName"]." ".$row["lastName"]."</option>";
    }
    echo "</table>";
} else {
    echo "0 results";
}	
echo "</select><br><br>";
?>