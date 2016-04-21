<?php
class Firefighter {
	private $fName = "";
	private $lName = "";
	private $id = 0;

	function __construct($id, $fName, $lName, $email, $phone, $secondaryPhone, $carrier){
		$this->fName=$fName;
		$this->lName=$lName;
		$this->id = $id;
		$this->email = $email;
		$this->phone = $phone;
		$this->secondaryPhone = $secondaryPhone;
		$this->carrier = $carrier;
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
	
	public function getEmail(){
		return $this->email;
	}
	
	public function getPhone(){
		return $this ->phone;
	}
	
	public function getSecondaryPhone(){
		return $this ->secondaryPhone;
	}
	
	public function getCarrier(){
		return $this->carrier;
	}

	public function getJSON(){
		$arr = array('firefighterId'=>$this->id, 'firstName'=>$this->fName, 
			'lastName'=>$this->lName, 'email'=>$this->email, 'phone' =>$this->phone,
			'secondaryPhone'=>$this->secondaryPhone,'carrier'=>$this->carrier) ;
		$json = json_encode($arr);
		return $json;
	}
	
	public function getSummary(){
		return 
		"Name: ".
		$this->fName.
		" ".
		$this->lName. 
		"<br> Id: ".
		$this->id.
		"<br>";
	}
	
	public static function getFirefighterFromJson($json){
		//echo($json);
		$data = json_decode($json, true);
		$array = ($data["Firefighter"]);
		//var_dump($array, true);
		$fName= $array["firstName"];
		$lName = $array["lastName"];
		$id = $array["firefighterId"];
		$email= $array["email"];
		$phone = $array["phone"];
		$secondaryPhone = $array["secondaryPhone"];
		$carrier = $array["carrier"];
		return new Firefighter($id, $fName, $lName, $email, $phone, $secondaryPhone, $carrier);
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
		//echo($json);
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
	
	public function getSummary(){
		return "StartTime : <br>".
		$this->startTime.
		"<br><br> EndTime: <br>".
		$this->endTime.
		"<br><br>Firefighter: <br>".
		$this->firefighter->getSummary().
		"<br>TimeslotId: <br>".
		$this->timeslotId.
		"<br>";
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
	
	public static function getScheduleTimeslotFromJson($json){
		$data = json_decode($json, true);
		$array = ($data["ScheduleTimeslot"]);
		$timeslotArray = $array["Timeslot"];
		$firefighterArray = $timeslotArray["Firefighter"];
		//var_dump($array, true);
		
		$scheduleTimeslotId = $array["scheduleTimeslotId"];
		$startTime= $timeslotArray["startTime"];
		$endTime = $timeslotArray["endTime"];
		$timeslotId = $timeslotArray["timeslotId"];
		$fName= $firefighterArray["firstName"];
		$lName = $firefighterArray["lastName"];
		$email= $firefighterArray["email"];
		$phone = $firefighterArray["phone"];
		$secondaryPhone = $firefighterArray["secondaryPhone"];
		$carrier = $firefighterArray["carrier"];
		$firefighterId = $firefighterArray["firefighterId"];
		$firefighter = new Firefighter($firefighterId, $fName, $lName, $email, $phone, $secondaryPhone, $carrier);
		$timeslot = new Timeslot($timeslotId, $startTime, $endTime, $firefighter);
		$scheduleTimeslot = new ScheduleTimeslot($timeslot, $scheduleTimeslotId);
		return $scheduleTimeslot;
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
	
	public function getSummary(){
		return "ScheduleTimeslotId: <br>".
		$this->id.
		"<br><br> Timeslot:<br>".
		$this->timeslot->getSummary().
		"<br>";
	}

	public function getClassId(){
		return 2;
	}
}




?>