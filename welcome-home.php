<?php
include("dbconfig.php");
include("usercheck.php");
?>
<html>
<body>

<p> Welcome <?php echo $login_session;?></p>
<a href="logout.php">Log out</a>
</body>
</html>