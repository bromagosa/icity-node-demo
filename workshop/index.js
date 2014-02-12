var http = require('http');
var app = require('express')();

var apiKey = /* ToDo */ ;
var iCityURL = /* ToDo */ ;

var infrastructureID = /* ToDo */ ;

app.get('/', function(appGetRequest, appGetResponse) {


	var options = {
		host: /* ToDo */ ,
		port: /* ToDo */ ,
		path: /* ToDo */ ,
	};

	http.get(options, function(iCityGetResponse) {	
		var data = '';
		iCityGetResponse.on('data', function(chunk) {
			data += chunk;
		});
															
		iCityGetResponse.on('end', function() {
			appGetResponse.render('index.ejs', { devices: /* ToDo: Quina variable conté els dispositius? */ })
		})
	})
});


app.get( /* ToDo: Afegir URL i paràmetre */ , function(appGetRequest, appGetResponse) {

	var options = {
		host: /* ToDo */ ,
		port: /* ToDo */ ,
		path: /* ToDo */ ,
	};

	http.get(options, function(iCityGetResponse) {
		var data = '';
		iCityGetResponse.on('data', function(chunk) {
			data += chunk;
		});
		iCityGetResponse.on('end', function() {
			appGetResponse.send(data);
		});
	});
});

/* ToDo: Afegir codi per arrencar el servidor */

