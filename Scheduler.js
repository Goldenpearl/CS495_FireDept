	var tableDiv = "tableDiv";
	var listDiv = "listDiv";
	
	function createScheduler(){
		var timeslots = grabSchedule();
		createSchedulerFromTimeslots(timeslots);
	}
	
	function grabSchedule() {	
		var id=0;
		var response1;
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "scheduleGrab.php?id=" + id, false);
        xmlhttp.send();
		return xmlhttp.responseText;
		//xmlhttp.close;
	}
	
	function createSchedulerFromTimeslots(timeslotss){
		var timeslots = loadTimeslots(timeslotss);
		createList(timeslots);
		createTable(timeslots);
	}
	
	function loadTimeslots(timeslots){
		//TODO convert timeslots to array
		var name = timeslots.split("<br>");
		var timeslotss = Array();
		for(n=0; n<name.length-1; n++){
			var aa = JSON.parse(name[n]);
			timeslotss.push([aa.ScheduleTimeslot.Firefighter.firstName, 10]);
		}
		alert(ss);
		timeslotss.push(["Jess", 2]);
		return timeslotss;
	}
	
	function createList(timeslots){
		var listContents = "";
		for(var n=0; n<timeslots.length; n++){
			listContents+=timeslots[n][0] + " " + indexToTime(timeslots[n][1])+ "<br>";
		}
		document.getElementById(listDiv).innerHTML = listContents;
	}

	function indexToTime(index){
		var realIndex = index%24;
		var time = "";
		var m = "";
		if(index<=0){
			time+="12:00 am";
		}
		else if(index>12){
			m="pm";
			time+=index%12+":00 "+m;
		}
		else{
			m = "am"
			time+=index+":00 "+m;
		}
			return time;
	}
	
	
	function createTable(timeslots, divName) {
			//Get all unique firemen
			var names = getFiremenNames();
			//Define the header
			var timeHeader = createTimeHeader();
			var tablecontents = "";
			//Define table
			tablecontents += "<table id = myTable>";
			tablecontents += "<tr>";
			tablecontents += "<th>";
			tablecontents += "</th>";
			for(var i =0; i< timeHeader.length; i++){
				tablecontents+="<th>";
				tablecontents+=timeHeader[i] +"</th>";
			}
			tablecontents += "</tr>"
			for(var i=0; i<names.length; i++){ //create a row for each fireman
				tablecontents+="<tr>";
				tablecontents+="<th>";
				tablecontents+= names[i];
				for(var j=0; j<timeHeader.length; j++){ //create a cell for each column header
					tablecontents+= "<td class=table-cell>";
					tablecontents+= "</td>";
				}
				tablecontents+="</th>";
				tablecontents+="</tr>";
			}
            tablecontents += "</table>";
			//Add the table to the document
			document.getElementById(tableDiv).innerHTML = tablecontents;
			//Shade cells
			shadeCells(timeslots, names);
	}

	function getFiremenNames(){
	var names = ["Bob", "Allan", "Jess"];
	return names;
	}
	
	function createTimeHeader(){
	var timeHeader = new Array();
			timeHeader[0]="12:00 am";
			for(var i=1; i<12; i++){
				var str = i+":00 am";
				timeHeader[i] = str;;
			} 
			timeHeader[12] = "12:00 pm";
			for(var i=1; i<12; i++){
				var str = i+":00 pm";
				timeHeader[12+i]=str;
			} 		
			timeHeader[24] = "12:00 am";
			return timeHeader;
	}

	function shadeCells(timeslots, names){
		for(var i=0; i<timeslots.length; i++){	
			var name = timeslots[i][0];
			var indexOfName = 0;
			var nameFound = false
			while(!nameFound && indexOfName<names.length){
				if(name === names[indexOfName])
				{
					nameFound=true;
				}
				else
				{
					indexOfName++;
				}
			}
			if(nameFound)
			{
				document.getElementById('myTable').rows[indexOfName+1].cells[timeslots[i][1]+1].setAttribute("bgcolor", "#00FF00");

			}
		}
	}