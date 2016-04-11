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
	
	public function getJSON(){
		$arr = array('firefighterId'=>$this->id, 'firstName'=>$this->fName, 'lastName'=>$this->lName, 'age'=>$this->age);
		$json = json_encode($arr);
		return $json;
	}
	
	public static function getFirefighterFromJson($json){
		echo($json);
		$data = json_decode($json, true);
		$array = ($data["Firefighter"]);
		//var_dump($array, true);
		$age = 0;//$result['age'];
		$fName= $array["firstName"];
		$lName = $array["lastName"];
		$id = $array["firefighterId"];
		//echo($fName."<br>");
		//echo($lName."<br>");
		//echo($id."<br>");
		return new Firefighter($id, $fName, $lName, $age);
	}
	
	public static function getClassId(){
		return 0;
	}
}

class Timeslot{
	private $startTime;
	private $endTime;
	private $firefighter;
	private $timeslotId;
	
	function __construct($timeslotId, $startTime, $endTime, $firefighter){
		$this->startTime = $startTime;
		$this->endTime = $endTime;
		$this->firefighter = $firefighter;
		$this->timeslotId = $timeslotId;
	}
	
	public function getStartTime(){
		return $this->startTime;
	}

	public function getEndTime(){
		return $this->endTime;
	}

	public function getFirefighter(){
		return $this->firefighter;
	}
	
	public function getTimeslotId(){
		return $this->timeslotId;
	}
	
	public function getJSON(){
		$arr = ["startTime"=>$this->startTime, "endTime"=>$this->endTime, "timeslotId"=>$this->timeslotId, "firefighterId"=>$this->firefighter->getId()];
		$json = json_encode($arr);
		return $json;
	}
	
	public static function getTimeslotFromJson($json){
		echo($json);
		$data = json_decode($json, true);
		$array = ($data["Timeslot"]);
		$firefighterArray = $array["Firefighter"];
		//var_dump($array, true);
		
		$startTime= $array["startTime"];
		$endTime = $array["endTime"];
		$timeslotId = $array["timeslotId"];
		$fName = $firefighterArray["firstName"];
		$lName = $firefighterArray["lastName"];
		$firefighterId = $firefighterArray["firefighterId"];
		$firefighter = new Firefighter($firefighterId, $fName, $lName, 0);
		return new Timeslot($timeslotId, $startTime, $endTime, $firefighter);
	}
	
	public static function getClassId(){
		return 1;
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
	
	public function getJSON(){
		$str = '{"ScheduleTimeslot": {'.
		'"scheduleTimeslotId": "'.
		$this->id.
		'",'.
		'"Timeslot":'.
		$this->timeslot->getJSON().
		', "Firefighter":'.
		$this->timeslot->getFirefighter()->getJSON().
		'}}';
		return $str;
	}

	public function getClassId(){
		return 2;
	}
}




?>