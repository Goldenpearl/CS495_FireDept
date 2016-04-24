<?php
include("dbconfig.php");
session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Secure Login: Log In</title>
        <link rel="stylesheet" href="styles/main.css" />
        <script type="text/JavaScript" src="sha512.js"></script> 
        <script type="text/JavaScript" src="forms.js"></script> 
    </head>
    <body>
        <?php
        if (isset($_GET['error'])) {
            echo '<p class="error">Error Logging In!</p>';
        }
        ?> 
        <form action="login.php" method="post" name="login_form">                      
            Email: <input type="text" name="email" />
            Password: <input type="password" 
                             name="password" 
                             id="password"/>
            <input type="Button" 
                   value="Login" 
				   onclick ="formhash(this.form, this.form.password)"/> 
        </form> 	
		<p>New? Please Register with us. <a href="registrationpage.php">register</a>.</p>
    </body>
</html>