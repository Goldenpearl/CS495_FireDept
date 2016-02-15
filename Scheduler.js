	var tableDiv = "tableDiv";
	var listDiv = "listDiv";
	
	function createScheduler(){
		var timeslots = loadTimeslots();
		createList(timeslots);
		createTable(timeslots);
	}
	
	function loadTimeslots(){
		var timeslots = new Array();
		timeslots.push(["Bob", 11]);
		timeslots.push(["Bob", 12]);
		timeslots.push(["Bob", 13]);
		timeslots.push(["Allan", 11]);
		timeslots.push(["Jess", 2]);
		return timeslots;
	}

	
	function createList(timeslots){
		var listContents = "";
		for(var n=0; n<timeslots.length; n++){
			listContents+=timeslots[n][0] + " " + indexToTime(timeslots[n][1])+ "<br>";
		}
		document.getElementById(listDiv).innerHTML = listContents;
	}

	function indexToTime(index){
		var realIndex = index%24;
		var time = "";
		var m = "";
		if(index<=0){
			time+="12:00 am";
		}
		else if(index>12){
			m="pm";
			time+=index%12+":00 "+m;
		}
		else{
			m = "am"
			time+=index+":00 "+m;
		}
			return time;
	}
	
	
	function createTable(timeslots, divName) {
			//Get all unique firemen
			var names = getFiremenNames();
			//Define the header
			var timeHeader = createTimeHeader();
			var tablecontents = "";
			//Define table
			tablecontents += "<table id = myTable>";
			tablecontents += "<tr>";
			tablecontents += "<th>";
			tablecontents += "</th>";
			for(var i =0; i< timeHeader.length; i++){
				tablecontents+="<th>";
				tablecontents+=timeHeader[i] +"</th>";
			}
			tablecontents += "</tr>"
			for(var i=0; i<names.length; i++){ //create a row for each fireman
				tablecontents+="<tr>";
				tablecontents+="<th>";
				tablecontents+= names[i];
				for(var j=0; j<timeHeader.length; j++){ //create a cell for each column header
					tablecontents+= "<td class=table-cell>";
					tablecontents+= "</td>";
				}
				tablecontents+="</th>";
				tablecontents+="</tr>";
			}
            tablecontents += "</table>";
			//Add the table to the document
			document.getElementById(tableDiv).innerHTML = tablecontents;
			//Shade cells
			shadeCells(timeslots, names);
	}

	function getFiremenNames(){
	var names = ["Bob", "Allan", "Jess"];
	return names;
	}
	
	function createTimeHeader(){
	var timeHeader = new Array();
			timeHeader[0]="12:00 am";
			for(var i=1; i<12; i++){
				var str = i+":00 am";
				timeHeader[i] = str;;
			} 
			timeHeader[12] = "12:00 pm";
			for(var i=1; i<12; i++){
				var str = i+":00 pm";
				timeHeader[12+i]=str;
			} 		
			timeHeader[24] = "12:00 am";
			return timeHeader;
	}

	function shadeCells(timeslots, names){
		for(var i=0; i<timeslots.length; i++){	
			var name = timeslots[i][0];
			var indexOfName = 0;
			var nameFound = false
			while(!nameFound && indexOfName<names.length){
				if(name === names[indexOfName])
				{
					nameFound=true;
				}
				else
				{
					indexOfName++;
				}
			}
			if(nameFound)
			{
				document.getElementById('myTable').rows[indexOfName+1].cells[timeslots[i][1]+1].setAttribute("bgcolor", "#00FF00");

			}
		}
	}
	
	function makeXmlRequest(){
		var xmlhttp = new XMLHttpRequest();
		var url = "scheduleGrab.php";
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var myArr = JSON.parse(xmlhttp.responseText);
				myFunction(myArr);
			}
		};
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}