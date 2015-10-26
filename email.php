
<?php 
include "navbar.html";
?>
<!DOCTYPE html>
<html>
<head>
<style type="text/css">
select {font-family: Courier, monospace;}
</style>
</head>
<body>

<h2>Send e-mail to someone@example.com:</h2>

<form action="MAILTO:someone@example.com" method="post" enctype="text/plain">
Name:<br>
<input type="text" name="name" value="your name"><br>
E-mail:<br>
<input type="text" name="mail" value="your email"><br>
Comment:<br>
<textarea name="message" rows="10" cols="50">
The cat was playing in the garden.
</textarea><br><br>
<input type="submit" value="Send">
<input type="reset" value="Reset">
</form>
Email
<table>
<tr>
<td><tt><select name="product" multiple size=6">
<option>Bob Anderson	1
<option>Jim	Travis	2</td>
<td> <span style="display: inline-block; width: 40px; background: #fff; vertical-align: top;">
        <button style="width: 40px;"><<</button>
		<br><br>
        <button style="width: 40px;">>></button>
    </span></td>
<td><tt><select name="product" multiple size=6">
<option>Bob	Anderson	1
<option>Jim	Travis	2
<option>
</tr></td>
</select></tt>
<br>
</table>
<h3>Todo:</h3>
<h3>Alter to send email to multiple people</h3>
<h3>Have Select pull from database</h3>
<h3>Have Selects be exclusive (if it appears in one it can't appear in the other)</h3>
<h3>Implement Groups</h3><br><br>
</body>
</html>
