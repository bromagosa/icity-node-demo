/* iCity NodeJS Demo App
 * =====================
 *
 * Renders a map with all devices connected to the infrastructure with ID=19
 * Upon clicking a device, it shows a pop-up info window with its last temperature reading
 */ 

var http = require('http');

var app = require('express')();  							// we instantiate express.js as our web application server

var apiKey = 'l7xx94df7a4c17874c0293835ec6142ae004';		// our iCity application api key
var icityURL = 'icity-gw.icityproject.com';					// API base url

var infrastructureID = 19;									// iCity infrastructure ID, 19 in our case


/*  APPLICATION ENTRY POINT
 *  =======================
 *  path: /
 *  action: Gets all devices and renders the map template
 */

app.get('/',function (req,res) {

	// Barcelona Latitude and Longitude, plus desired map zoom
	// A zoom of 10 shows approximately all Barcelona province area

	var lat = 41.414932;									
	var lon = 2.146791;										
	zoom = 10;

	// GET request options to retrieve all devices in our infrastructure

	var options = {
		host: icityURL,
		port: 8080,
		path: encodeURI('/developer/api/infrastructures/' + infrastructureID +  '/devices' + '?apikey=' + apiKey),
	};

	http.get(options, function(getResponse) {				// we execute the GET request
		var data = '';
		getResponse.on('data', function (chunk) {			// data comes in chunks, we need to put them all together
			data += chunk;
		});

		// When all data has been received, we render the EJS template and pass it the variables we'll need to render 
		// the map
															
		getResponse.on('end', function () {
			res.render('index.ejs', { lat:lat, lon:lon, zoom:zoom, devices:data })
		})
	})
});


/*  APPLICATION ENTRY POINT
 *  =======================
 *  path: /get-temperature
 *  action: Gets the temperature data for the requested device and sends it back to the requestor
 */

app.get('/get-temperature/:deviceID',function (req,res) {

	// GET request options to retrieve the temperature of a given device.
	// Note that the property has to be specified as urn:[propertyName].
	// Also note that "n" determines the number of readings we request.

	var options = {
		host: icityURL,
		port: 8080,
		path: encodeURI('/developer/api/observations/last?apikey=' + apiKey + '&id=' +
				req.params.deviceID + '&property=urn:temperature&n=1'),
	};														

	http.get(options, function(getResponse) {
		var data = '';
		getResponse.on('data', function (chunk) {
			data += chunk;
		});
		getResponse.on('end', function () {
			res.send(data);
		});
	});
});

// We now start the application, accessible at "http://localhost:9999/"

app.listen(9999);
