<!DOCTYPE html>

<html>
<head>
<style>
table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}
th, td {
    padding: 5px;
    text-align: left;    
}
.scrollit {
	overflow:scroll;
	height:100px;
</style>
 </head>
<body>
<!--
<script>
function shadeCells(){
 var x = document.getElementById("Fireman").rows.length;
 var id = document.getElementById("Fireman").rows.item(0).id;
 document.getElementById("Fireman").rows.item(0).cells.item(0).style.backgroundColor="green";
 alert(id);
}

</script>

<h1> Hello, (name/username) (Admin/NonAdmin) </h1>
<br>
<h3>Date: xx/xx/20xx (the date would be pulled from the drop down
that chose what date to be used)</h3>
<button type="button">Add Time </button>
<br>
<br>
<p id="From1"> From </p> <select>
  <option value="9am">9am</option>
  <option value="10am">10am</option>
  <option value="11am">11am</option>
  <option value="12pm">12pm</option>
  <option value="1pm">1pm</option>
  <option value="2pm">2pm</option>
  <option value="3pm">3pm</option>
  <option value="4pm">4pm</option>
  <option value="5pm">5pm</option>
</select> 

<p id="To1"> To </p>  <select>
  <option value="9am">9am</option>
  <option value="10am">10am</option>
  <option value="11am">11am</option>
  <option value="12pm">12pm</option>
  <option value="1pm">1pm</option>
  <option value="2pm">2pm</option>
  <option value="3pm">3pm</option>
  <option value="4pm">4pm</option>
  <option value="5pm">5pm</option>
</select> 
<br>
<br>
<button type="button">Add Time </button>
<br>
<br>
From  <select>
  <option value="9am">9am</option>
  <option value="10am">10am</option>
  <option value="11am">11am</option>
  <option value="12pm">12pm</option>
  <option value="1pm">1pm</option>
  <option value="2pm">2pm</option>
  <option value="3pm">3pm</option>
  <option value="4pm">4pm</option>
  <option value="5pm">5pm</option>
</select> 

To  <select>
  <option value="9am">9am</option>
  <option value="10am">10am</option>
  <option value="11am">11am</option>
  <option value="12pm">12pm</option>
  <option value="1pm">1pm</option>
  <option value="2pm">2pm</option>
  <option value="3pm">3pm</option>
  <option value="4pm">4pm</option>
  <option value="5pm">5pm</option>
</select>
<br>
<br>
<br>
<button type="button" onClick = "shadeCells()">OK</button>
<button type="button">Reset</button>
<br>
<br>
>
-->
<?php
function getTimeRow($numberOfHours, $startHour){
	echo "<tr>";
	echo"<td>";
	echo"</td>";
	for($i=0; $i<$numberOfHours; $i++)
	{
		echo "<td>";
		echo getHour(($startHour+$i));
		echo "</td>";
	}
	echo "</tr>";
}

function getHour($hour){
	$am;
	$hour = $hour%24;
	$displayHour = $hour;
	if($hour==0 || $hour ==24)
	{
		$displayHour=12;
		$am=true;
	}
	else if($hour>0 && $hour<12)
	{
		$displayHour=$hour;
		$am=true;
	}
	else if($hour==12){
		$displayHour=12;
		$am=false;
	}
	else if($displayHour>12 && $displayHour<24){
		$displayHour=$hour-12;
		$am=false;
	}
	else{
		$displayHour=0;
		$am=false;
	}
	$amLabel;
	if($am){
		$amLabel="am";
	}
	else{
		$amLabel="pm";
	}
	return ($displayHour.":00 ".$amLabel);
}
include "navbar.html";
echo "<br> <br><br>";
echo "<table>";
getTimeRow(24, 12);
echo "</table>";
echo "<table id='Fireman' style='width:100%'>";
echo "<thead>";
echo "<tr id='Header'>";
echo "<th id='0'> </th>";
echo "<th id='12am'>12AM</th>";
echo "<th id='1am'>1AM</th>";
echo "<th id='2am'>2AM</th>";
echo "<th id='3am'>3AM</th>";
echo "<th id='4am'>4AM</th>";
echo "<th id='5am'>5AM</th>";
echo "<th id='6am'>6AM</th>";
echo "<th id='7am'>7AM</th>";
echo "<th id='8am'>8AM</th>";
echo "<th id='9am'>9AM</th>";
echo "<th id='10am'>10AM</th>";
echo "<th id='11am'>11AM</th>";
echo "<th id='12pm'>12PM</th>";
echo "<th id='1pm'>1PM</th>";
echo "<th id='2pm'>2PM</th>";
echo "<th id='3pm'>3PM</th>";
echo "<th id='4am'>4PM</th>";
echo "<th id='5pm'>5PM</th>";
echo "<th id='6pm'>6PM</th>";
echo "<th id='7pm'>7PM</th>";
echo "<th id='8pm'>8PM</th>";
echo "<th id='9pm'>9PM</th>";
echo "<th id='10pm'>10PM</th>";
echo "<th id='11pm'>11PM</th>";
echo "</tr>";
echo "</thead>";
echo "</table>";
?>
<table border="1">
  <thead>
    <tr>
      <th>Month</th>
      <th>Savings</th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <td>Sum</td>
      <td>$180</td>
    </tr>
  </tfoot>
  <tbody>
    <tr>
		<td colspan="2">
			<div class="scrollit">
			<table>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
          <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
          <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
          <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
          <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
          <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
          <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
          <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
          <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
          <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
          <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
          <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
          <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
          <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
          <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
          <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
          <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
  </tbody>
</table>
</div>
  
</table>



</body>
</html>