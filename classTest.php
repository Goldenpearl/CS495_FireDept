
<?php
require "classes.php";

function createAFirefighterPHP(){
	$firstName = "B";
	$lastName = "Gatorade";
	$age = 20;
	$id = 3;
	$firefighter = new Firefighter($id, $firstName, $lastName, $age);
	return $firefighter;
}

function createATimeslotPHP(){
	$timeslotId =3;
	$startTime = getAStartDate();
	$endTime = getAnEndDate();
	$firefighter = createAFirefighterPHP();
	$timeslot = new Timeslot($timeslotId, $startTime, $endTime, $firefighter);
	return $timeslot;
}

function createAScheduleTimeslotPHP(){
	$timeslot = createATimeslotPHP();
	$id = 4;
	$scheduleTimeslot = new ScheduleTimeslot($timeslot, $id);
	return $scheduleTimeslot;
}


function getAStartDate(){
	return "2015-10-24 20:00:00";
}

function getAnEndDate(){
	return "2015-10-24 22:00:00";
}

function testClassCreation(){
	$firefighter = createAFirefighterPHP();
	$timeslot = createATimeslotPHP();
	$scheduleTimeslot =createAScheduleTimeslotPHP();
	
	$content = "".
	("Created a firefighter. <br>".$firefighter->getSummary()."<br>").
	("To JSON: <br>".$firefighter->getJSON()."<br><br>").
	("Created a timeslot. <br>".$timeslot->getSummary()."<br>").
	("To JSON: <br>".$timeslot->getJSON()."<br><br>").
	("Created a schedule timeslot. <br>".$scheduleTimeslot->getSummary()."<br>").
	("To JSON: <br>".$scheduleTimeslot->getJSON()."<br><br>");
	return $content;
}

function getFirefighterJSJson(){
	return '{"Firefighter":{"firefighterId":"1", "firstName":"FirstName", "lastName":"LastName"}}';
}

function getTimeslotJSJson(){
	return '{"Timeslot": {"startTime":"Mon Apr 11 2016 16:21:30 GMT-0400 (Eastern Daylight Time)", "endTime":"Mon Apr 11 2016 19:21:30 GMT-0400 (Eastern Daylight Time)", "timeslotId":"2", "Firefighter":{"firefighterId":"1", "firstName":"FirstName", "lastName":"LastName"}}}';
	
}

function getScheduleTimeslotJSJson(){
	return '{"ScheduleTimeslot": {"scheduleTimeslotId": "2", "Timeslot": {"startTime":"Mon Apr 11 2016 16:21:30 GMT-0400 (Eastern Daylight Time)", "endTime":"Mon Apr 11 2016 19:21:30 GMT-0400 (Eastern Daylight Time)", "timeslotId":"2", "Firefighter":{"firefighterId":"1", "firstName":"FirstName", "lastName":"LastName"}}}}';

}

function createPHPClassesFromJS(){
	$firefighter = Firefighter::getFirefighterFromJSON(getFirefighterJSJson());
	$timeslot = Timeslot::getTimeslotFromJSON(getTimeslotJSJson());
	$scheduleTimeslot = ScheduleTimeslot::getScheduleTimeslotFromJSON(getScheduleTimeslotJSJson());
	
	$content = "".
	//("Created a JSON firefighter. <br>".$firefighter->getSummary()."<br>").
	("Old JSON <br>".getFirefighterJSJson()."<br><br>").
	("To PHP JSON: <br>".$firefighter->getJSON()."<br><br>").
	//("Created a JSON timeslot. <br>".$timeslot->getSummary()."<br>").
	("Old JSON <br>". getTimeslotJSJson()."<br><br>").
	("To PHP JSON: <br>".$timeslot->getJSON()."<br><br>").
	//("Created a JSON schedule timeslot. <br>".$scheduleTimeslot->getSummary()."<br>").
	("Old JSON: <br>".getScheduleTimeslotJSJson()."<br><br>").
	("To PHP JSON: <br>".$scheduleTimeslot->getJSON()."<br><br>");
	return $content;
}

echo (
//testClassCreation()."<br>".
createPHPClassesFromJS());
?>