
function addFirefighterJson(firefighterJson) {	
		alert("adding Firefighter to DB");
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "scheduleMod.php?id="+0+"&firefighter_json="+firefighterJson, false);
        xmlhttp.send();
		document.write(xmlhttp.responseText);
		return xmlhttp.responseText;
		//xmlhttp.close;
}

function addTimeslotJson(timeslotJson){
	alert("adding timeslot to DB");
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "scheduleMod.php?id="+1+"&timeslot_json="+timeslotJson, false);
        xmlhttp.send();
		document.write(xmlhttp.responseText);
		return xmlhttp.responseText;
		//xmlhttp.close;
	
}

function addScheduleTimeslotJson(scheduleJson){
	alert("adding st to DB");
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "scheduleMod.php?id="+2+"&schedule_timeslot_json="+scheduleJson, false);
        xmlhttp.send();
		document.write(xmlhttp.responseText);
		return xmlhttp.responseText;
		//xmlhttp.close;
}
