<?php
require "classes.php";
function openConnection($queryString){
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
	$sql = $queryString;
	$result = $conn->query($sql);
	$conn->close();
	return $result;
}

function getAllFirefighters(){
	$q = intval($_GET);
	$firefighters = array();
	$sql = "SELECT firemanId, firstName, lastName, age FROM Fireman";
	$result = openConnection($sql);
	if ($result->num_rows > 0) {
		mysqli_data_seek($result, 0);
			while($row = $result->fetch_assoc()) {
				$firefighterId = $row['firemanId'];
				$firefighterFName = $row["firstName"];
				$firefighterLName = $row["lastName"];
				$firefighterAge = $row["age"];
				$firefighter = new Firefighter($firefighterId, $firefighterFName, $firefighterLName, $firefighterAge);
				array_push($firefighters, $firefighter); 
			}
	}
	return $firefighters;
}
function getAllScheduleTimeslotsBetween($startTime, $endTime){
	$timeslots = array();
	$result = openConnection("
	SELECT scheduleTimeslotId, fireman.firemanId, fireman.firstName, fireman.lastName, fireman.age, timeslot.startDate, timeslot.endDate, timeslot.timeslotId
	FROM scheduleTimeslot
	JOIN (fireman, timeslot)
	ON (scheduleTimeslot.firemanId=fireman.firemanId AND scheduleTimeslot.timeslotId=timeslot.timeslotId);");
	$timeslots;
	if ($result->num_rows > 0) {
		mysqli_data_seek($result, 0);
			while($row = $result->fetch_assoc()) {
				$startTime = $row['startDate'];
				$endTime = $row['endDate'];
				$timeslotId = $row['timeslotId'];
				$firefighterId = $row['firemanId'];	
				$firstName = $row['firstName'];
				$lastName = $row['lastName'];
				$age = $row ['age'];
				$scheduleTimeslotId= $row['scheduleTimeslotId'];
				$firefighter = new Firefighter($firefighterId, $firstName, $lastName, $age);
				$timeslot = new TimeSlot($timeslotId, $startTime, $endTime, $firefighter);
				$scheduleTimeslot = new ScheduleTimeslot($timeslot, $scheduleTimeslotId);
				array_push($timeslots, $scheduleTimeslot); 
		}
	}
	return $timeslots;
}

function testGetAllFirefighters(){
$firefighters = getAllFirefighters();
foreach($firefighters as $firefighter){
	echo "Firefighter ";
	echo $firefighter->getId();
	echo"<br>";
	echo $firefighter->getFirstName();
	echo " ";
	echo $firefighter->getLastName();
	echo "<br> Age ";
	echo $firefighter->getAge();
	echo "<br><br>";
}
}
function testGetAllScheduleTimeslots(){
	$scheduleTimeslots = getAllScheduleTimeslotsBetween(1, 2);
	foreach($scheduleTimeslots as $scheduleTimeslot){
	echo "<br>ScheduleTimeslotId: ";
	echo $scheduleTimeslot->getScheduleTimeslotId();
	echo "<br> Timeslot id: ";
	echo $scheduleTimeslot->getTimeslot()->getTimeslotId();
	echo "<br>Start Time: ";
	echo $scheduleTimeslot->getTimeslot()->getStartTime();
	echo "<br>End Time: ";
	echo $scheduleTimeslot->getTimeslot()->getEndTime();
	echo "<br> Firefighter : ";
	echo $scheduleTimeslot->getTimeslot()->getFirefighter()->getFirstName()." ";
	echo $scheduleTimeslot->getTimeslot()->getFirefighter()->getLastName();
	echo "<br>";
	}
	}
function testGetAllFirefightersToJSON(){
$firefighters = getAllFirefighters();
foreach($firefighters as $firefighter){
	echo $firefighter->getJSON()."<br> ";
}
}

function testGetAllScheduleToJSON(){
	$timeslots = getAllScheduleTimeslotsBetween(2,2);
	$len = count($timeslots);
	//echo "{";
	for($n=0; $n<count($timeslots); $n++){
		echo $timeslots[$n]->getJSON();
		//if($n<count($timeslots)-1){
			//echo ",";
		//}
		echo"<br>";
	}
	//echo "}";
}

$id = $_REQUEST["id"];
if($id == 0){
	echo testGetAllScheduleToJSON();
}
else if ($id==1){
	echo testGetAllFirefightersToJSON();
}
else
{
testGetAllFirefighters();
testGetAllScheduleTimeslots();
testGetAllFirefightersToJSON();
testGetAllScheduleToJSON();
}
?>