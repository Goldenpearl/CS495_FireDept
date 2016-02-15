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


var textss = '{ "ScheduleTimeslot" : [' +
	'{"fireman":{'+
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