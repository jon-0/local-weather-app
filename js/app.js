console.log( "ready!" );
var lat;
var lon;
var info;
var temperature;

var skycons = new Skycons();

function changeBackground(icon){
	$('body').css("background-image", "url(/local=weather-app/media/" + icon + ".jpeg)");
	$('button').css("display", "none");
	$('#summary-info-box').css("display", "inline-block");
}

function getWeather(weather){
	$('#summary-insert').html(weather.currently.summary);
	temperature = weather.currently.temperature;
	$('#temp-insert').html(temperature);
	$('#hum-insert').html(weather.currently.humidity*100);
	$('#visibility-insert').html(weather.currently.visibility);
	$('#wind-insert').html(weather.currently.windSpeed);

	skycons.add(document.getElementById("icon1"), weather.currently.icon);
	changeBackground(weather.currently.icon);
	skycons.play();

}



if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
    	lat = position.coords.latitude;
    	lon = position.coords.longitude;
	});    
}

$('button').on("click", function(){
	$.ajax({
    	dataType: "jsonp",
    	url: "https://api.darksky.net/forecast/a0c53a9b8b6e5268129652522c52d49c/" + lat + "," + lon + "?exclude=minutely,hourly,daily,alerts,flags",
    	success: function(data) {
    		console.log("success");
    		getWeather(data);
    	},
    	error: function (error) {
    		console.log(error);
    	}
    });	// end AJAX
});

$('#degrees').on("click", function(){
	if ($(this).html() == 'F') {
		$(this).text("C");
		$('#temp-insert').text(((temperature - 32) * 5 / 9).toFixed(2));				
	} else if ($(this).html() == 'C') {
		$(this).text("F");	
		$('#temp-insert').text(temperature);	
	}
});
















