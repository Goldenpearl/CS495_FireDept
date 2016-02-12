function Fireman(firemanId, firstName, lastName){
	this.firemanId=firemanId;
	this.firstName=firstName;
	this.lastName=lastName;
}
function Timeslot(timeslotId, startTime, endTime, fireman){
   this.timeslotId=timeslotId;
   this.startTime = startTime;
   this.endTime = endTime;
   this.fireman = fireman;
   this.getAlert = function(){
	    alert("Howdy, my name is " + this.fireman.firstName);
   }
}

function ScheduleTimeslot(fireman, timeslot){
	this.fireman = fireman;
	this.timeslot = timeslot;
}

function parseScheduleTimeslot(json){
	var ob = JSON.parse(json);
	var fireman = new Fireman(ob.ScheduleTimeslot.fireman.firemanId, ob.ScheduleTimeslot.fireman.firstName, ob.ScheduleTimeslot.fireman.lastName);
	var timeslot = new Timeslot(ob.ScheduleTimeslot.timeslot.timeslotId, ob.ScheduleTimeslot.timeslot.startTime, ob.ScheduleTimeslot.timeslot.endTime, fireman);
	var scheduletimeslot = new ScheduleTimeslot(fireman, timeslot);
	return scheduletimeslot;
}

var texts = '{ "ScheduleTimeslot" : {' +
	'"fireman":{'+
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

// Instantiate new objects with 'new'
var fireman = new Fireman("1", "Bob", "M");
var timeslot = new Timeslot(1, "1","1",fireman);
var s = parseScheduleTimeslot(texts);

function testParsing(){
	var s = parseScheduleTimeslot(texts);
	s.timeslot.getAlert();
}
testParsing();