 $(document).ready(function ()  {
    var dt;
    // for canceling selections
    	function selcancel() {
        $("#timetable table td:nth-child(2)").not(":last").text("available").css("color", 'black').prev().css("color", 'black');
    }
    //array for connection with a date
     //var dts = dt.toString(); 			
     	 var weekday  = new Array();
    weekday[0]  = "Monday";
    weekday[1]  = "Tuesday";
    weekday[2]  = "Wednesday";
    weekday[3]  = "Thursday";
    weekday[4]  = "Friday";
    weekday[5]  = "Saturday";
    weekday[6]  = "Sunday";
    var dts  = new Array();
    dts[0]  = "09:00 - 10:00";
    dts[1]  = "10:00 - 11:00";
    dts[2]  = "11:00 - 12:00";
    dts[3]  = "12:00 - 13:00";
    dts[4]  = "13:00 - 14:00";
    dts[5]  = "14:00 - 15:00";
    dts[6]  = "15:00 - 16:00";
    dts[7]  = "16:00 - 17:00";
    dts[8]  = "17:00 - 18:00";
    dts[9]  = "18:00 - 19:00";
    // creating timetable #1 
     var table  = $('<table><th colspan=4><form><p>Select a date in the datepicker or </br>a weekday on the right <span class="glyphicon-arrow-right:before"></span></p></form></th></table>');
    var i  =  - 1;
    $(dts).each(function() {
        i++;
        var row  = $("<tr><td>available</td></tr>");
        $('<td><input type="button" value ="select" class="btn"></td><td><input type="button" value ="reset" class="btn"></td>').appendTo(row);
        $('<td></td>').append(dts[i]).prependTo(row);
        row.appendTo(table);
    });
    // login and password
    	$('<div id ="log"><form><input type="text" name="login" size="15" class="inputtext" placeholder="login here" ><input type="text" name="password" size="15" class="inputtext" placeholder="password here"><br><input type="submit" value="submit" class="btn log" /><input type="reset" value="reset" class="btn log" ></form></div>').prependTo(table);
    $(table).appendTo('#timetable');
    // click events of timetable #1: button select
     $("#timetable table tr input:even").on("click", function ()  {
        if ( ! $(dt).length)  {
            alert ("Please, make a DATE selected");
            return false;
        }
        $(this).parent('td').prev().text('selected');
        $(this).parent('td').prevAll().css("color", '#FF8247');
    });
    // click events of timetable #1: button reset
     $("#timetable table tr input:odd").on("click", function ()  {
        $(this).closest('tr').children('td:nth-child(2)').text('available');
        $(this).parent('td').prevAll().css("color", 'black');
    });
    // buttons book and cancel of timetable #1
     $('<tr><td colspan=2><input id ="book" type="submit" value="book" class="btn"></td><td colspan=2><input id ="cnl" type="reset" value="cancel" class="btn"></td></tr>').appendTo(table);
    // click events of buttons book and cancel
     //book button event
     	$("#book").on("click", function ()  {
        var sld = $("td:nth-child(2):contains('selected')");
        $(sld).text("booked").css("color", '#CD0000').prev().css("color", '#CD0000');
        if ( ! (sld).length  &&  ! $(dt).length) {
            alert ("Please, make a DATE and OPTION(s) selected");
            return false;
        }
        if ( ! (sld).length)  {
            alert ("Please, make OPTION(s) selected");
        }
        if ((sld).length  && $(dt).length)  {
            alert ("Your order is BOOKED. We thank you for the use of our service");
            /* go to db*/
        }
    });
    //cancel button event
     			$("#cnl").on("click", function ()  {
        selcancel();
    });
    // adding class to tr
     $('#timetable table tr').addClass('tr');
    // adding id to th to get a from datepicker
     $('#timetable table p').attr('id','date');
    //Table #2 for booking according to weekdays
     	var wtable  = $('<table><th><p>Select a day for periodic booking</p></th></table>');
    var wselect  = $('<select id="select" size="6" name="week[]" multiple></select>');
    var k  =  - 1;
    $(weekday).each(function() {
        k++;
        $('<option> </option>').append(weekday[k]).appendTo(wselect);
    });
    (wselect).wrap('<td></td>').wrap('<tr></tr>').appendTo(wtable);
    var wtr  = $('<span id="wbtn"></span>');
    // buttons of table #2 selection according to a weekday
     $('<input type="button" id="sel" class="btn" value ="select">').wrap('<td></td>').prependTo(wtr);
    $('<input type="button" id="res" class="btn" value="reset">').wrap('<td></td>').appendTo(wtr);
    (wtr).appendTo(wtable);
    (wtable).appendTo("#wtable");
    // button events of table #2 selection according to a weekday
     	// select button 
     $("#sel").click(function ()  {
        // this resets selections
        	selcancel();
        var wday  = $("#select option:selected").text();
        		if ( ! (wday).length) {
            alert ("Please, make WEEKDAY(s) selected");
            return false;
        }
        $("#date").text(wday);
    });
    // reset button 
     $("#res").click(function ()  {
        var sel  = document.getElementById('date');
        sel.innerHTML  = null;
        return true;
    });
    // jQuery UI datepicker
     $('#calendar').datepicker({
        inline: true
        , showWeek: true
        , selectDay: true
        , minDate: 0
        , maxDate: "+36M +30D"
        , dateFormat: 'DD, dd / mm / yy'
        , firstDay: 1
        , showOtherMonths: true
        , dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        , onSelect: function (dateText, inst)  {
            // now this resets selections, later here should be call to db or creating new timetable
             selcancel();
            // aligning date string
            			 $("#date").css('top', '8px');
            var date  = $(this).datepicker('getDate');
            // for table header and book button
             dt  = $('#date').text(dateText);
            // attempt to select multiple date
             /*var weekDay = [];
 var doc = date.getUTCDay();
 weekDay.push(weekday[date.getUTCDay()]); 
 var day = $('#date').text(weekday[date.getUTCDay()]); */ // getting saved doc from server
             /*var doc = $("<table></table>").load("template.html #template");
 $('#schedule').append(doc); 
 
 moment(dt);*/
        }
    });
});
