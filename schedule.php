<!DOCTYPE HTML>
<html>
<head>

<style>
table, td, th {
    border: 1px solid black;
}
table {
    width: 40%;
    border-collapse: collapse;
}

th {
    text-align: left;
}
</style>

</head>
<body>

<?php 
include "navbar.html";
?>
<br><br>
My Availibility (Availability Entry)<br>
My Schedule (My Schedule View)<br>
Station Schedule (Station Schedule View)<br>
Admin Scheduler (Locked unless admin)<br>
<br><br>
<body>

<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fireDept";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
//echo "\nConnected successfully";
/*
$sql = "INSERT INTO Fireman (firstName, lastName, age, id)
VALUES ('John', 'Doe', '100', 6)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
*/
$sql = "SELECT firemanId, firstName, lastName, age FROM Fireman";
$result = $conn->query($sql);
$conn->close();
if ($result->num_rows > 0) {
    echo "<table><tr><th>ID</th><th>Name</th></tr>";
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>".$row["firemanId"]."</td><td>".$row["firstName"]." ".$row["lastName"]."</td></tr>";
    }
    echo "</table>";
} else {
    echo "0 results";
}
if ($result->num_rows > 0) {
	mysqli_data_seek($result, 0);
    echo "<table><tr><th>ID</th><th>Name</th></tr>";
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>".$row["firemanId"]."</td><td>".$row["firstName"]." ".$row["lastName"]."</td></tr>";
    }
    echo "</table>";
} else {
    echo "0 results";
}

echo "<br> <br> <br> <br>";

echo "<form id='firemanForm'>";
echo "<input type='radio' name='timeslot_type' value='availible' id = 'availible' checked = 'checked'>Availible";
echo "<input type='radio' name='timeslot_type' value='schedule' id = 'schedule'>Schedule";
echo "<br><br>";
echo "<select id='fireman_select'>";
if ($result->num_rows > 0) {
	mysqli_data_seek($result, 0);
    while($row = $result->fetch_assoc()) {
		echo "<option value= '". $row['firemanId']."'>".$row["firstName"]." ".$row["lastName"]."</option>";
    }
    echo "</table>";
} else {
    echo "0 results";
}	
echo "</select><br><br>";
echo  "Enter a date:";
echo "<input type='date' name='bday' max='2050-12-31-12-31' min='2015-01-02' id='dateEntry'><br><br>";
echo "Start Time:";
echo "<input type='time' name='start_time' id= 'startTime'>";
echo "End Time:";
echo "<input type='time' name='end_time' id='endTime'><br><br>";
echo "<br>";
echo "<br>";
echo "</form>";
echo "<button type='button' onclick='submitDate()'>Submit</button>";
?>

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
	getTimeslotIndex();
	return '"'+date +" "+ date2+'"'; //"start time and date";
}

function getTimeslotIndex() {
		if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
           xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
               document.getElementById("i").innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET","insertTimeslot.php",true);
        xmlhttp.send(getStartDatetime());
   alert("hi");
}
</script>



<p id="i"></p>



</form>
</body>
</html>

