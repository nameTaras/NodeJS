const fs = require("fs");
const http = require("http");
const request = require('request');

http.createServer((request,response) => {
	console.log(request);
    response.end("Hello NodeJS!");
}).listen(3000, "127.0.0.1",function(){
    console.log("Сервер начал прослушивание запросов на порту 3000");
});

searchLocation = (place) => {
	const googleKey = 'AIzaSyAgrr5qglATTGU-JMBXQqy3W4ZLsD9lLnw';
	const position = {lat: null, lng: null};
	const urlGoogle = `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${googleKey}`;

	request(urlGoogle, (error, response, body) => {
  		const data = JSON.parse(body);
  		const location = data.results[0].geometry.location;
  		position.lat = location.lat;
  		position.lng = location.lng;
  		searchWhether(position);
	});
};

searchWhether = (position) => {
	const darkSkyKey = '5260679a2807b67257549b33bdaf7421';
	const urlDarkSky = `https://api.darksky.net/forecast/${darkSkyKey}/${position.lat},${position.lng}`;

	request(urlDarkSky, (error, response, body) => {
  		const data = JSON.parse(body);
  		console.log(`Today: ${new Date(Number(data.currently.time + '000'))}`);
  		console.log(`Temperature: ${((data.currently.temperature - 32) / 1.8).toFixed()} °`)
	});
}

process.argv[2] !== "undefined" && searchLocation(process.argv[2]);