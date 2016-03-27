	var tableDiv = "tableDiv";
	var listDiv = "listDiv";
	var dateDiv = "dateDiv";
	var bubbleDiv= "bubbleDiv";
	var dateFormat = "dateFormat";
	var dateSelection = "dateSelection";
	var listSelection = "listSelection";
	var listBubble = "listBubble";
	var listBubbleDiv = "listBubbleDiv";
	var dateIdDAILY = 0;
	var dateIdWEEKLY = 1;
	var dateIdMONTHLY = 2;
	var listALLSLOTS = 0;
	var listRELEVANTSLOTS = 1;
	
	var lastKnownDate = new Date(); //Default is current date. Helps keep track of date across all formats.
	var grabbedslots;
	var grabNames;
	//calls one time setup methods
	function initScheduler(){
		grabbedslots = grabSchedule(); //external call
		grabNames = grabFirefighters(); //external call
		createListSelection(listBubbleDiv);
		createDateSelection(bubbleDiv);
		reloadTable();
		//testDateRange();
	}
	
	//adds radio buttons to html - list
	function createListSelection(divName){
		var selectionContents = "";
		selectionContents+='<form id= ';
		selectionContents+= listSelection;
		selectionContents+=' onchange = ';
		selectionContents+=refreshListFromBubble();
		selectionContents+=">";
		selectionContents+= '<label><input type="radio" id=';
		selectionContents+=listBubble;
		selectionContents+=' name='
		selectionContents+=listBubble;
		selectionContents+= ' value='
		selectionContents+=listRELEVANTSLOTS;
		selectionContents+=' checked = "checked" />Relevant </label>';
		selectionContents+= '<label><input type="radio" id='
		selectionContents+=listBubble;
		selectionContents+=' name='
		selectionContents+=listBubble;
		selectionContents+=' value= '
		selectionContents+= listALLSLOTS;
		selectionContents+=' />All </label>';
		selectionContents+='</form>';
		document.getElementById(divName).innerHTML = selectionContents;
	}
	
	function refreshListFromBubble(){
		//TODO
		//refreshList(listDiv, grabbedslots, dateRange)
	}
	
	function getSlotListId(){
		var radioButtons = document.getElementById(listSelection).elements[listBubble];
		for(var i=0; i<radioButtons.length; i++){
			if(radioButtons[i].checked){
				return radioButtons[i].value;
			}
		}
		return listALLSLOTS;
	}
	
	//adds radio buttons to html - schedule
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
		
		refreshList(listDiv, grabbedslots, dateRangeArray[dateIndex]);
		refreshHeaderGuide(dateRangeArray, dateIndex, timeslots, names, dateFormatId);
		refreshTableCells(tableDiv, grabNames, dateRangeArray[dateIndex], dateFormatId);
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
	
	//returns value of selected radio button; this value corresponds to a display format
	function getDateSelectionIndex(){
		var radioButtons = document.getElementById(dateFormat).elements[dateSelection];
		for(var i=0; i<radioButtons.length; i++){
			if(radioButtons[i].checked){
				return radioButtons[i].value;
			}
		}
		return 0;
	}
	
	//returns index that is closest to the last date viewed. If no memory, uses current date.
	function getDateIndex(dateRangeArray){
		var targetDate = lastKnownDate;
		for(var n=0; n<dateRangeArray.length; n++){
			var beforeDate = dateRangeArray[n].startDate;
			var afterDate = dateRangeArray[n].endDate;
			if(targetDate<=afterDate && targetDate>=beforeDate){
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
				nextEndDate.setDate(nextEndDate.getDate() +7);
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
		var tempDate = new Date();
		tempDate.setTime(endDate.getTime());
		tempDate.setMinutes(tempDate.getMinutes()-1);
		dateContents += simpleDate(tempDate);
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
		{
			updateLastKnownDateFromDateRange(dateRangeArray[dateIndex]);
			refreshList(listDiv, timeslots, dateRangeArray[dateIndex]);
			refreshTableCells(tableDiv, names, dateRangeArray[dateIndex], dateFormatId);
			refreshCellShading(timeslots, names, dateRangeArray[dateIndex]);
			refreshHeaderGuide(dateRangeArray, dateIndex, timeslots, names, dateFormatId);
		}
	}
	
	function updateLastKnownDateFromDateRange(dateRange){
		var time1 = dateRange.startDate.getTime();
		var time2 = dateRange.endDate.getTime();
		var time3 = (time1+time2)/2;
		lastKnownDate = new Date(time3);
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
				tablecontents+="<th id ="+timeHeaderArray[i].startDate.getTime()+">";
				tablecontents+=getDateString(timeHeaderArray[i].startDate, dateFormatId)+"</th>";
				if(i== timeHeaderArray.length-1 && dateFormatId == dateIdDAILY){
					tablecontents+="<th id="+timeHeaderArray[i].endDate.getTime()+">"+getDateString(timeHeaderArray[i].endDate, dateFormatId)+"</th>";
				}
			}
			tablecontents += "</tr>"
			for(var i=0; i<names.length; i++){ //create a row for each firefighter
				tablecontents+="<tr>";
				tablecontents+="<th>";
				tablecontents+= names[i].getFullName();
				for(var j=0; j<timeHeaderArray.length; j++){ //create a cell for each column header
					tablecontents+= "<td class=table-cell>";
					tablecontents+= "</td>";
				}
				if(dateFormatId == dateIdDAILY){
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
	
	//returns an array of DateRanges to be used to calculate table header.
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
	}
	
	//returns an appropriate string for the table header
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
	
	//TODO update db timezone
	//Shades cells that are scheduled
	function refreshCellShading(timeslots, names, dateRange){
		
		var numberOfColumns = document.getElementById('myTable').rows[0].cells.length;
		var timeArray = [];
		for(var n=1; n< numberOfColumns; n++){
			var plus = 1;
			if(n == timeArray.length -1 ){
				plus=0;
			}
			var millis = parseInt(document.getElementById('myTable').rows[0].cells[n].id);
			
			var millis2;
			if(n<numberOfColumns-1) //if not the last col
			{
				millis2 =  parseInt(document.getElementById('myTable').rows[0].cells[n+plus].id);
			}
			else //if the last col
			{
				millis2= millis;
			}
			var startDate = new Date(millis);
			var endDate = new Date(millis2);
			var range = new DateRange(startDate, endDate);
			timeArray.push(range);
		}
		for(var i=0; i<timeslots.length; i++){	
			var firefighterId = timeslots[i].firefighter.firefighterId;
			var startTime = timeslots[i].timeslot;
			var nameIndex = getNameIndex(firefighterId, grabNames);
			//alert(startTime.getStartDate());
			if(nameIndex!=-1)
			{
				for(var timeIndex = 0; timeIndex<numberOfColumns-1; timeIndex++){
					var myCellRange = timeArray[timeIndex];
					if(shadeCell(startTime, myCellRange)){
						document.getElementById('myTable').rows[1+nameIndex].cells[timeIndex+1].setAttribute("bgcolor", "#00FF00");
					}
				}

			}
		}
	}
	
	function shadeCell(timeslot, range){
		var timerange = timeslot.getDateRange();
		return range.harshOverlapsWithDateRange(timerange);
	}
	
	
	//Returns the index of the name in the array, or -1 if name is not found
	function getNameIndex(firefighterId, firefighters){
		for(var n=0; n<firefighters.length; n++){
			if(firefighterId == firefighters[n].firefighterId){
				return n;
			}
		}
		return -1;
	}
	
	//Writes the specified schedule in list form
	function refreshList(divName, timeslots, dateRange){
		var displayedTimeslots = getDisplayedTimeslots(timeslots, dateRange);
		displayedTimeslots = sortTimeslots(displayedTimeslots);
		var listContents = "";
		for(var n=0; n<displayedTimeslots.length; n++){
			listContents+=displayedTimeslots[n].getMidrangeSummary()+"<br>";
		}
		document.getElementById(divName).innerHTML = listContents;
	}

	function getDisplayedTimeslots(timeslots, dateRange){
		var displayedTimeslots = new Array();
		for(var n=0; n<timeslots.length; n++)
		{
			if(displayTimeslot(timeslots[n], dateRange))
			{
				displayedTimeslots.push(timeslots[n]);
			}
		}
		return displayedTimeslots;
	}
	
	function displayTimeslot(timeslot, dateRange){
		if(getSlotListId() == listALLSLOTS){
			return true;
		}
		
		var validRange = dateRange;
		var timeslotRange = timeslot.timeslot.getDateRange();
		if(validRange.overlapsWithDateRange(timeslotRange))
		{
			return true;
		}
		else return false;
	}
	
	
	function sortTimeslots(timeslots){
		timeslots.sort(function(a, b){return a.timeslot.getStartDate()-b.timeslot.getStartDate()}); 
		return timeslots;	
	}
	
	
	//global categorize timeslots
		//already complete
		//partially complete/in progress
		//not yet started
	//colorcode them
	//sort them by starttime
	
	//categorize timeslots - in app
		//within range asked for
		//partially within range asked for
		//not within range asked for
	//only display relevant timeslots
	//sort these by startTime
	
	//CHANGE DATABASE TIMEZONE TO EST
	
	//possible: display/highlight the timeslot that the user hovers over on cell