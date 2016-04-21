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
		//echo "<br>New record created successfully<br>";
		return true;
	} 	
	else 
	{
		echo "Error: " . $queryString . "<br>" . $conn->error;
		return false;
	}
	closeConnection($conn);
}

function insertScheduleTimeslot($schedule_timeslot){
		$timeslot = $schedule_timeslot->getTimeslot();
		$firemanId = $timeslot->getFirefighter()->getId();
		$startDate = $timeslot -> getStartTime();
		$endDate = $timeslot -> getEndTime();
		$queryString = "call schedule_timeslot_insert('".$startDate."','".$endDate."',".$firemanId.");";
		return executeQueryString($queryString);
}

function insertFirefighter($firstName, $lastName, $email, $phone, $secondaryPhone, $provider){

	$queryString = "call firefighter_insert(" .
	"'".
	$firstName.
	"'".
	", ".
	"'".
	$lastName.
	"'".
	", ".
	"'".
	$email.
	"'".
	", ".
	"'".
	$phone.
	"'".
	", ".
	"'".
	$secondaryPhone.
	"'".
	", ".
	"'".
	$provider.
	"'".
	"); ";
	$successfulFirefighterInsert = executeQueryString($queryString);
	return "Firefighter:<br> FirstName:".$firstName."<br> Last Name: ".$lastName."<br>Successful:".$successfulFirefighterInsert."<br><br>";
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

if($id == "0")
{
	$firefighter_json = $_REQUEST["firefighter_json"];
	$firefighter = Firefighter::getFirefighterFromJson($firefighter_json);
	$fname = $firefighter -> getFirstName();
	$lname = $firefighter -> getLastName();
	$email = $firefighter -> getEmail();
	$phone = $firefighter -> getPhone();
	$secondaryPhone = $firefighter ->getSecondaryPhone();
	$carrier = $firefighter ->getCarrier();
	echo insertFirefighter($fname, $lname, $email, $phone, $secondaryPhone, $carrier);
}
else
{
	$schedule_timeslot_json = $_REQUEST["schedule_timeslot_json"];
	$schedule_timeslot = ScheduleTimeslot::getScheduleTimeslotFromJson($schedule_timeslot_json);
	echo insertScheduleTimeslot($schedule_timeslot);
}
?>