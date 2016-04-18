
function MyEvent(eventName, eventDescription, timeslot, eventId)
{
	this.eventName=eventName;
	this.eventDescription=eventDescription;
	this.timeslot=timeslot;
	this.eventId = eventId;
	
	this.getSummary = function(){
		return "My Event"+eventName+ " "+eventId+":<br> "+eventDescription+"<br><br> "+timeslot.getSummary();
	}
	this.getJson = function(){
		return '{' +this.getNestedJson()+'}';			
	}	
	this.getNestedJson = function(){
		return '"MyEvent":{"eventName":"'+
				this.eventName+
				'", "eventDescription":"'+
				this.eventDescription +
				'", "timeslot":"'+
				this.timeslot+
				'", "eventId":'+
				eventId+
				'"}';
	}
}

function AssignedFirefighter(event, apparatus, firefighter, assignedFirefighterId){
	this.event = event;
	this.apparatus = apparatus;
	this.firefighter = firefighter;
	this.assignedFirefighterId = assignedFirefighterId;
	this.getSummary = function(){
		return "Firefighter, Assigned <br>Assignment ID:"+assignedFirefighterId+"<br> Event:"+event.eventName + "<br> Assigned Apparatus:"+ apparatus.apparatusName;
	}
	this.getJson = function(){
		return '{' +this.getNestedJson()+'}';			
	}	
	this.getNestedJson = function(){
		return '"MyEvent":{"'+
				event.getNestedJson()+
				'", "'+
				apparatus.getNestedJson()+
				'", "'+
				firefighter.getNestedJson()+
				'", "'+
				'"assignedFirefighterId":'+
				assignedFirefighterId+
				'"}';
	}
}

function AssignedApparatus(event, apparatus, assignedApparatusId){
	this.event = event;
	this.apparatus = apparatus;
	this.assignedApparatusId = assignedAppparatusId;
	this.getSummary = function(){
		return "Assigned Apparatus<br>Assignment ID:"+assignedApparatusId+"<br> Event:"+event.eventName + "<br> Assigned Apparatus:"+ apparatus.apparatusName;
	}
	this.getJson = function(){
		return '{' +this.getNestedJson()+'}';			
	}	
	this.getNestedJson = function(){
		return '"assignedApparatus":{"'+
				event.getNestedJson()+
				'", "'+
				apparatus.getNestedJson()+
				'", "'+
				'"assignedApparatusId":'+
				assignedApparatusId+
				'"}';
	}
}

function Apparatus(apparatusName, apparatusDescription, numberOfSlots, apparatusId){
	this.apparatusName = apparatusName;
	this.apparatusDescription = apparatusDescription;
	this.numberOfSlots = numberOfSlots;
	this.apparatusId = apparatusId;
	
	this.getSummary = function(){
		return "Apparatus<br>Apparatus ID:"+apparatusId+"<br> Apparatus Name:"+apparatusName + "<br> Apparatus Description:"+ apparatusDescription+"<br> Number Of Slots:" + numberOfSlots;
	}
	this.getJson = function(){
		return '{' +this.getNestedJson()+'}';			
	}	
	this.getNestedJson = function(){
		return '"apparatus":{"'+
				'"apparatusId":'+
				apparatusId+
				'", "';
				'"numberOfSlots":'+
				numberOfSlots+
				'", "';
				'"apparatusDescription":'+
				apparatusDescription+
				'", "';
				'"apparatusName":'+
				apparatusName+
				'"}';
	}
}

function Firefighter(firefighterId, firstName, lastName, email, phone, secondaryPhone){
	this.firefighterId=firefighterId;
	this.firstName=firstName;
	this.lastName=lastName;
	this.email=email;
	this.phone=phone;
	this.secondaryPhone = secondaryPhone;
	
	this.getFullName = function(){
		return this.firstName + " " + this.lastName;
	}
	
	this.getSummary = function(){
		return "Firefighter ("+firefighterId+", "+firstName+", "+lastName+")";
	}
	this.getJson = function(){
		return '{' +this.getNestedJson()+'}';			
	}
	
	this.getNestedJson = function(){
		return '"Firefighter":{"firefighterId":"'+
				this.firefighterId+
				'", "firstName":"'+
				this.firstName +
				'", "lastName":"'+
				this.lastName+
				'"}';
	}
}

function Timeslot(timeslotId, startTime, endTime){
   this.timeslotId=timeslotId;
   this.startTime = startTime;
   this.endTime = endTime;
   /*
	this.getStartDate = function(){
		var dateStr = startTime.replace(" ", "T");
		return new Date(dateStr);
	}
	this.getEndDate = function(){
		var dateStr = endTime.replace(" ","T");
		return new Date(dateStr);
	}
	*/
   this.getSummary = function(){
	   return "Timeslot ("+timeslotId+", "+startTime+", "+endTime+")";
   }
 
  /* this.getDateRange = function(){
		return new DateRange(this.getStartDate(), this.getEndDate());
   }
   */
   this.getJson = function(){
	   return '{'+this.getNestedJson()+'}';
   }
   
   this.getNestedJson = function(){
	   var json = '"Timeslot": {';
	   json+='"startTime":"';
	   json+=startTime;
	   json+='", "endTime":"';
	   json+=endTime;
	   json+='", "timeslotId":"';
	   json+=timeslotId;
	   json+='}';
	   return json;
   }
}