var SCHEDULE_ID = 0;
var FIREFIGHTER_ID = 1;
var TIMESLOT_ID = 1;
var FIREFIGHTER_WITH_GIVEN_ID =3;
function recieveScheduleJson() {	
		var response1;
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "scheduleGrab.php?id=" + SCHEDULE_ID, false);
        xmlhttp.send();
		//document.write(xmlhttp.responseText);
		return xmlhttp.responseText;
		//xmlhttp.close;
}

function parseScheduleJson(timeslotJson){
	var timeslotArrayJson = timeslotJson.split("<br>");
		var timeslots = new Array();
		for(n=0; n<timeslotArrayJson.length-1; n++){
			var timeslot = parseScheduleTimeslot(timeslotArrayJson[n]);
			timeslots.push(timeslot);
		}
		return timeslots;
}

function grabSchedule(){
	var scheduleJson = recieveScheduleJson();
	return parseScheduleJson(scheduleJson);
}


function recieveFirefighterJson() {	
		var response1;
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "scheduleGrab.php?id=" + FIREFIGHTER_ID, false);
        xmlhttp.send();
		return xmlhttp.responseText;
		//xmlhttp.close;
}

function recieveFirefighterWithIdJson(id) {	
		var response1;
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "scheduleGrab.php?id=" + FIREFIGHTER_WITH_GIVEN_ID+"&givenId="+id, false);
        xmlhttp.send();
		return xmlhttp.responseText;
		//xmlhttp.close;
}

function parseFirefighterJson(firefighterJson){
	var firefighterArrayJson = firefighterJson.split("<br>");
		var firefighters = new Array();
		for(n=0; n<firefighterArrayJson.length-1; n++){
			var firefighter = parseFirefighter(firefighterArrayJson[n]);
			firefighters.push(firefighter);
		}
		return firefighters;
}

function grabFirefighters(){
	var firefighterJson = recieveFirefighterJson();
	return parseFirefighterJson(firefighterJson);
}

