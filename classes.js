function Firefighter(firefighterId, firstName, lastName){
	this.firefighterId=firefighterId;
	this.firstName=firstName;
	this.lastName=lastName;
	
	this.getFullName = function(){
		return this.firstName + " " + this.lastName;
	}
	
	this.getSummary = function(){
		return "Firefighter ("+firefighterId+", "+firstName+", "+lastName+")";
	}
	this.getJson = function(){
		return '{"Firefighter":{"firefighterId":"'+
				this.firefighterId+
				'", "firstName":"'+
				this.firstName +
				'", "lastName":"'+
				this.lastName+
				'"}}';
				
	}
}
function Timeslot(timeslotId, startTime, endTime, firefighter){
   this.timeslotId=timeslotId;
   this.startTime = startTime;
   this.endTime = endTime;
   this.firefighter = firefighter;
   this.getAlert = function(){
	    alert("Howdy, my name is " + this.firefighter.firstName);
   }
	this.getStartDate = function(){
		var dateStr = startTime.replace(" ", "T");
		return new Date(dateStr);
	}
	this.getEndDate = function(){
		var dateStr = endTime.replace(" ","T");
		return new Date(dateStr);
	}
   this.getSummary = function(){
	   return "Timeslot ("+timeslotId+", "+startTime+", "+endTime+")";
   }
 
   this.getDateRange = function(){
		return new DateRange(this.getStartDate(), this.getEndDate());
   }
}

function validDateGetter(){
	var dateBuffer = 60;// 60 day buffer
	this.getEarliestValidDate = function(){
		var dt = new Date(); //current date
		dt.setHours(0,0,0,0); //set to midnight
		dt.setDate(dt.getDate() - dateBuffer); 
		return dt;
	}
	this.getLatestValidDate = function(){
		var dt = new Date(); //current date
		dt.setHours(23,59,59,99) // date set to almost midnightTomorrow;
		dt.setDate(dt.getDate() + dateBuffer);
		return dt;
	}
}

function DateRange(startDate, endDate){
	this.startDate =startDate;
	this.endDate= endDate;
	
	this.getSummary = function(){
		return "Start: "+this.startDate+", End: "+this.endDate;
	}
	
	this.isBeforeDateRange = function(dateRange){
		var startsBeforeOther = isDateBeforeOtherDate(this.startDate, dateRange.startDate);
		var endsBeforeOther = isDateBeforeOtherDate(this.startDate, dateRange.startDate);
		return (startsBeforeOther && endsBeforeOther);
   }
   
   this.isAfterDateRange = function(dateRange){
	   var endsAfterOther = isDateAfterOtherDate(this.endDate, dateRange.endDate);
	   var beginsAfterOther = isDateAfterOtherDate(this.endDate, dateRange.endDate);
	   return (endsAfterOther && beginsAfterOther);
   }
   
    this.isEqualToDateRange = function(dateRange){
	   var endDatesEqual = isDateEqualToOtherDate(this.endDate, dateRange.endDate);
	   var startDatesEqual = isDateEqualToOtherDate(this.startDate, dateRange.startDate);
	   return (endDatesEqual && startDatesEqual);
   }

   this.overlapsWithDateRange= function(dateRange){
	   var thisStartsBeforeOtherEnds = isDateBeforeOtherDate(this.startDate, dateRange.endDate);
	   var thisEndsAfterOtherStarts = isDateAfterOtherDate(this.endDate, dateRange.startDate);
	   var overlap = (thisStartsBeforeOtherEnds && thisEndsAfterOtherStarts);
	   
	   var thisStartsAtTheSameTimeOtherEnds = isDateEqualToOtherDate(this.startDate, dateRange.endDate);
	   var thisEndsAtTheSameTimeOtherStarts = isDateEqualToOtherDate(this.endDate, dateRange.startDate);
	   var theseStartAtTheSameTime = isDateEqualToOtherDate(this.startDate, dateRange.startDate);
	   var theseEndAtTheSameTime = isDateEqualToOtherDate(this.endDate, dateRange.endDate);
	   var containsAnOverlap =(thisStartsAtTheSameTimeOtherEnds || thisEndsAtTheSameTimeOtherStarts ||theseStartAtTheSameTime ||theseEndAtTheSameTime);
	   
	   return(overlap || containsAnOverlap);
   }

   this.harshOverlapsWithDateRange = function(dateRange){
	   var thisStartsBeforeOtherEnds = isDateBeforeOtherDate(this.startDate, dateRange.endDate);
	   var thisEndsAfterOtherStarts = isDateAfterOtherDate(this.endDate, dateRange.startDate);
	   var overlap = (thisStartsBeforeOtherEnds && thisEndsAfterOtherStarts);
	   return overlap;
   }
	
}

function simpleDate(date){
	return getMonth(date.getMonth())+" "+date.getDate()+", "+date.getFullYear();
}

function getMonth(month){
	if(month ==0)
		return "January";
	if(month==1)
		return "February";
	if(month==2)
		return "March";
	if(month==3)
		return "April";
	if(month ==4)
		return "May";
	if(month==5)
		return "June";
	if(month==6)
		return "July";
	if(month ==7)
		return "August";
	if(month ==8)
		return "September";
	if(month == 9)
		return "October";
	if(month ==10)
		return "November";
	if(month == 11)
		return "December";
}


function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function isDateBeforeOtherDate(date, otherDate){
	return (date<otherDate);
}

function isDateAfterOtherDate(date, otherDate){
	return (date>otherDate);
}

function isDateEqualToOtherDate(date, otherDate){
	return (date.getTime() === otherDate.getTime());
}

//TODO implement id
function ScheduleTimeslot(firefighter, timeslot, scheduleTimeslotId){
	this.firefighter = firefighter;
	this.timeslot = timeslot;
	this.scheduleTimeslotId = scheduleTimeslotId;
	this.getLiteralSummary = function(){
		return "ScheduleTimeslot ("+timeslot.getSummary()+", "+firefighter.getSummary()+")";
	}
	
	this.getCleanSummary = function(){
		return firefighter.getFullName() + "&nbsp ("+simpleDate(timeslot.getStartDate()) + " - "+simpleDate(timeslot.getEndDate()) +")";
	}
	
	this.getMidrangeSummary = function(){
		return firefighter.firefighterId + "&nbsp&nbsp"+firefighter.getFullName() + "&nbsp Schedule ("+simpleDate(timeslot.getStartDate()) + " - "+simpleDate(timeslot.getEndDate()) +") &nbspTID:" +this.timeslot.timeslotId +" &nbsp SID:"+scheduleTimeslotId;
	}
	
}

function parseFirefighter(json){
	var ob = JSON.parse(json);
	var firefighterId = ob.firefighterId;
	var firstName = ob.firstName;
	var lastName = ob.lastName;
	var firefighter = new Firefighter(firefighterId, firstName, lastName);
	return firefighter;
}


function parseScheduleTimeslot(json){
	var ob = JSON.parse(json);
	var firstName = ob.ScheduleTimeslot.Firefighter.firstName;
	var lastName = ob.ScheduleTimeslot.Firefighter.lastName;
	var firefighterId = ob.ScheduleTimeslot.Firefighter.firefighterId;
	var startTime = ob.ScheduleTimeslot.Timeslot.startTime;
	var endTime = ob.ScheduleTimeslot.Timeslot.endTime;
	var timeslotId = ob.ScheduleTimeslot.Timeslot.timeslotId
	var firefighter = new Firefighter(firefighterId, firstName, lastName);
	var timeslot = new Timeslot(timeslotId,startTime, endTime, firefighter);
	var scheduleTimeslotId = ob.ScheduleTimeslot.scheduleTimeslotId;
	var scheduletimeslot = new ScheduleTimeslot(firefighter, timeslot, scheduleTimeslotId);
	return scheduletimeslot;
}


function parseScheduleTimeslots(json){
	var ob = JSON.parse(json);	
	var timeslots = new Array();
	for(var n=0; n<1; n++){ //TODO find ob size
		var firefighter = new Firefighter(ob.ScheduleTimeslot[0].Firefighter.firefighterId, ob.ScheduleTimeslot[0].Firefighter.firstName, ob.ScheduleTimeslot[0].Firefighter.lastName);
		var timeslot = new Timeslot(ob.ScheduleTimeslot[0].Timeslot.timeslotId, ob.ScheduleTimeslot[0].Timeslot.startTime, ob.ScheduleTimeslot[0].Timeslot.endTime, firefighter);
		var scheduleTimeslotId = ob.ScheduleTimeslot.scheduleTimeslotId;
		var scheduletimeslot = new ScheduleTimeslot(firefighter, timeslot, scheduleTimeslotId);
		timeslots.push(scheduletimeslot);
	};
	return timeslots;
}

var texts = '{ "ScheduleTimeslot" : {' +
	'"scheduleTimeslotId": "12",'+
	'"Firefighter":{'+
	'"firstName":"Bob",'+
	'"lastName":"Jo",'+
	'"firefighterId":"12"'+
	'},'+
	'"Timeslot":{'+
	'"startTime":"12",'+
	'"endTime":"1",'+
	'"firefighterId":"12",'+
	'"timeslotId":"1"'+
	'}'+
'}}';


var textss = '{ "ScheduleTimeslot" : [{' +
	'"scheduleTimeslotId": "12",'+
	'"Firefighter":{'+
	'"firstName":"James",'+
	'"lastName":"Jo",'+
	'"firefighterId":"12"'+
	'},'+
	'"Timeslot":{'+
	'"startTime":"12",'+
	'"endTime":"1",'+
	'"firefighterId":"12",'+
	'"timeslotId":"1"'+
	'}}'+
']}';
function testParsing(){
	var s = parseScheduleTimeslot(texts);
	s.timeslot.getAlert();
}
// Instantiate new objects with 'new'
var firefighter = new Firefighter("1", "Bob", "M");
var timeslot = new Timeslot(1, "1","1",firefighter);
var s = parseScheduleTimeslot(texts);
var ss = parseScheduleTimeslots(textss);
ss[0].timeslot.getAlert();
testParsing();