
<?php

function createConnection(){
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
	return $conn;
}

function closeConnection($conn){
	$conn->close();
}

function getAutoIncrement(){
	$conn = createConnection();
	$sql = "SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'fireDept' AND TABLE_NAME = 'timeslot'";
	$result = $conn->query($sql);
	$row = $result->fetch_assoc();
	$auto = $row["AUTO_INCREMENT"];
	closeConnection($conn);
	return $auto;

}

function insertTimeslot($startDate, $endDate){
	$conn = createConnection();
	if(isDateTime($startDate)&& isDateTime($endDate))
	{	echo ("ok");
		$queryString = "INSERT INTO timeslot(startDate, endDate) VALUES(" .
		"'".
		$startDate.
		"'".
		", ".
		"'".
		$endDate.
		"'".
		"); ";
		$sql = $queryString;
		echo($queryString);
		if ($conn->query($sql) === TRUE) {
		echo "New record created successfully";
		} 	
		else {
		echo "Error: " . $sql . "<br>" . $conn->error;
		}
	}
	closeConnection($conn);
}

function isDateTime($datetime){
		$correctLength=19;
		$length = strlen($datetime);
		$firstDash = substr($datetime, 4,1);
		$secondDash = substr($datetime, 7,1);
		$firstColon = substr($datetime, 13,1);
		$secondColon = substr($datetime, 16,1);
		$spacebar = substr($datetime, 10,1);
		$numericYear = is_numeric(substr($datetime, 0,4));
		$numericMonth = is_numeric(substr($datetime, 5,2));
		$numericDay = is_numeric(substr($datetime, 8,2));
		$numericHour = is_numeric(substr($datetime, 11,2));
		$numericMinute = is_numeric(substr($datetime, 14,2));
		$numericSecond = is_numeric(substr($datetime, 17,2));
		$meetsSQLFormat = true;
		$meetsDateFormat = true;
		if($length!=$correctLength){
			$meetsSQLFormat = false;
			"invalid length";
		}
		if($firstDash!="-" || $secondDash!="-"){
			$meetsSQLFormat = false;
			echo "invalid dash";
		}
		if($firstColon!=":" || $secondColon!=":"){
			$meetsSQLFormat = false;
			echo "invalid colon";
		}
		if($spacebar != " "){
			$meetsSQLFormat = false;
			echo "invalid space";
		}
		if(!$numericYear || !$numericMonth || !$numericDay){
			$meetsSQLFormat = false;
			echo "invalid date";
		}
		if(!$numericHour || !$numericMinute || !$numericSecond){
			$meetsSQLFormat = false;
		echo "invalid time";
		}
		try{
			$type = new DateTime($datetime);
			$meetsDateFormat = true;
		}
		catch(Exception $e){
			$meetsDateFormat = false;
		}
		if(!$meetsDateFormat){
			echo("b");
		}
		return $meetsDateFormat && $meetsSQLFormat;
	}

$q = intval($_GET);
// Create connection
$f = getAutoIncrement();
echo($f);
insertTimeslot("2009-03-15 14:01:43", "2009-03-15 14:01:43");
/**
$sql = "INSERT INTO Fireman (firstname, lastname, age)
VALUES ('John', 'Doe', 22)";
*/

?>