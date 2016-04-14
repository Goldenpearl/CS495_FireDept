<!DOCTYPE html>
<html lang="en">
<head>
  <title>Yorktown FD - Home</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  <style>
    /* Remove the navbar's default margin-bottom and rounded borders */ 
    .navbar {
      margin-bottom: 0;
      border-radius: 0;
    }
    
    /* Add a gray background color and some padding to the footer */
    footer {
      background-color: #f2f2f2;
      padding: 25px;
    }
    
  .carousel-inner img {
      width: 100%; /* Set width to 100% */
      margin: auto;
      min-height:200px;
  }

  /* Hide the carousel text when the screen is less than 600 pixels wide */
  @media (max-width: 600px) {
    .carousel-caption {
      display: none; 
    }
  }
  </style>
</head>
<body>

<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand">Yorktown Fire Department &lt; &gt;</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="calendar.php">Event Calendar</a></li>
        <li><a href="schedule.php">Shift Schedule</a></li>
        <li><a href="email.php">Email</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="registerBS.html"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
      </ul>
    </div>
  </div>
</nav>

<div id="myCarousel" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox">
      <div class="item active">
	  <img src="firefighters.jpg" alt="firefighters">
        <!--<img src="http://placehold.it/1200x400?text=IMAGE" alt="Image"> -->
        <div class="carousel-caption">
          <h3>Yorktown Fire Department</h3>
          <p>"Firefighters never die, they just burn forever in the hearts of the people whose lives
		  they saved." - Susan Murphee</p>
        </div>      
      </div>

      <div class="item">
	  <img src="firefighters2.jpg" alt="firefighters2">
        <!--<img src="http://placehold.it/1200x400?text=Another Image Maybe" alt="Image"> -->
        <div class="carousel-caption">
          <h3>Yorktown, Indiana</h3>
          <p>Volunteer firefighters</p>
        </div>      
      </div>
    </div>

    <!-- Left and right controls -->
    <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
</div>
  
<div class="container text-center">    
  <h3>Select An Option</h3><br>
  <div class="row">
    <div class="col-sm-4">
	<a href="calendar.php">
      <img src="http://placehold.it/150x80?text=IMAGE" class="img-responsive" style="width:100%" alt="Image">
	  </a>
      <p>Event Calendar</p>
    </div>
	<a href="schedule.php">
    <div class="col-sm-4"> 
      <img src="http://placehold.it/150x80?text=IMAGE" class="img-responsive" style="width:100%" alt="Image">
	  </a>
      <p>Shift Scheduler</p>    
    </div>
	<div class="col-sm-4"> 
	<a href="email.php">
      <img src="http://placehold.it/150x80?text=IMAGE" class="img-responsive" style="width:100%" alt="Image">
	  </a>
      <p>Email</p>    
    </div>
  </div>
</div><br>

<footer class="container-fluid text-center">
  <p>2015-16 Capstone Project by: Kelly Blair, Bryce Davis, Abby Duvanenko and Alex Duvanenko</p>
</footer>

</body>
</html>