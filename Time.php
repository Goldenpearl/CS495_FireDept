<?php

	class TimeSlot{
		public $startTime=0;
		public $endTime=0;
		
		public function setTimes($startTime, $endTime){
			$this->startTime=$startTime;
			$this->endTime=$endTime;
		}
		
		public function getStartTime(){
			return $this->startTime;
		}
		
		public function getEndTime(){
			return $endTime;
		}
		
		function isBefore($other){
			if(true){
				return true;
			}
			else return false;
		}
		function isAfter($other){
			
			
		}
	}
	
	function isTimeslotABeforeTimeslotB($a, $b){
		
		
		
	}

	function isTimeslotAAfterTimeslotB($a, $b){
		
	
	}
	
	$a = new TimeSlot();
	$b=1;
	$c=2;
	$a->setTimes($b,$b);
	echo($a->getStartTime());
?>