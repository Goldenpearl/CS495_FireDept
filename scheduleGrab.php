<?php

class fireFighter {
	private $age = 0;
	private $fName = "";
	private $lName = "";
	private $id = 0;
	
	function __construct($id, $fName, $lName, $age){
		$this->age = $age;
		$this->fName=$fName;
		$this->lName=$lName;
		$this->id = $id;
	}
	
	public function getFirstName(){
		return $this->fName;
	}
	
	public function getLastName(){
		return $this ->lName;
	}
	
	public function getId(){
		return $this ->id;
	}
	public function getAge(){
		return $this->age;
	}
}

$f = new FireFighter(1, "Bob","Bob",32);
echo $f->getAge();


$q = intval($_GET);
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
$sql = "SELECT firemanId, firstName, lastName, age FROM Fireman";
$result = $conn->query($sql);
$conn->close();
echo "<select id='fireman_select' onchange='showUser(this.value)'>";
if ($result->num_rows > 0) {
	mysqli_data_seek($result, 0);
    while($row = $result->fetch_assoc()) {
		$firefighterId = $row['firemanId'];
		$firefighterFName = $row["firstName"];
		$firefighterLName = $row["lastName"];
		$firefighterAge = $row["age"];
    }
    echo "</table>";
} else {
    echo "0 results";
}	
echo "</select><br><br>";
	func getAllFirefighters(){
	
	}

	func getAllTimeslotsBetween($startTime, $endTime){
	
	}

*/
?>