
var tableId = "tableId";
var NEW_EVENT_ID = 1;
var CURRENT_EVENT_ID = 2;
var EDIT_EVENT_ID = 3;
var SIGN_UP_EVENT_ID = 4;
var currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1, 3);
var selectedCalendarDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1, 3);
var selectedEvent= "b";
var loadedEvents = [];
var firefighters =[];
var apparatus = [];
var timeslots =[];
function loadPage(){
	initializeEvents();
	drawCalendar(); //comment this out to test
}

function initializeEvents(){
	var ash = new Firefighter(1, "Ash", "Ketchum", "catch_em_all@pokemonrules.com", 5745497353, 5745497353);
	var misty = new Firefighter(2, "Misty", "Bubbles", "water_sport@pokemonrules.com", 5745497353, 5745497353);
	var brock = new Firefighter(3, "Brock", "Rock", "onyx@pokemonrules.com", 5745497353, 5745497353);
	var big_truck = new Apparatus("Big truck", "Its Huge!", 16, 1);
	var medium_truck = new Apparatus("Medium Truck", "A truck.", 8, 2);
	var small_truck = new Apparatus ("Small Truck", "A Baby Truck!", 4, 3);
	var bStartDate = new Date();
	bStartDate.setHours(3);
	var birthdayTimeslot = new Timeslot(1, bStartDate, new Date());
	var newYearTimeslot = new Timeslot(2, new Date(), new Date());
	var bday_party = new MyEvent("Ash's Birthday", "Happy B-Day!", birthdayTimeslot, 1);
	var new_year_eve = new MyEvent("New Year's Eve", "Yay", newYearTimeslot, 2);
	loadedEvents.push(bday_party);
	loadedEvents.push(new_year_eve);
	firefighters.push(ash);
	firefighters.push(misty);
	firefighters.push(brock);
	apparatus.push(big_truck);
	apparatus.push(medium_truck);
	apparatus.push(small_truck);
	timeslots.push(birthdayTimeslot);
	timeslots.push(newYearTimeslot);
	var assignedSmallTruckToBirthday = (bday_party, small_truck, 1);
	var assignedAshToBirthday = new AssignedFirefighter(bday_party, small_truck, ash, 1);
	//document.writeln(ash.getSummary()); //comment this out to draw calendar
}

/*** Draw Calendar ****/
function drawCalendar() {
	var tableString = "";
	tableString += "<p class='text-center'>";
	tableString += "<button onclick = 'changeCalendarMonth(-1)'> &lt </button>";
	tableString += "<strong> "
	tableString += getMonthName(currentMonth);
	tableString += " ";
	tableString += currentMonth.getFullYear();
	tableString += " </strong>";
	//tableString += "<p class='text-center'> <Feb </p>";
	tableString += "<button onclick = 'changeCalendarMonth(1)'> &gt </button>";
	tableString += "</p>";
	tableString += "<table class='table table-bordered' id = '";
	tableString += tableId;
	tableString += "'>";
	tableString += "<th> Sunday </th> <th> Monday </th> <th> Tuesday </th> <th> Wednesday </th> <th> Thursday </th> <th> Friday </th> <th> Saturday </th>";
	var monthHasBegun = false;
	var numberOfDaysInPreviousMonth = getNumberOfDaysInPreviousMonth(currentMonth);
	var weekdayOfFirstMonth = getFirstWeekdayOfMonth(currentMonth);
	var numberOfDaysInMonth = getNumberOfDaysInMonth(currentMonth);
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
			if(monthHasBegun && currentNumber>numberOfDaysInMonth){
				currentNumber=1;
				monthHasEnded=true;
			}
			tableString += "<td style='width:5%' class='table-active' onclick = "
			tableString += getCalendarOnClickString(currentMonth, 7*r +i);
			tableString += ">";
			tableString += currentNumber;
			tableString += "</td>";
		}
	tableString += "</tr>";
	}
	tableString += "</table>";
	
	document.getElementById("myTable").innerHTML = tableString;
}

function changeCalendarMonth(delta){
	currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth()+delta, 1, 3);
	drawCalendar();
}

function calendarOnClickFunction(date){
	selectedCalendarDay = date;
	drawEventList();
}

function getCalendarOnClickString(date, additionalDays){
	var startDate = getFirstDateOnCalendar(date);
	var currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+additionalDays, 3);
	var dateNumber = currentDate.getTime();
	var clickString = "'calendarOnClickFunction(new Date(";
	clickString += dateNumber;
	clickString+="))'";
	return clickString;
	
}

/* returns the date cooresponding to the first date on the calendar. Always a sunday. */
function getFirstDateOnCalendar(date){
	
	var firstDayOfCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1, 3);
	var firstWeekdayOfCurrentMonth = getFirstWeekdayOfMonth(date);
	var firstDayOnCalendar;
	if(firstDayOfCurrentMonth == 0){
		firstDayOnCalendar = new Date(date.getFullYear(), date.getMonth(), 1, 3);
	}
	else{
		var numberOfDaysInPreviousMonth = getNumberOfDaysInPreviousMonth(date);
		firstDayOnCalendar = new Date(date.getFullYear(), date.getMonth()-1, numberOfDaysInPreviousMonth-(firstWeekdayOfCurrentMonth-1), 3);
	}
	//alert("First Date on Calendar: "+firstDayOnCalendar);
	return firstDayOnCalendar;
}

/*returns a number from 0-6 corresponding to a weekday. The weekday cooresponds to the 1st day of the month.*/
function getFirstWeekdayOfMonth(date){
	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1, 3);
	var weekday = firstDay.getDay();
	//alert("First Weekday of Month:"+weekday);
	return weekday;
	
}
/*returns a number from 1-31 which corresponds to the total number of days in the given month.*/
function getNumberOfDaysInMonth(date){
	var lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0, 3);
	var number = lastDay.getDate();
	//alert("numberOfDaysInMonth:" + number);
	return number;
}

function getNumberOfDaysInPreviousMonth(date){
	var lastMonth = new Date(date.getFullYear(), date.getMonth()-1, 1, 3);
	return getNumberOfDaysInMonth(lastMonth);
}

function getMonthName(date){
	var monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"];
	return monthNames[date.getMonth()];
}


/***Draw Event List***/
function drawEventList(){
	var eventString = "";
	var events = loadedEvents;
	eventString +="<h3> Events </h3>";
	eventString += "<table class = 'event-table'>"
	eventString +="<tr onclick = 'newEventClick()'>";
	eventString +="<td>";
	eventString += "Create New Event";
	eventString += "</td>"
	eventString +="</tr>"
	for(var r=0; r<events.length; r++){
		eventString +="<tr onclick = 'eventClick("+r+")'>";
		eventString +="<td>";
		eventString += events[r].eventName;
		eventString += "</td>"
		eventString +="</tr>"
	}
	eventString += "</table>"
	eventString += "<button onclick = 'resetEventBox()'> Back </button>"
	document.getElementById("myUI").innerHTML = eventString;
}

function newEventClick(){
	drawBlankEventBox(NEW_EVENT_ID);
	document.getElementById("eventDate").value = convertDateToDateInputValue(selectedCalendarDay);
}

function convertDateToDateInputValue(date){
	var month = date.getMonth()+1;
	var monthString="";
	if(month<10){
		monthString+="0";
	}
	monthString +=month;
	var dayOfMonth = date.getDate();
	var dayOfMonthString = "";
	if(dayOfMonth<10){
		dayOfMonthString+=0;
	}
	dayOfMonthString+=dayOfMonth;
	var year = date.getFullYear();
	var inputValue = year+"-"+monthString+"-"+dayOfMonthString;
	return inputValue;
}
function convertDateToTimeInputValue(date){
	var two_digit_hours = date.getHours();
	if (date.getHours() < 10) {
		two_digit_hours = "0" + date.getHours();
	}
	var two_digit_minutes= date.getMinutes();
	if (date.getMinutes() < 10) {
		two_digit_minutes = "0" + date.getMinutes();
	}
	var inputValue = (two_digit_hours+":"+two_digit_minutes+":00");
	return inputValue;
}


function eventClick(eventIndex){
	selectedEvent = loadedEvents[eventIndex];
	drawEventBox(selectedEvent, CURRENT_EVENT_ID);
}

function editEventClick(){
	drawEventBox(selectedEvent, EDIT_EVENT_ID);
}

function signUpEventClick(){
	drawEventBox(selectedEvent, SIGN_UP_EVENT_ID);
}

/***Draw Event Information ***/
function drawBlankEventBox(id){
	var eventString = "";
	var disabledString = "";
	if (id == CURRENT_EVENT_ID || id == SIGN_UP_EVENT_ID){
		disabledString="disabled";
	}
	//eventString += "<form>";
	eventString += "Event name:<br>";
	eventString += "<input type='text' id='eventName'";
	eventString += disabledString;
	eventString += "><br>";
	eventString += "Event date:<br>";
	eventString += "<input type='date' id = 'eventDate'";
	eventString += disabledString;
	eventString += "><br>";
	eventString += "<table class = 'timetable'><tr>";
	eventString += "<td>Start time:</td>";
	eventString += "<td>End time:</td></tr>";
	eventString += "<tr><td><input type='time' id='eventStartTime' step = '900'";
	eventString += disabledString;
	eventString += "></td>";
	eventString += "<td><input type='time' id='eventEndTime' step = '900'";
	eventString += disabledString;
	eventString += "><td></tr></table>";
	eventString += "Location:<br>";
	eventString += "<input type='text' id='eventLocation'";
	eventString += disabledString;
	eventString += "><br>";
	eventString += "Description: <br>"
	eventString += "<textarea id ='eventDescription' rows = '4' cols = '50'";
	eventString += disabledString;
	eventString += "></textarea><br>";
	eventString += "Apparatus:<br>";
	eventString += "<textarea id = 'selectedApparatusTextArea' rows = '6' cols = '50' disabled>"
	eventString += "</textarea><br>";
	
	if(id == NEW_EVENT_ID || id == EDIT_EVENT_ID){
		eventString += getUnusedApparatusSelectString();
		eventString += "<button> Add </button>";
		eventString += getUsedApparatusSelectString();
		eventString += "<button> Remove </button><br><br>";
	}
	else if(id == SIGN_UP_EVENT_ID){
		eventString += "<br>Apparatus";
		eventString += getUsedApparatusSelectString();
		eventString += "Seat <select id = 'seats'>";
		eventString += "</select><br><br>";
	}
	eventString += getEventBoxButtons(id);
	//eventString += "</form>";
	document.getElementById("myUI").innerHTML = eventString;
}

function drawEventBox(calendarEvent, id){
	drawBlankEventBox(id);
	document.getElementById("eventName").value=calendarEvent.eventName;
	document.getElementById("eventDate").value=convertDateToDateInputValue(calendarEvent.timeslot.startTime);
	document.getElementById("eventStartTime").value=convertDateToTimeInputValue(calendarEvent.timeslot.startTime);
	document.getElementById("eventEndTime").value=convertDateToTimeInputValue(calendarEvent.timeslot.endTime);
	document.getElementById("eventLocation").value= "Hawaii";
	document.getElementById("eventDescription").value=calendarEvent.eventDescription;
	}

function getEventBoxButtons(eventId){
	var eventBoxButtonString ="";
	if(eventId == NEW_EVENT_ID){
		eventBoxButtonString +="<button onclick = 'createCalendarEvent()'> Create Event </button>";
		eventBoxButtonString += "<br><br><button onclick = 'backToEventList()'> Back </button>";
	}
	else if (eventId == CURRENT_EVENT_ID)
	{	eventBoxButtonString +="<button onclick = 'signUpEventClick()'> I Want to Sign Up</button><br><br>";
		eventBoxButtonString +="<button onclick = 'editEventClick()'> Edit Event </button>";
		eventBoxButtonString +="<button onclick = 'deleteCalendarEvent()'> Delete Event </button>";
		eventBoxButtonString += "<br><br><button onclick = 'backToEventList()'> Back </button>";
	}
	else if(eventId == EDIT_EVENT_ID){
		eventBoxButtonString += "<button onclick = 'saveChangesClick()'> Save Changes </button>";
		eventBoxButtonString += "<button onclick = 'discardChangesClick()'> Discard Changes </button>";
		eventBoxButtonString += "<br><br><button onclick = 'backToEventView()'> Back </button>";
	}
	else if (eventId == SIGN_UP_EVENT_ID){
		eventBoxButtonString += "<button onclick = 'backToEventView()'> Sign up </button><br><br>";
		eventBoxButtonString += "<br><br><button onclick = 'backToEventView()'> Back </button>";
	}
	return eventBoxButtonString;
}

function resetEventBox(){
	var defaultString = "";
	document.getElementById("myUI").innerHTML = defaultString;
}

function backToEventList(){
	drawEventList(selectedCalendarDay);
}

function backToEventView(){
	drawEventBox(selectedEvent, CURRENT_EVENT_ID)
}
function discardChangesClick(){
	backToEventView();
}

function saveChangesClick(){
	backToEventView();
}
/***Process Event Changes ***/
function editCalendarEvent(){
	var reallyEdit = runConfirmationBox();
	backToEventView();
}

function createCalendarEvent(){
	backToEventList();
}

function deleteCalendarEvent(){
	var reallyDelete = runConfirmationBox();
	if(reallyDelete){
		backToEventList();
	}
}

function runConfirmationBox(){
	return confirm("Are you sure you want");
}

function getUnusedApparatusSelectString(){
	apparatusString = "";
	apparatusString += "<select id = 'unusedApparatusSelect'>";
	apparatusString += "</select>";
	return apparatusString;
}

function getUsedApparatusSelectString(){
	apparatusString = "";
	apparatusString += "<select id = 'apparatusSelect'>";
	apparatusString += "</select>";
	return apparatusString;
}
