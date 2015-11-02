<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>jQuery UI Datepicker - Default functionality</title>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
  <link rel="stylesheet" href="/resources/demos/style.css">
  <script>
  $(function() {
    $( "#datepicker" ).datepicker();
  });
  </script>
</head>
<body>
 
<p>Date: <input type="text" id="datepicker"> </p>
<script>
var options = $( ".selector" ).datepicker( "option" );
$(function(){
        $("#to").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#from").datepicker({ dateFormat: 'yy-mm-dd' }).bind("change",function(){
            var minValue = $(this).val();
            minValue = $.datepicker.parseDate("yy-mm-dd", minValue);
            minValue.setDate(minValue.getDate()+1);
            $("#to").datepicker( "option", "minDate", minValue );
        })
    });

</script>

<script>
var dateFormat
 $(function(){
        $("#to").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#from").datepicker({ dateFormat: 'yy-mm-dd' }).bind("change",function(){
            var minValue = $(this).val();
            minValue = $.datepicker.parseDate("yy-mm-dd", minValue);
            minValue.setDate(minValue.getDate()+1);
            $("#to").datepicker( "option", "minDate", minValue );
        })
    });
</script>
Start Time:<input type='time' name='start_time' id= 'startTime'>End Time:<input type='time' name='end_time' id='endTime'>
<br></br>

<p>
Week
<select name="formGender">
	<option value="">Select...</option>
	<option value="">Monday</option>
	<option value="">Tuesday</option>
	<option value="">Wednesday</option>
	<option value="">Thursday</option>
	<option value="">Friday</option>
	<option value="">Saturday</option>
	<option value="">Sunday</option>
</select>
</p>

<script>
function submitDate() {
	var firemanId = document.getElementById("fireman_select").value;
	var availibleSlot = false;
	var scheduleSlot = false;
	var startDate= "";
	var startTime="";
	var endTime="";
	var date =getStartDatetime();
	var date2=getEndDatetime();
	
	if(document.getElementById("availible").checked==true){
		availibleSlot=true;
	}
	else if(document.getElementById("schedule").checked ==true){
		scheduleSlot=true;
	}
	var queryString = "";
	var tableString =""
	if(availibleSlot){
		tableString ="AvailibleTimeslot";
	}
	else if(scheduleSlot){
		tableString ="ScheduleTimeslot";
	}
	
	queryString+="INSERT INTO timeslot(startDate, endDate) VALUES("
	queryString+= date
	queryString+=", "
	queryString+= date2
	queryString+="); "
	queryString+="INSERT INTO "
	queryString+=tableString
	queryString+=" (timeslotId, firemanId) VALUES ("
	queryString+="??"
	queryString+=", "
	queryString+=firemanId;
	queryString+=");";
	alert(queryString);
}	
function getStartDatetime(){
	var date = document.getElementById("dateEntry").value;
	var date2 = document.getElementById("startTime").value;
	return '"'+date +" "+ date2+'"'; //"start time and date";
}
function getEndDatetime(){
	
	var date = document.getElementById("dateEntry").value;
	var date2 = document.getElementById("endTime").value;
	return '"'+date +" "+ date2+'"'; //"start time and date";
}
</script>

<style type="text/css">
  ul {list-style: none;padding: 0px;margin: 0px;}
  ul li {display: block;position: relative;float: left;border:1px solid #000}
  li ul {display: none;}
  ul li a {display: block;background: #000;padding: 5px 10px 5px 10px;text-decoration: none;
           white-space: nowrap;color: #fff;}
  ul li a:hover {background: #f00;}
  li:hover ul {display: block; position: absolute;}
  li:hover li {float: none;}
  li:hover a {background: #f00;}
  li:hover li a:hover {background: #000;}
  #drop-nav li ul li {border-top: 0px;}
</style>

<ul id="drop-nav">

  <li><a href="#">Day</a>
    <ul>
      <li><a href="#">Monday</a></li>
      <li><a href="#">Tuesday</a></li>
      <li><a href="#">Wednesday</a></li>
      <li><a href="#">Thursday</a></li>
	  <li><a href="#">Friday</a></li>
	  <li><a href="#">Saturday</a></li>
	  <li><a href="#">Sunday</a></li>
    </ul>
  </li>
  <li><a href="#">Week</a>
    <ul>
      <li><a href="#"></a></li>
      <li><a href="#"></a></li>
      <li><a href="#"></a></li>
      <li><a href="#"></a></li>
	  <li><a href="#"></a></li>
	  <li><a href="#"></a></li>
	  <li><a href="#"></a></li>
    </ul>
  </li>
  
  <li><a href="#">Month</a>
    <ul>
      <li><a href="#"></a></li>
      <li><a href="#"></a></li>
      <li><a href="#"></a></li>
      <li><a href="#"></a></li>
	  <li><a href="#"></a></li>
	  <li><a href="#"></a></li>
	  <li><a href="#"></a></li>
    </ul>
  </li>
 
  </li>
</ul>

<br></br>
<br></br>
<br></br>
<html>
<body>

<table border="1" style="width:100%">
  <tr>
    <td>Time</td>
    <td>Monday</td>		
    <td>Tuesday</td>
	<td>Wednesday</td>
	<td>Thursday</td>
	<td>Friday</td>
	<td>Saturday</td>
	<td>Sunday</td>
	
  </tr>
  <tr>
    <td>Time</td>
    <td></td>		
    <td></td>
	<td></td>
    <td></td>		
    <td></td>
    <td></td>		
    <td></td>
  </tr>
  <tr>
    <td>Time</td>
    <td></td>		
    <td></td>
	<td></td>
    <td></td>		
    <td></td>
    <td></td>		
    <td></td>
  </tr>
    <tr>
    <td>Time</td>
    <td></td>		
    <td></td>
	<td></td>
    <td></td>		
    <td></td>
    <td></td>		
    <td></td>
  </tr>
    <tr>
    <td>Time</td>
    <td></td>		
    <td></td>
	<td></td>
    <td></td>		
    <td></td>
    <td></td>		
    <td></td>
  </tr>
    <tr>
    <td>Time</td>
    <td></td>		
    <td></td>
	<td></td>
    <td></td>		
    <td></td>
    <td></td>		
    <td></td>
  </tr>
    <tr>
    <td>Time</td>
    <td></td>		
    <td></td>
	<td></td>
    <td></td>		
    <td></td>
    <td></td>		
    <td></td>
  </tr>
</table>

</body>
</html>