function test () {

document.write("Hi");

}

function drawCalendar() {
	var tableString = "";
	tableString += "<p class='text-center'>";
	tableString += "<button> &lt </button>";
	tableString += "<strong> Feb </strong>";
	//tableString += "<p class='text-center'> <Feb </p>";
	tableString += "<button> &gt </button>";
	tableString += "</p>";
	tableString += "<table class='table table-bordered'>";
	tableString += "<th> Sunday </th> <th> Monday </th> <th> Tuesday </th> <th> Wednesday </th> <th> Thursday </th> <th> Friday </th> <th> Saturday </th>";
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