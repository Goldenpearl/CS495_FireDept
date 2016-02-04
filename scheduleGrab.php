<?php

class Firefighter {
	private $age = 0;
	private $fName = "";
	private $lName = "";
	private $id = 0;
	
	function __construct($id, $fName, $lName, $age){
		$this->age = $age;
		$this->fName=$fName;
		$this->lName=$lName;
		$this->id = $id;
	}
	
	public function getFirstName(){
		return $this->fName;
	}
	
	public function getLastName(){
		return $this ->lName;
	}
	
	public function getId(){
		return $this ->id;
	}
	public function getAge(){
		return $this->age;
	}
}

class Timeslot{
	private $startTime;
	private $endTime;
	private $firefighterId;
	private $timeslotId;
	
	function __construct($timeslotId, $startTime, $endTime, $firefighterId){
		$this->startTime = $startTime;
		$this->endTime = $endTime;
		$this->firefighterId = $firefighterId;
		$this->endTime = $endTime;
	}
	
	public function getStartTime(){
		return $this->startTime;
	}

	public function getEndTime(){
		return $this->endTime;
	}

	public function getFirefighterId(){
		return $this->firefighterId;
	}
	
	public function timeslotId(){
		return $this->timeslotId;
	}
}

class ScheduleTimeslot{
	private $timeslot;
	private $id;
	
	function __construct($timeslot, $id){
		$this->timeslot = $timeslot;
		$this->id = $id;
	}
	
	public function getTimeslot(){
		return $this->timeslot;
	}
	
	public function getScheduleTimeslotId(){
		return $this->id;
	}	

}

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
	//$result = openConnection($sql);
	$firefighters;
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
	$result = openConnection("");
	$timeslots;
	if ($result->num_rows > 0) {
		mysqli_data_seek($result, 0);
			while($row = $result->fetch_assoc()) {
				$startTime = $row[''];
				$endTime = $row["firstName"];
				$id = $row["id"];
				$timeslot = new TimeSlot($startTime, $endTime);
				$scheduleTimeslot = new ScheduleTimeslot($id, $timeslot);
				array_push($timeslots, $timeslot); 
			}
	}
	return $timeslots;
}

$firefighters = getAllFirefighters();
$a =1;
$b =2;
//$timeslots = getAllScheduleTimeslotsBetween($a, $b);
foreach($firefighters as $firefighter){
	echo $firefighter->getAge();
	echo $firefighter->getFirstName();
}


?>