<?php

	class TimeSlot{
		public $startTime=1;
		public $endTime=0;
		
		public function setTimes($startTime, $endTime){
			
			if(is_a($startTime, 'String'))
			{
				//
			}
			else{
			$this->startTime=$startTime;
			$this->endTime=$endTime;
			}
		}
		
		public function getStartTime(){
			return $this->startTime;
		}
		
		public function getEndTime(){
			return $endTime;
		}
		
		function dateAIsBeforeDateB($dateA, $dateB)
		{
			
		}
		
		function dateAIsAfterDateB($dateA, $dateB){
			
		}
		
		function dateAEqualsDateB($dateA, $dateB){
			
		}
		
		function thisTimeslotIsBeforeOther($other){
			return dateAIsBeforeDateB(getEndTime(),other.getStartTime());
		}
		function thisTimeslotIsAfterOther($other){
			return dateAIsAfterDateB(getStartTime(),other.getEndTime());
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