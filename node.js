var http = require('http');

  
    http.createServer(function (req, res) {
	
	
      fs = require('fs');
fs.writeFile('text.html', 'This is new data!', function (err) {
  if (err) return console.log(err);
  console.log('Write File > text.txt');
});
fs = require('fs');
fs.readFile("text.html","utf8",function(err,data){
    console.log("err: " + err);
    console.log("Read File" + data);
	});	
	  
    }).listen(1337, "127.0.0.1");
    console.log('Server running at http://127.0.0.1:1337/');
	
	
	
