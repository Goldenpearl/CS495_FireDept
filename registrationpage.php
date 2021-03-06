<?php
include_once 'dbconfig.php';
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Secure Login: Registration Form</title>
        <script type="text/JavaScript" src="sha512.js"></script> 
        <script type="text/JavaScript" src="forms.js"></script>
        <link rel="stylesheet" href="styles/main.css" />
    </head>
    <body>
        <!-- Registration form to be output if the POST variables are not
        set or if the registration script caused an error. -->
        <h1>Register with us</h1>
        <?php
        if (!empty($error_msg)) {
            echo $error_msg;
        }
        ?>
        <ul>
            <li>Emails must have a valid email format</li>
            <li>Passwords must be at least 6 characters long</li>
            <li>Passwords must contain
                <ul>
                    <li>At least one uppercase letter (A..Z)</li>
                    <li>At least one lowercase letter (a..z)</li>
                    <li>At least one number (0..9)</li>
                </ul>
            </li>
            <li>Your password and confirmation must match exactly</li>
			<li>PhoneNumber must be 10 digits long and contain only numbers</li>
        </ul>
        <form action="registration.php" 
                method="post" 
                name="registration_form">
            Email: <input type="text" name="email" id="email" /><br>
            Password: <input type="password"
                             name="password" 
                             id="password"/><br>
            Confirm password: <input type="password" 
                                     name="confirmpwd" 
                                     id="confirmpwd" /><br>
			First Name: <input type="text" name="fName" id="fName"/><br>
			Last Name: <input type="text" name="lName" id="lName"/><br>
			PhoneNumber: <input type="text" name="number" id="number"/><br>
			PhoneProvider: <input type="text" name ="provider" if="provider"/><br>
            <input type="button" 
                   value="Register"
					onclick="regformhash(this.form, this.form.email, this.form.password, this.form.confirmpwd, this.form.fName, this.form.lName, this.form.number,this.form.provider)"/> 
        </form>
        <p>Return to the <a href="loginpage.php">login page</a>.</p>
    </body>
</html>