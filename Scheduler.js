	var tableDiv = "tableDiv";
	var listDiv = "listDiv";
	
	function createScheduler(){
		var timeslots = grabSchedule();
		createSchedulerFromTimeslots(timeslots);
	}
	
	function createSchedulerFromTimeslots(timeslotss){
		createList(timeslotss, listDiv);
		createTable(timeslotss, tableDiv);
	}

	function createList(timeslots, divName){
		var listContents = "";
		for(var n=0; n<timeslots.length; n++){
			listContents+=timeslots[n].getSummary()+"<br>";
		}
		document.getElementById(divName).innerHTML = listContents;
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
	var names = ["Ash", "Misty", "Brock"];
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

	function getNameIndex(name, names){
		for(var n=0; n<names.length; n++){
			if(name === names[n]){
				return n;
			}
		}
		return -1;
	}
	
	function getTimeIndex(date){
		var time = date.getStartDate();
		return time.getHours();
	}
	
	function shadeCells(timeslots, names){
		for(var i=0; i<timeslots.length; i++){	
			var name = timeslots[i].fireman.firstName;
			var startTime = timeslots[i].timeslot;
			var nameIndex = getNameIndex(name, names);
			var timeIndex = getTimeIndex(startTime)
			if(nameIndex!=-1 && timeIndex !=-1)
			{
				document.getElementById('myTable').rows[1+nameIndex].cells[timeIndex+1].setAttribute("bgcolor", "#00FF00");

			}
		}
	}
	
	