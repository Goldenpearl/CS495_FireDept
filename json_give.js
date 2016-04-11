
function addFirefighterJson(firefighterJson) {	
		alert("adding Firefighter to DB");
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "scheduleMod.php?id="+FIREFIGHTER_ID+"&firefighter_json="+firefighterJson, false);
        xmlhttp.send();
		document.write(xmlhttp.responseText);
		return xmlhttp.responseText;
		//xmlhttp.close;
}

function addTimeslotJson(timeslotJson){
	alert("adding timeslot to DB");
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "scheduleMod.php?id="+TIMESLOT_ID+"&timeslot_json="+timeslotJson, false);
        xmlhttp.send();
		document.write(xmlhttp.responseText);
		return xmlhttp.responseText;
		//xmlhttp.close;
	
}

function addScheduleTimeslotJson(scheduleJson){
	alert("adding st to DB");
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "scheduleMod.php?id="+SCHEDULE_ID+"&schedule_json="+scheduleJson, false);
        xmlhttp.send();
		document.write(xmlhttp.responseText);
		return xmlhttp.responseText;
		//xmlhttp.close;
}
