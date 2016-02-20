var SCHEDULE_ID = 0;

function recieveScheduleJson() {	
		var response1;
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "scheduleGrab.php?id=" + SCHEDULE_ID, false);
        xmlhttp.send();
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
