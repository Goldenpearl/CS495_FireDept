function Fireman(firemanId, firstName, lastName){
	this.firemanId=firemanId;
	this.firstName=firstName;
	this.lastName=lastName;
	
	this.getSummary = function(){
		return "Fireman ("+firemanId+", "+firstName+", "+lastName+")";
	}
}
function Timeslot(timeslotId, startTime, endTime, fireman){
   this.timeslotId=timeslotId;
   this.startTime = startTime;
   this.endTime = endTime;
   this.fireman = fireman;
   this.getAlert = function(){
	    alert("Howdy, my name is " + this.fireman.firstName);
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
   this.isBefore = function(otherTimeslot){
		var startsBeforeOther = isDateBeforeOtherDate(this.startTime, otherTimeslot.startTime);
		var endsBeforeOther = isDateBeforeOtherDate(this.endTime, otherTimeslot.startTime);
		return (startsBeforeOther && endsBeforeOther);
   }
   
   this.isAfter = function(otherTimeslot){
	   var endsAfterOther = isDateAfterOtherDate(this.endTime, otherTimeslot.endTime);
	   var beginsAfterOther = isDateAfterOtherDate(this.startTime, otherTimeslot.endTime);
	   return (endsAfterOther && beginsAfterOther);
   }
   this.isEqual = function(otherTimeslot){
	   var startTimeIsEqual = isDateEqualToOtherDate(this.startTime, otherTimeslot.startTime);
	   var endTimeIsEqual = isDateEqualToOtherDate(this.endTime, otherTimeslot.endTime);
	   return (startTimeIsEqual && endTimeIsEqual);
   }
   this.overlapsWith= function(otherTimeslot){
	   var thisStartsBeforeOtherEnds = isDateBeforeOtherDate(this.startTime, otherTimeslot.endTime);
	   var thisEndsAfterOtherStarts = isDateAfterOtherDate(this,endTime, otherTimeslot.startTime);
	   var overlap = (thisStartsBeforeOtherEnds && thisEndsAfterOtherStarts);
	   
	   var thisStartsAtTheSameTimeOtherEnds = isDateEqualToOtherDate(this.startTime, otherTimeslot.endTime);
	   var thisEndsAtTheSameTimeOtherStarts = isDateEqualToOtherDate(this.endTime, other.startTime);
	   var theseStartAtTheSameTime = isDateEqualToOtherDate(this.startTime, otherTimeslot.startTime);
	   var theseEndAtTheSameTime = isDateEqualToOtherDate(this.endTime, otherTimeslot.endTime);
	   var containsAnOverlap =(thisStartsAtTheSameTimeOtherEnds || thisEndsAtTheSameTimeOtherStarts ||theseStartAtTheSameTime ||theseEndAtTheSameTime);
	   
	   return (overlap || containsAnOverlap);
   }
}
function isDateBeforeOtherDate(date, otherDate){
	return (date<otherDate);
}

function isDateAfterOtherDate(date, otherDate){
	return (date>otherDate);
}

function isDateEqualToOtherDate(date, otherDate){
	return (date === otherDate);
}

function ScheduleTimeslot(fireman, timeslot){
	this.fireman = fireman;
	this.timeslot = timeslot;
	
	this.getSummary = function(){
		return "ScheduleTimeslot ("+timeslot.getSummary()+", "+fireman.getSummary()+")";
	}
}

function parseScheduleTimeslot(json){
	var ob = JSON.parse(json);
	var firstName = ob.ScheduleTimeslot.Firefighter.firstName;
	var lastName = ob.ScheduleTimeslot.Firefighter.lastName;
	var firemanId = ob.ScheduleTimeslot.Firefighter.id;
	var startTime = ob.ScheduleTimeslot.Timeslot.startTime;
	var endTime = ob.ScheduleTimeslot.Timeslot.endTime;
	var timeslotId = ob.ScheduleTimeslot.Timeslot.timeslotId
	var fireman = new Fireman(firemanId, firstName, lastName);
	var timeslot = new Timeslot(timeslotId,startTime, endTime, fireman);
	var scheduletimeslot = new ScheduleTimeslot(fireman, timeslot);
	return scheduletimeslot;
}

function parseScheduleTimeslots(json){
	var ob = JSON.parse(json);	
	var timeslots = new Array();
	for(var n=0; n<1; n++){ //TODO find ob size
		var fireman = new Fireman(ob.ScheduleTimeslot[0].fireman.firemanId, ob.ScheduleTimeslot[0].fireman.firstName, ob.ScheduleTimeslot[0].fireman.lastName);
		var timeslot = new Timeslot(ob.ScheduleTimeslot[0].timeslot.timeslotId, ob.ScheduleTimeslot[0].timeslot.startTime, ob.ScheduleTimeslot[0].timeslot.endTime, fireman);
		var scheduletimeslot = new ScheduleTimeslot(fireman, timeslot);
		timeslots.push(scheduletimeslot);
	};
	return timeslots;
}

var texts = '{ "ScheduleTimeslot" : {' +
	'"Firefighter":{'+
	'"firstName":"Bob",'+
	'"lastName":"Jo",'+
	'"firemanId":"12"'+
	'},'+
	'"timeslot":{'+
	'"startTime":"12",'+
	'"endTime":"1",'+
	'"firemanId":"12",'+
	'"timeslotId":"1"'+
	'}'+
'}}';


var textss = '{ "ScheduleTimeslot" : [' +
	'{"Firefighter":{'+
	'"firstName":"James",'+
	'"lastName":"Jo",'+
	'"firemanId":"12"'+
	'},'+
	'"timeslot":{'+
	'"startTime":"12",'+
	'"endTime":"1",'+
	'"firemanId":"12",'+
	'"timeslotId":"1"'+
	'}}'+
']}';
function testParsing(){
	var s = parseScheduleTimeslot(texts);
	s.timeslot.getAlert();
}
// Instantiate new objects with 'new'
var fireman = new Fireman("1", "Bob", "M");
var timeslot = new Timeslot(1, "1","1",fireman);
var s = parseScheduleTimeslot(texts);
var ss = parseScheduleTimeslots(textss);
ss[0].timeslot.getAlert();
testParsing();