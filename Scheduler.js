	var tableDiv = "tableDiv";
	var listDiv = "listDiv";
	var dateDiv = "dateDiv";
	
	var dateIdDAILY = 0;
	var dateIdWEEKLY = 1;
	var dateIdMONTHLY = 2;
	
	function createScheduler(){
		var timeslots = grabSchedule();
		var names = getFiremenNames();
		//createList(timeslots, listDiv);
		createTable(tableDiv, names);
		
		var dateRangeArray = getDateRange(dateIdMONTHLY);
		var dateIndex = 1;
		shadeCells(timeslots, names, dateRangeArray[dateIndex]);
		createDateLabel(dateRangeArray, dateIndex, timeslots, names);
		
	}
	
	function getDateRange(dateId){
		var dateGetter = new validDateGetter();
		var earliestValidDate = dateGetter.getEarliestValidDate();
		var latestValidDate = dateGetter.getLatestValidDate();
		var dateRangeArray = new Array();
		var nextStartDate;
		var nextEndDate = new Date(earliestValidDate.getTime());
		if(dateId == dateIdDAILY){
			nextEndDate.setHours(0,0,0,0);
		}
		else if(dateId == dateIdWEEKLY){
			daydiff = nextEndDate.getDate() - nextEndDate.getDay() + (nextEndDate.getDay() == 0 ? -7:0);
			nextEndDate.setDate(daydiff);
		}
		else{
			nextEndDate.setDate(1);
		}
		while(nextEndDate<latestValidDate){
			nextStartDate = new Date(nextEndDate.getTime());
			if(dateId == dateIdDAILY){
				nextEndDate.setDate(nextEndDate.getDate() +1);
			}
			else if(dateId == dateIdWEEKLY){
				nextEndDate.setDate(nextEndDate.getDate() +7);
			}
			else{
				nextEndDate.setMonth(nextEndDate.getMonth()+1);
			}
			var dtRange = new DateRange(nextStartDate, nextEndDate);
			alert(dtRange.getSummary());
			dateRangeArray.push(dtRange);
			nextStartDate = new Date(nextStartDate.getTime());
			nextEndDate = new Date(nextEndDate.getTime());
		}
		return dateRangeArray;
	}
	
	function createList(timeslots, divName){
		var listContents = "";
		for(var n=0; n<timeslots.length; n++){
			listContents+=timeslots[n].getSummary()+"<br>";
		}
		document.getElementById(divName).innerHTML = listContents;
	}

	function createDateLabel(dateRangeArray, index, timeslots, names){
		var dateContents = "";
		var startDate = dateRangeArray[index].startDate;
		var endDate = dateRangeArray[index].endDate;
		dateContents += "<button id = 'backButton'> << </button>";
		//dateContents += "<h3>";
		dateContents += simpleDate(startDate);
		dateContents += " - ";
		dateContents += simpleDate(endDate);
		//dateContents += "</h3>";
		dateContents += "<button id = 'forwardButton'> >> </button>";
		document.getElementById(dateDiv).innerHTML = dateContents;
		document.getElementById('forwardButton').onclick=function(){changeTableActiveTime(dateRangeArray, index+1, timeslots, names);};
		document.getElementById('backButton').onclick=function(){changeTableActiveTime(dateRangeArray, index-1, timeslots, names);};
		if(index<=0){
			document.getElementById('backButton').disabled=true;
		}
		else{
			document.getElementById('backButton').disabled=false;
		}
		if(index>=dateRangeArray.length-1){
			document.getElementById('forwardButton').disabled=true;
		}
		else{
			document.getElementById('forwardButton').disabled=false;
		}
	}
	
	function createTable(divName, firefighterNames) {
			//all unique firemen
			var names = firefighterNames
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
	}

	
	function changeTableActiveTime(dateRangeArray, dateIndex, timeslots, names){
		if(dateIndex<=dateRangeArray.length-1 && dateIndex>=0)
		//shadeCells(timeslots, names, dateRangeArray[dateIndex]);
		createDateLabel(dateRangeArray, dateIndex);
	}
	
	function getFiremenNames(){
	var names = ["Ash Ketchum", "Misty Bubbles", "Brock Rock"];
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
	
	function shadeCells(timeslots, names, dateRange){
		for(var i=0; i<timeslots.length; i++){	
			var name = timeslots[i].fireman.getFullName();
			var startTime = timeslots[i].timeslot;
			var nameIndex = getNameIndex(name, names);
			var timeIndex = getTimeIndex(startTime)
			if(nameIndex!=-1 && timeIndex !=-1)
			{
				document.getElementById('myTable').rows[1+nameIndex].cells[timeIndex+1].setAttribute("bgcolor", "#00FF00");

			}
		}
	}
	
	