
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

function createDateTime($date, $time){
	$dateTime = $date." ".$time.":00";
	if(empty($date) || empty($time))
		return "empty";
	else if(isDateTime($dateTime))
		return $dateTime;
	else return "invalid dateTime";
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
	{
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

function insertScheduleTimeslot($timeslotId, $firemanId){
	if(isValidTimeslotId($timeslotId) && isValidFiremanId($firemanId))
	{
		$conn = createConnection();
		$queryString = "INSERT INTO ScheduleTimeSlot(timeslotId, firemanId) VALUES (".$timeslotId.",".$firemanId.");";
		$sql= $queryString;
		echo($queryString);
		if ($conn->query($sql) === TRUE) {
		echo "New record created successfully";
		} 	
		else {
		echo "Error: " . $sql . "<br>" . $conn->error;
		}
		closeConnection($conn);
	}
}
function insertAvailibleTimeslot($timeslotId, $firemanId){
		if(isValidTimeslotId($timeslotId) && isValidFiremanId($firemanId))
	{
		$conn = createConnection();
		$queryString = "INSERT INTO AvailibleTimeSlot(timeslotId, firemanId) VALUES (".$timeslotId.",".$firemanId.");";
		$sql=$queryString;
		echo($queryString);
		
		if ($conn->query($sql) === TRUE) {
		echo "New record created successfully";
		} 	
		else {
		echo "Error: " . $sql . "<br>" . $conn->error;
		}
		closeConnection($conn);
	}
}

function isValidFiremanId($id){
	return true;
}

function isValidTimeslotId($id){
	return true;
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
			//"invalid length";
		}
		if($firstDash!="-" || $secondDash!="-"){
			$meetsSQLFormat = false;
			//echo "invalid dash";
		}
		if($firstColon!=":" || $secondColon!=":"){
			$meetsSQLFormat = false;
			//echo "invalid colon";
		}
		if($spacebar != " "){
			$meetsSQLFormat = false;
			//echo "invalid space";
		}
		if(!$numericYear || !$numericMonth || !$numericDay){
			$meetsSQLFormat = false;
			//echo "invalid date";
		}
		if(!$numericHour || !$numericMinute || !$numericSecond){
			$meetsSQLFormat = false;
		//echo "invalid time";
		}
		try{
			$type = new DateTime($datetime);
			$meetsDateFormat = true;
		}
		catch(Exception $e){
			$meetsDateFormat = false;
		}
		if(!$meetsDateFormat){
			//echo("b");
		}
		return $meetsDateFormat && $meetsSQLFormat;
	}

$q = intval($_GET);
//$query = $_GET['q'];
$firemanId = $_GET['firemanId'];
$startTime = $_GET['startTime'];
$endTime = $_GET['endTime'];
$date = $_GET['date'];
// Create connection
$f = getAutoIncrement();
echo("<br><br>");
echo("Fireman Id: ".$firemanId);
echo("<br><br>");
echo("Start Time: ".$startTime."<br><br>");
echo("End Time: ".$endTime."<br><br>");
echo("Date: ".$date);
echo("<br><br>");
echo(createDateTime($date, $startTime));
$startDateTime = createDateTime($date, $startTime);
$endDateTime = createDateTime($date, $endTime);
if(isDateTime($startDateTime) && isDateTime($endDateTime))
{
	insertTimeslot($startDateTime, "2009-03-15 14:01:43");
	echo "<br><br>";
	insertAvailibleTimeslot(0, $firemanId);
	echo"<br><br>";
	insertScheduleTimeslot(0, $firemanId);
	echo"<br><br>";
}
z
else
	echo("no");
/**
$sql = "INSERT INTO Fireman (firstname, lastname, age)
VALUES ('John', 'Doe', 22)";
*/

?>