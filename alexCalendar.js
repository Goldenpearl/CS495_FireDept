function test () {

document.write("Hi");

}

function drawCalendar() {
	var tableString = "";
	tableString += "<h3 class='text-center'> Feb </h3>";
	tableString += "<table class='table table-bordered'>";
	//tableString += 
	for (var r = 0; r < 6; r++) {
		tableString += "<tr>";
		for (var i = 0; i < 7; i++) {
			var number = i + r * 7;
			tableString += "<td style='width:5%' class='table-active'>";
			tableString += number;
			tableString += "</td>";
		}
	tableString += "</tr>";
	}
	tableString += "</table>";
	
	document.getElementById("myTable").innerHTML = tableString;
}