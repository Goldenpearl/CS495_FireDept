function loadProfile(){
	var firefighter = getIndividualFirefighter(getCurrentFirefighterId());
	fillInProfileInfo(firefighter);
	fillInScheduleInfo(firefighter);
}

function fillInProfileInfo(firefighter){
	var profileString = "";
	profileString +=  "<h3>Profile Info</h3>"
	profileString += "Id:<br>";
	profileString += firefighter.getFirefighterId();
	profileString += "<br><br>"
	profileString +="Name:<br>";
	profileString += firefighter.getFullName();
	profileString += "<br><br>"
	profileString += "Email:<br>"
	profileString += firefighter.getEmail();
	profileString += "<br><br>"
	profileString += "Phone:<br>"
	profileString += firefighter.getPhone();
	profileString += "<br><br>";
	profileString += "Secondary Phone:<br>";
	profileString += firefighter.getSecondaryPhone();
	profileString += "<br><br>";
	profileString += "Carrier:<br>";
	profileString += firefighter.getCarrier();
	profileString += "<br><br>"
	
	document.getElementById("userInfoDiv").innerHTML = profileString;
}

function fillInScheduleInfo(firefighter){
	var scheduleString = "";
	var scheduleSlots = getScheduleSlots(firefighter.getFirefighterId());
	scheduleString+="<h3>My Schedule</h3>";
	document.getElementById("userScheduleDiv").innerHTML= scheduleString;
}

//TODO
function getCurrentFirefighterId(){
	return 1;
}

function getIndividualFirefighter(id){
	var json = recieveFirefighterWithIdJson(id);
	var firefighter = parseFirefighter(json);
	return firefighter;
}

function getScheduleSlots(id){
	
}

function getShiftsWithinXDays(x){
	
}