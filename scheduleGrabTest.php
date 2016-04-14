<?php
require "scheduleGrab.php"

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


testGetAllFirefighters();
testGetAllScheduleTimeslots();
testGetAllFirefightersToJSON();
testGetAllScheduleToJSON();


?>