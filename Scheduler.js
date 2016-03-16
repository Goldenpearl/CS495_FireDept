	var tableDiv = "tableDiv";
	var listDiv = "listDiv";
	var dateDiv = "dateDiv";
	var bubbleDiv= "bubbleDiv";
	var dateFormat = "dateFormat";
	var dateSelection = "dateSelection";
	var dateIdDAILY = 0;
	var dateIdWEEKLY = 1;
	var dateIdMONTHLY = 2;
	
	var lastKnownDate = Date(); //Default is current date. Helps keep track of date across all formats.
	var grabbedslots;
	var grabNames;
	//calls one time setup methods
	function initScheduler(){
		grabbedslots = grabSchedule(); //external call
		grabNames = getFiremenNames();
		createDateSelection(bubbleDiv);
		//createList(timeslots, listDiv);
		reloadTable();
	}
	
	//TODO call database
	function getFiremenNames(){
	var names = ["Ash Ketchum", "Misty Bubbles", "Brock Rock"];
	return names;
	}
	
	//adds radio buttons to html	
	function createDateSelection(divName){
		var selectionContents = "";
		selectionContents+='<form id='
		selectionContents+=dateFormat;
		selectionContents+='><label><input type="radio" id='
		selectionContents+=dateSelection;
		selectionContents+=' name='
		selectionContents+=dateSelection;
		selectionContents+=' onchange ="reloadTable()"';
		selectionContents+=' checked = "checked" value ='
		selectionContents+=dateIdDAILY;
		selectionContents+=' />Daily   </label>';
		selectionContents+='<label><input type="radio" id='
		selectionContents+=dateSelection
		selectionContents+=' name = ';
		selectionContents+= dateSelection;
		selectionContents+=' onchange = "reloadTable()"';
		selectionContents+=' value = ';
		selectionContents+=dateIdWEEKLY;
		selectionContents+=' />Weekly   </label>';
		selectionContents+='<label><input type="radio" id='
		selectionContents+=dateSelection
		selectionContents+=' name = ';
		selectionContents+= dateSelection;
		selectionContents+=' onchange = "reloadTable()"';
		selectionContents+= ' value = '
		selectionContents+= dateIdMONTHLY;
		selectionContents+=' />Monthly   </label>';
		selectionContents+='</form>';
		document.getElementById(divName).innerHTML = selectionContents;
	}
	
	//Refreshes header guide, table header, and cell shading
	function reloadTable(){
		var timeslots = getTimeslots();
		var names = getNames();
		var dateFormatId = getDateSelectionIndex();
		var dateRangeArray = getDateRange(dateFormatId);
		var dateIndex = getDateIndex(dateRangeArray);
		
		refreshHeaderGuide(dateRangeArray, dateIndex, timeslots, names, dateFormatId);
		refreshTableCells(tableDiv, getFiremenNames(), dateRangeArray[dateIndex], dateFormatId);
		refreshCellShading(timeslots, names, dateRangeArray[dateIndex]);
	}
	//returns the grabbed timeslots
	function getTimeslots(){
		return grabbedslots;
	}
	//returns the grabbed fire names
	function getNames(){
		return grabNames;
	}
	
	//returns value of selected radio button; this value cooresponds to a display format
	function getDateSelectionIndex(){
		var radioButtons = document.getElementById(dateFormat).elements[dateSelection];
		for(var i=0; i<radioButtons.length; i++){
			if(radioButtons[i].checked){
				return radioButtons[i].value;
			}
		}
		return 0;
	}
	
	//returns index that is closest to current date
	function getDateIndex(dateRangeArray){
		var targetDate = Date();
		for(var n=0; n<dateRangeArray.length; n++){
			if(targetDate>=dateRangeArray[n].startDate && targetDate<=dateRangeArray[n].endDate){
				return n;
			}
		}
		return 0;
	}
	
	//Returns an array of dateRanges
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
				nextEndDate.setDate(nextEndDate.getDate() +6);
			}
			else{
				nextEndDate.setMonth(nextEndDate.getMonth()+1);
			}
			var dtRange = new DateRange(nextStartDate, nextEndDate);
			dateRangeArray.push(dtRange);
			nextStartDate = new Date(nextStartDate.getTime());
			nextEndDate = new Date(nextEndDate.getTime());
		}
		return dateRangeArray;
	}
	
	
	//Refreshes the text above the table
	function refreshHeaderGuide(dateRangeArray, dateIndex, timeslots, names, dateFormatId){
		var dateContents = "";
		var startDate = dateRangeArray[dateIndex].startDate;
		var endDate = dateRangeArray[dateIndex].endDate;
		dateContents += "<button id = 'backButton'> << </button>";
		//dateContents += "<h3>";
		dateContents += simpleDate(startDate);
		if(dateFormatId!=dateIdDAILY){
		dateContents += " - ";
		dateContents += simpleDate(endDate);
		}
		//dateContents += "</h3>";
		dateContents += "<button id = 'forwardButton'> >> </button>";
		document.getElementById(dateDiv).innerHTML = dateContents;
		document.getElementById('forwardButton').onclick=function(){changeTableActiveTime(dateRangeArray, dateIndex+1, timeslots, names, dateFormatId);};
		document.getElementById('backButton').onclick=function(){changeTableActiveTime(dateRangeArray, dateIndex-1, timeslots, names, dateFormatId);};
		if(dateIndex<=0){
			document.getElementById('backButton').disabled=true;
		}
		else{
			document.getElementById('backButton').disabled=false;
		}
		if(dateIndex>=dateRangeArray.length-1){
			document.getElementById('forwardButton').disabled=true;
		}
		else{
			document.getElementById('forwardButton').disabled=false;
		}
	}
	//Called to update the time range of the schedule (called when you push back or forward)
	function changeTableActiveTime(dateRangeArray, dateIndex, timeslots, names, dateFormatId){
		if(dateIndex<=dateRangeArray.length-1 && dateIndex>=0)
		refreshCellShading(timeslots, names, dateRangeArray[dateIndex]);
		refreshHeaderGuide(dateRangeArray, dateIndex, timeslots, names, dateFormatId);
	}
	
	//Creates an unshaded table with a row for each firefighter name
	function refreshTableCells(divName, firefighterNames, dateRange, dateFormatId) {
			//all unique firemen
			var names = firefighterNames
			//Define an array used to fill the header
			var timeHeaderArray = getTimeHeaderArray(dateRange, dateFormatId);
			var tablecontents = "";
			//Define table
			tablecontents += "<table id = myTable>";
			tablecontents += "<tr>";
			tablecontents += "<th>";
			tablecontents += "</th>";
			for(var i =0; i< timeHeaderArray.length; i++){
				tablecontents+="<th>";
				tablecontents+=getDateString(timeHeaderArray[i].startDate, dateFormatId)+"</th>";
				if(i== timeHeaderArray.length-1){
					tablecontents+="<th>"+getDateString(timeHeaderArray[i].endDate, dateFormatId)+"</th>";
				}
			}
			tablecontents += "</tr>"
			for(var i=0; i<names.length; i++){ //create a row for each firefighter
				tablecontents+="<tr>";
				tablecontents+="<th>";
				tablecontents+= names[i];
				for(var j=0; j<timeHeaderArray.length+1; j++){ //create a cell for each column header
					tablecontents+= "<td class=table-cell>";
					tablecontents+= "</td>";
				}
				tablecontents+="</th>";
				tablecontents+="</tr>";
			}
            tablecontents += "</table>";
			//Add the table to the document
			document.getElementById(divName).innerHTML = tablecontents;
	}
	
	function getTimeHeaderArray(dateRange, dateFormatId){
		var startDate = new Date(dateRange.startDate.getTime());
		var endDate = new Date(startDate.getTime());
		var header = new Array();
		if(dateFormatId == dateIdDAILY){
			endDate.setHours(0,0,0,0);
		}
		else if(dateFormatId == dateIdWEEKLY){
			var day = endDate.getDay();
			if(day!=0)
			{
				//var dateDiff =(day==0?7:0);
				//endDate.setDate(endDate.getDate()-dateDiff);
			}
			endDate.setHours(0,0,0,0);
			
		}
		else{
			endDate.setDate(1);
			endDate.setHours(0,0,0,0);
		}
		while(endDate<dateRange.endDate){
			startDate=new Date(endDate.getTime());
			endDate = new Date(startDate.getTime());
			if(dateFormatId== dateIdDAILY){
				endDate.setHours(endDate.getHours()+1);
			}
			else if(dateFormatId == dateIdWEEKLY){
				endDate.setHours(endDate.getHours()+24);
			}
			else{
				endDate.setDate(endDate.getDate()+1);
			}
			var range = new DateRange(startDate, endDate);
			header.push(range);
		}
		return header;
	
		/*
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
			return timeHeader;*/
	}
	
	function getDateString(date, dateFormatId){
		if(dateFormatId==dateIdDAILY){
			var weekday = "";
			switch (date.getDay()){
				case 0:
				weekday = "Sunday";
				break;
				case 1:
				weekday = "Monday";
				break;
				case 2:
				weekday = "Tuesday";
				break;
				case 3:
				weekday = "Wednesday";
				break;
				case 4:
				weekday = "Thursday";
				break;
				case 5:
				weekday = "Friday";
				break;
				case 6:
				weekday = "Saturday";
				break;
				default:
			}
			
			var hours = date.getHours();
			var dateString = "";
			var m = "am";
			if(hours>=12){
				m="pm";
			}
			hours = hours%12;
			if(hours == 0){
				hours = 12;
			}
			dateString+=hours;
			dateString += ":00 ";
			dateString+=m;
			return dateString;
			
		}
		else if (dateFormatId == dateIdWEEKLY){
			var weekday = "";
			switch (date.getDay()){
				case 0:
				weekday = "Sunday";
				break;
				case 1:
				weekday = "Monday";
				break;
				case 2:
				weekday = "Tuesday";
				break;
				case 3:
				weekday = "Wednesday";
				break;
				case 4:
				weekday = "Thursday";
				break;
				case 5:
				weekday = "Friday";
				break;
				case 6:
				weekday = "Saturday";
				break;
				default:
			}
			
			var dateString = "";
			dateString += weekday + ", ";
			dateString +=getMonth(date.getMonth());
			dateString += " "+ date.getDate();
			return dateString;
		}
		else{
			var dateString = simpleDate(date);
			return dateString;
		}
		return "gg";
	}
	
	//Shades cells that are scheduled
	function refreshCellShading(timeslots, names, dateRange){
		for(var i=0; i<timeslots.length; i++){	
			var name = timeslots[i].firefighter.getFullName();
			var startTime = timeslots[i].timeslot;
			var nameIndex = getNameIndex(name, names);
			var timeIndex = getTimeIndex(startTime)
			if(nameIndex!=-1 && timeIndex !=-1)
			{
				document.getElementById('myTable').rows[1+nameIndex].cells[timeIndex+1].setAttribute("bgcolor", "#00FF00");

			}
		}
	}
	
	//Returns the index of the name in the array, or -1 if name is not found
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
	
	//Writes the specified schedule in list form
	function createList(timeslots, divName){
		var listContents = "";
		for(var n=0; n<timeslots.length; n++){
			listContents+=timeslots[n].getSummary()+"<br>";
		}
		document.getElementById(divName).innerHTML = listContents;
	}

	
	

	
	
	