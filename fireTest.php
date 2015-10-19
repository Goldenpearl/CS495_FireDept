<!DOCTYPE html>

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
$sql = "SELECT id, firstname, lastname, age FROM Fireman";
$result = $conn->query($sql);
$conn->close();
if ($result->num_rows > 0) {
    echo "<table><tr><th>ID</th><th>Name</th></tr>";
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>".$row["id"]."</td><td>".$row["firstname"]." ".$row["lastname"]."</td></tr>";
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
        echo "<tr><td>".$row["id"]."</td><td>".$row["firstname"]." ".$row["lastname"]."</td></tr>";
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
		echo "<option value= '". $row['id']."'>".$row["firstname"]." ".$row["lastname"]."</option>";
    }
    echo "</table>";
} else {
    echo "0 results";
}	
echo "</select><br><br>";
echo  "Enter a date:";
echo "<input type='date' name='bday' max='2050-12-31-12-31' min='2015-01-02'><br><br>";
echo "Start Time:";
echo "<input type='time' name='start_time'>";
echo "End Time:";
echo "<input type='time' name='end_time'><br><br>";
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
	var date ="";
	var date2="";
	
	if(document.getElementById("availible").checked==true){
		availibleSlot=true;
	}
	else if(document.getElementById("schedule").checked ==true){
		scheduleSlot=true;
	}
	var queryString = "";
	var tableString =""
	if(availibleSlot){
		tableString ="AvailibleTimeSlot";
	}
	else if(scheduleSlot){
		tableString ="ScheduledTimeSlot";
	}
	queryString+="Insert into Timeslot values("
	queryString+= date
	queryString+=", "
	queryString+= date2
	queryString+=", "
	queryString+=100
	queryString+="); "
	queryString+="INSERT INTO "
	queryString+=tableString
	queryString+=" (timeslotId, id, firemanId) VALUES ("
	queryString+=100
	queryString+=", "
	queryString+=100
	queryString+=", "
	queryString+=firemanId;
	queryString+=");";
	alert(queryString);

}	


</script>







</form>
</body>
</html>

