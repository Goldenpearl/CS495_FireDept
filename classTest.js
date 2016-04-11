function createAFirefighterJS(){
	return new Firefighter(1, "FirstName","LastName");
}

function createATimeslotJS(){
	return new Timeslot(2, getAStartDate(), getAnEndDate(), createAFirefighterJS())
}

function createAScheduleTimeslotJS(){
	var firefighter = createAFirefighterJS();
	var timeslot = createATimeslotJS();
	return new ScheduleTimeslot(firefighter, timeslot, 2);
}

function getAStartDate(){
	var startDate = new Date();
	startDate.setHours(startDate.getHours()-2);
	return startDate;
}

function getAnEndDate(){
	var endDate = new Date();
	endDate.setHours(endDate.getHours()+1);
	return endDate;
}

function testClassCreation(){
	var firefighter = createAFirefighterJS();
	var timeslot = createATimeslotJS();
	var scheduleTimeslot =createAScheduleTimeslotJS();
	
	var content = "";
	
	content+=("Created a firefighter. <br>"+firefighter.getSummary()+"<br>"+firefighter.getJson()+"<br><br>");
	content+=("Created a timeslot. <br>"+timeslot.getSummary()+"<br>"+timeslot.getJson()+"<br><br>");
	content+=("Created a schedule timeslot. <br>"+scheduleTimeslot.getLiteralSummary()+"<br>"+scheduleTimeslot.getJson()+"<br><br>");
	document.getElementById("classTest").innerHTML = content;
}




testClassCreation();