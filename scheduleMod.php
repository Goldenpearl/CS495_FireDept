<?php
require "classes.php";

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
function executeQueryString($queryString)
{
	$conn = createConnection();
	if ($conn->query($queryString) === TRUE) 
	{
		echo "New record created successfully";
		return true;
	} 	
	else 
	{
		echo "Error: " . $queryString . "<br>" . $conn->error;
		return false;
	}
	closeConnection($conn);
}


function insertScheduleTimeslot($timeslotId, $firemanId){
	if(isValidTimeslotId($timeslotId) && isValidFiremanId($firemanId))
	{
		$queryString = "INSERT INTO ScheduleTimeSlot(timeslotId, firemanId) VALUES (".$timeslotId.",".$firemanId.");";
		executeQueryString($queryString);
	}
}


function insertTimeslot($startDate, $endDate){
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
		executeQueryString($queryString);
	}
}


function insertFirefighter($firstName, $lastName){

	$queryString = "INSERT INTO fireman(firstName, lastName, age) VALUES(" .
	"'".
	$firstName.
	"'".
	", ".
	"'".
	$lastName.
	"'".
	", 15); ";
	executeQueryString($queryString);
	
}

function isValidFiremanId($id){
	return true;
}

function isValidTimeslotId($id){
	return true;
}

function isDateTime($dateTime){
	return true;
}


$id = $_REQUEST["id"];
if($id == 1){
	$firefighter_json = $_REQUEST["firefighter_json"];
	$firefighter = Firefighter::getFirefighterFromJson($firefighter_json);
	$fname = $firefighter -> getFirstName();
	$lname = $firefighter -> getLastName();
	//echo "<br>";
	//echo $firefighter->getFirstName();
	////echo $firefighter->getLastName();
	//insertFirefighter($fname, $lname);
}
else if($id ==2)
{
	echo "no";
}
else{
	echo "b";
}

?>