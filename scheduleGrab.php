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
	$sql = "call get_all_firefighters();";
	$result = openConnection($sql);
	if ($result->num_rows > 0) {
		mysqli_data_seek($result, 0);
			while($row = $result->fetch_assoc()) {
				$firefighterId = $row["firefighterId"];
				$firefighterFName = $row["firstName"];
				$firefighterLName = $row["lastName"];
				$firefighterEmail = $row["email"];
				$firefighterPhone = $row["phone"];
				$firefighterSecondaryPhone = $row["secondaryPhone"];
				$firefighterPhoneCarrier = $row["phoneProvider"];
				$firefighter = new Firefighter($firefighterId, $firefighterFName, $firefighterLName, $firefighterEmail, $firefighterPhone, $firefighterSecondaryPhone, $firefighterPhoneCarrier);
				array_push($firefighters, $firefighter); 
			}
	}
	return $firefighters;
}
function getAllScheduleTimeslotsBetween($startTime, $endTime){
	$timeslots = array();
	$result = openConnection("Call get_all_schedule_timeslots();");
	//var_dump($result);
	//$result = openConnection("get_all_schedule_timeslots_between(".$startTime.", ".$endTime.");");
	
	$timeslots;
	if ($result->num_rows > 0) {
		mysqli_data_seek($result, 0);
			while($row = $result->fetch_assoc()) {
				$startTime = $row['startTime'];
				$endTime = $row['endTime'];
				$timeslotId = $row['timeslotId'];
				$firefighterId = $row['firefighterId'];	
				$firstName = $row['firstName'];
				$lastName = $row['lastName'];
				$email = $row['email'];
				$phone = $row['phone'];
				$secondaryPhone =$row['secondaryPhone'];
				$carrier = $row['phoneProvider'];
				$scheduleTimeslotId= $row['scheduleTimeslotId'];
				$firefighter = new Firefighter($firefighterId, $firstName, $lastName, $email, $phone, $secondaryPhone, $carrier);
				$timeslot = new TimeSlot($timeslotId, $startTime, $endTime, $firefighter);
				$scheduleTimeslot = new ScheduleTimeslot($timeslot, $scheduleTimeslotId);
				array_push($timeslots, $scheduleTimeslot); 
		}
	}
	return $timeslots;
}


function getAllFirefightersToJSON(){
$firefighters = getAllFirefighters();
foreach($firefighters as $firefighter){
	echo $firefighter->getJSON()."<br> ";
}
}

function getAllScheduleToJSON(){
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
	echo getAllScheduleToJSON();
}
else if ($id==1){
	echo getAllFirefightersToJSON();
}
?>