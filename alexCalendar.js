
var tableId = "tableId";

function loadPage(){
	drawCurrentCalendar();
	drawEventBox();
}

function drawCurrentCalendar(){
	drawCalendar(new Date());
}

function drawEventBox(){
	var eventString = "";
	eventString += "Hi";
	document.getElementById("myUI").innerHTML = eventString;
}


function drawCalendar(date) {
	var tableString = "";
	tableString += "<p class='text-center'>";
	tableString += "<button> &lt </button>";
	tableString += "<strong> "
	tableString += getMonthName(date);
	tableString += " </strong>";
	//tableString += "<p class='text-center'> <Feb </p>";
	tableString += "<button> &gt </button>";
	tableString += "</p>";
	tableString += "<table class='table table-bordered' id = '";
	tableString += tableId;
	tableString += "'>";
	tableString += "<th> Sunday </th> <th> Monday </th> <th> Tuesday </th> <th> Wednesday </th> <th> Thursday </th> <th> Friday </th> <th> Saturday </th>";
	var monthHasBegun = false;
	var numberOfDaysInPreviousMonth = getNumberOfDaysInMonth(date);
	var weekdayOfFirstMonth = getFirstOfMonth(date);
	var numberOfDaysInMonth = getNumberOfDaysInMonth(date);
	var monthHasEnded = false;
	var currentNumber = numberOfDaysInPreviousMonth-weekdayOfFirstMonth;
	for (var r = 0; r < 6; r++) {
		tableString += "<tr>";
		for (var i = 0; i < 7; i++) {
			if(!monthHasBegun)
			{
				if(i>=weekdayOfFirstMonth){
					monthHasBegun=true;
					currentNumber=0;
				}
			}
			currentNumber++;
			if(currentNumber>numberOfDaysInMonth){
				currentNumber=1;
				monthHasEnded=true;
			}
			tableString += "<td style='width:5%' class='table-active'>";
			tableString += currentNumber;
			tableString += "</td>";
		}
	tableString += "</tr>";
	}
	tableString += "</table>";
	
	document.getElementById("myTable").innerHTML = tableString;
	addOnClickEventsToCalendar();
}

function addOnClickEventsToCalendar(){
	var table = document.getElementById(tableId);
	if (table != null) {
		for (var i = 0; i < table.rows.length; i++) {
			for (var j = 0; j < table.rows[i].cells.length; j++){
				table.rows[i].cells[j].onclick = calendarOnClickFunction;
			}
		}
	}
}

function calendarOnClickFunction(){
	
}

/*returns a number from 0-6 corresponding to a weekday. The weekday cooresponds to the 1st day of the month.*/
function getFirstOfMonth(date){
	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
	var weekday = firstDay.getDay();
	return weekday;
	
}
/*returns a number from 1-31 which corresponds to the total number of days in the given month.*/
function getNumberOfDaysInMonth(date){
	var lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0);
	var number = lastDay.getDate();
	return number;
}

function getMonthName(date){
	var monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"];
	return monthNames[date.getMonth()];
}