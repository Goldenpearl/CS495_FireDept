function loadNavBar() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
		document.getElementById("navbar").innerHTML = xhttp.responseText;
		}
	}
	xhttp.open("GET", "navbar.html", true);
	xhttp.send();
	
}