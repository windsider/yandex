  $(document)
      .ready(function () {

          var dt;

          // for canceling selections
          function selCancel() {
              $("#timetable table td:nth-child(2)")
                  .not(":last")
                  .text("available")
                  .css("color", '#ffffff')
                  .prev()
                  .css("color", '#ffffff');
          }


          // setting of modal window
          var modalText;

          function modalSet(modalText) {
              $("#myModal")
                  .modal('show');
              $("h4")
                  .text("Info");
              $("#mod")
                  .text(modalText);
          };

          //array for connection with a date
          //var dts = dt.toString(); 			
          var weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

          //generating the array of hours
          var dts = ["09:00 - 10:00"];
          for (var h = 10; h <= 18; h++) {
              dts.push(h + ":00 - " + (1 + h) + ":00");
          }


          // creating timetable #1 
          var table = $('<table class="table-hover"><th colspan=4><form><p>Select a date in the datepicker or </br>a weekday on the right   <span class="glyphicon glyphicon-arrow-right"></span></p></form></th></table>');
          var i = -1;
          $(dts)
              .each(function () {
                  i++;
                  var row = $("<tr><td>available</td></tr>");
                  $('<td><input type="button" value ="select" class="btn"></td><td><input type="button" value ="reset" class="btn"></td>')
                      .appendTo(row);
                  $('<td></td>')
                      .append(dts[i])
                      .prependTo(row);
                  row.appendTo(table);
              });

          $(table)
              .appendTo('#timetable');

          // adding login and password form
          $('<div id ="log"><form role="form" id ="logform" ><input type="text" name="login" class="loginform" placeholder="enter email here" autofocus required><input type="text" name="password" class="loginform" placeholder="enter password here" required><br><span><button type="submit" class="btn log">login</button><button type="reset" class="btn log">reset</button></form><input id="reginlog" class="btn log" type ="button" value = "register"></span></div>')
              .prependTo(table);

          // button register in login form
          $("#reginlog")
              .click(function () {
                  $('#logform')
                      .toggle();
                  // adding registration form to table #1
                  $('<form id ="reginform"><input type="text" name="firstname" placeholder="first name here" class="regform"  autofocus required><input type="text" name="lastname" placeholder="last name here" class="regform" required></br><input type="email" name="email" placeholder="e-mail address here" class="regform" required><input type="text" name="phone" placeholder="phone number here" class="regform" required></br><input type="password" name="password" placeholder="password here" class="regform" required><input type="password" name="confpassword" placeholder="confirm password here" class="regform" required></br><button id="regbtn2" class="btn log">register</button><input type="reset" class="btn log" value="reset"><button id="closereg" class="btn log">close</button></form>')
                      .appendTo('#log');

                  // button register in registration form
                  $("#regbtn2")
                      .click(function () {

                          // checking filling in registration form
                          var fname = $('input[name="firstname"]')
                              .val();
                          var lname = $('input[name="lastname"]')
                              .val();
                          var email = $('input[name="email"]')
                              .val();
                          var phone = $('input[name="phone"]')
                              .val();
                          var pword = $('input[type="password"]')
                              .val();
                          var confpword = $('input[name="confpassword"]')
                              .val();

                          // array and conditions for collecting notification
                          var note = [];

                          if (!fname.length) {
                              note.push("name");
                          }
                          if (!lname.length) {
                              note.push("last name");
                          }
                          if (!email.length) {
                              note.push("email");
                          }
                          if (!phone.length) {
                              note.push("phone number");
                          }
                          if (!pword.length) {
                              note.push("password");
                          }


                          function ValidEmailAddress(email) {
                              var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
                              return pattern.test(email);
                          };

                          if ((fname.length) && (lname.length) && (ValidEmailAddress(email)) && (phone.length) && (pword.length) && (confpword == pword)) {
                              modalText = "A notification has been sent to your email box to confirm your registration";
                              modalSet(modalText);
                              return false;
                          } else if ((fname.length) && (lname.length) && (!ValidEmailAddress(email)) && (phone.length) && (confpword == pword)) {
                              modalText = "E-mail is invalid";
                              modalSet(modalText);
                              return false;
                          } else if ((fname.length) && (lname.length) && (ValidEmailAddress(email)) && (phone.length) && (confpword != pword)) {
                              modalText = "Password and password confirmation are not identical";
                              modalSet(modalText);
                              return false;
                          } else if (note != 0) {
                              modalText = "You have not entered " + note.join(", ");
                              modalSet(modalText);

                          }

                          // pushing validate emails to array and then to db
                          var emailAr = [];

                          if (ValidEmailAddress(email)) {
                              emailAr.push(email);
                          }

                          // pushing validate passwords to array and then to db
                          var passwordAr = [];

                          if ((pword.length) && (confpword == pword)) {
                              passwordAr.push(confpword);
                          }


                      });

                  // button close in registration form
                  $("#closereg")
                      .click(function () {
                          $("#reginform")
                              .detach();
                          $('#logform')
                              .toggle();
                      });

              });


          //Table #2 for booking according to weekdays
          var wtable = $('<table><th><p>Select a day for periodic booking</p></th></table>');
          var wselect = $('<select id="select" size="6" name="week[]" multiple></select>');
          var k = -1;
          $(weekday)
              .each(function () {
                  k++;
                  $('<option> </option>')
                      .append(weekday[k])
                      .appendTo(wselect);
              });
          (wselect)
              .wrap('<td></td>')
              .wrap('<tr></tr>')
              .appendTo(wtable);
          var wtr = $('<span id="wbtn"></span>');
          // buttons of table #2 selection according to a weekday
          $('<input type="button" id="sel" class="btn" value ="select">')
              .wrap('<td></td>')
              .prependTo(wtr);
          $('<input type="button" id="res" class="btn" value="reset">')
              .wrap('<td></td>')
              .appendTo(wtr);
          (wtr)
              .appendTo(wtable);
          (wtable)
              .appendTo("#wtable");


          // button events of table #2 selection according to a weekday
          // select button 
          $("#sel")
              .click(function () {
                  // this resets selections
                  selCancel();

                  //destroying tooltip on select button
                  $('#timetable table tr input:even')
                      .tooltip('destroy');


                  var wday = $("#select option:selected")
                      .text();
                  if (!(wday)
                      .length) {
                      modalText = "Please, make WEEKDAY(s) selected";
                      modalSet(modalText);
                  } else {
                      dt = $("#date")
                          .text(wday);
                  }

              });



          // reset button 
          $("#res")
              .click(function () {
                  var sel = document.getElementById('date');
                  sel.innerHTML = null;
                  return true;
              });




          //tooltip for button select
          $('#timetable table tr input:even')
              .tooltip({
                  'show': true,
                  'placement': 'top',
                  'title': 'Select a date or weekday before selecting hours, then press "book"'
              });

          //tooltip for button select of table#2
          $("#sel")
              .tooltip({
                  'show': true,
                  'placement': 'top',
                  'title': "Select a weekday before pressing the button"
              });

          // click events of timetable #1: button select
          $("#timetable table tr input:even")
              .on("click", function () {

                  if (!$(dt)
                      .length) {
                      modalText = "Please, make a DATE or WEEKDAY(s) selected";
                      modalSet(modalText);

                      return false;
                  }
                  $(this)
                      .parent('td')
                      .prev()
                      .text('selected');
                  $(this)
                      .parent('td')
                      .prevAll()
                      .css("color", '#428bca');
                  //destroying tooltip on select button
                  $('#book')
                      .tooltip('destroy');


              });


          // click events of timetable #1: button reset
          $("#timetable table tr input:odd")
              .on("click", function () {
                  $(this)
                      .closest('tr')
                      .children('td:nth-child(2)')
                      .text('available');
                  $(this)
                      .parent('td')
                      .prevAll()
                      .css("color", 'black');
              });

          // buttons book and cancel of timetable #1
          $('<tr><td colspan=2><input id ="book" type="submit" value="book" class="btn"></td><td colspan=2><input id ="cnl" type="reset" value="cancel" class="btn"></td></tr>')
              .appendTo(table);



          //tooltip for button book
          $("#book")
              .tooltip({
                  'show': true,
                  'placement': 'top',
                  'title': 'Select a date and options ("select") before booking'
              });

          // click events of buttons book and cancel
          //book button event
          $("#book")
              .on("click", function () {

                  var sld = $("td:nth-child(2):contains('selected')");
                  $(sld)
                      .text("booked")
                      .css("color", '#5cb85c')
                      .prev()
                      .css("color", '#5cb85c');
                  if (!(sld)
                      .length && !$(dt)
                      .length) {
                      modalText = "Please, make a DATE and OPTION(s) selected";
                      modalSet(modalText);

                      return false;
                  }

                  if (!(sld)
                      .length) {

                      modalText = "Please, make OPTION(s) selected";
                      modalSet(modalText);
                  }

                  if ((sld)
                      .length && $(dt)
                      .length) {
                      $("#myModal")
                          .modal('show');
                      $("h4")
                          .text("Success");
                      $("#mod")
                          .text("Your order is BOOKED. We thank you for the use of our service!");
                      $(".modal-header")
                          .css({
                              backgroundColor: "#dff0d8",
                              color: "#3c763d",
                              borderColor: "#d6e9c6"
                          });

                  }

              });


          //cancel button in timetable
          $("#cnl")
              .on("click", function () {
                  selCancel();
              });
          // adding class to tr
          $('#timetable table tr')
              .addClass('tr');
          // adding id to th to get a from datepicker
          $('#timetable table p')
              .attr('id', 'date');

          //generating modal window	 
          var modalDialog = $('<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title"></h4></div><div class="modal-body"><p id="mod"></p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Ok</button></div></div></div>');
          $(modalDialog)
              .appendTo("#myModal");

          <!-- Not to conflict with other scripts -->	




          // jQuery UI datepicker
          $('#calendar')
              .datepicker({
                  inline: true,
                  showWeek: true,
                  selectDay: true,
                  minDate: 0,
                  maxDate: "+36M +30D",
                  dateFormat: 'DD, dd / mm / yy',
                  firstDay: 1,
                  showOtherMonths: true,
                  dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                  onSelect: function (dateText, inst) {
                      // now this resets selections, later here should be call to db or creating new timetable
                      selCancel();

                      //destroying tooltip on select button
                      $('#timetable table tr input:even')
                          .tooltip('destroy');

                      // aligning date string
                      $("#date")
                          .css('top', '8px');
                      var date = $(this)
                          .datepicker('getDate');
                      // for table header and book button
                      dt = $('#date')
                          .text(dateText);

                      // attempt to select multiple date
                      /*var weekDay = [];
 var doc = date.getUTCDay();
 weekDay.push(weekday[date.getUTCDay()]); 
 var day = $('#date').text(weekday[date.getUTCDay()]); */
                      // getting saved doc from server
                      /*var doc = $("<table></table>").load("template.html #template");
 $('#schedule').append(doc); 
 
 moment(dt);*/
                  }
              });




      });
