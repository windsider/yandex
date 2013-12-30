<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251">
</head>
<body>
</body>
</html>
<?php


// Displaying date from datepicker

$link = "index.html";
$html = file_get_contents($link);
$doc = new DOMDocument();
$doc->loadHTML($html);
$xpath = new DOMXPath($doc);
$tables = $doc->getElementsByTagName('table');
$nodes  = $xpath->query('.//th', $tables->item(0));
var_dump($nodes->item(0)->nodeValue);



//Saving data

$date=$_POST['date'];
$month=$_POST['month'];
$day=$_POST['day'];
$year=$_POST['year'];
$weekday=$_POST['weekday'];
$time=$_POST['time'];

$f=fopen ("dok.htm", "a+");

for ($i = 0; $i < count($time); $i++ ) {

$w=fwrite($f, "$month<br>$day<br>$year<br>$weekday<br>$time[$i]<br>");
}
$cl=fclose ($f);
if (!$w){echo "Data are not sent";}else{echo "Data are sent";};
// Report on saving data

$report = file_get_contents('dok.htm');
echo $report;

?>
