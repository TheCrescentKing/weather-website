var unitInC = true;

function toFahrenheit(c){
  return (c * 9/5 + 32);
}

function toCelsius(f){
  return ((f-32) * 5/9);
}

function getTemperatureString(current, min, max){
  return Number(current).toFixed(2) + " " + (unitInC ? "C°" : "F°") + "<br>" + "Min: " + Number(min).toFixed(2) + " Max: " + Number(max).toFixed(2);
}

function displayWeather(apiLink){

  $.getJSON(apiLink, function(json){

    var h1 = json.name + ", " + json.sys.country;

    $("#title").html(h1);

    $("#weatherIcon").attr("src", json.weather[0].icon);

    var temperature = getTemperatureString(json.main.temp, json.main.temp_min, json.main.temp_max);

    $("#temperature").html(temperature);

    var weatherStatus = "Status: " + json.weather[0].main;

    $("#weatherStatus").html(weatherStatus);

    loadBackground(json.weather[0].main);

  });

}

function getLocationAndApi(){

  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      apiLink = "https://fcc-weather-api.glitch.me/api/current?lat=" + Math.round(position.coords.latitude) + "&lon="  + Math.round(position.coords.longitude);

      displayWeather(apiLink);

    });
  }

}

function changeUnit(){
  unitInC = unitInC ? false : true;

  var regex = /[+-]?\d+(\.\d+)?/g;

  var str = $("#temperature").html();

  var temps = str.match(regex).map(function(v) { return parseFloat(v); });


  for(var i = 0; i < temps.length; i++){
    if (unitInC){
      temps[i] = toCelsius(temps[i]);
    } else{
      temps[i] = toFahrenheit(temps[i]);
    }
  }

  var newTemperatures = getTemperatureString(temps[0], temps[1], temps[2]);

   $("#temperature").html(newTemperatures);

}

function loadBackground(status){

  status = status.toLowerCase();

  var backgroundUrl = "";

  if(status.includes("drizzle")){
    backgroundUrl = "https://s5.postimg.cc/9erl9mfbr/drizzle.jpg";
  } else if (status.includes("clouds")){
    backgroundUrl = "https://s5.postimg.cc/4g42v46dz/clouds.jpg";
  } else if (status.includes("rain")){
    backgroundUrl = "https://s5.postimg.cc/hk9n7t65j/rain.jpg";
  } else if (status.includes("snow")){
    backgroundUrl = "https://s5.postimg.cc/4svh1bjiv/snow.jpg";
  } else if (status.includes("thunderstorm")){
    backgroundUrl = "https://s5.postimg.cc/xv9r4437r/thunderstorm.jpg";
  } else if (status.includes("mist")){
    backgroundUrl = "https://s5.postimg.cc/3qlairszr/mist.jpg";
  } else if (status.includes("smoke")){
    backgroundUrl = "https://s5.postimg.cc/nxyqb1g6f/smoke.jpg";
  } else{
    backgroundUrl = "https://s5.postimg.cc/ubntebnnb/clear.jpg";
  }

  var backgroundString = "url(" + backgroundUrl +") 50% 50% / cover no-repeat fixed";

  var body = document.getElementsByTagName('body')[0];

  body.style.background = backgroundString;

}

$(document).ready(function(){

  getLocationAndApi();

  //Load unit button
  var button = document.getElementById("unitButton");
  if (button.addEventListener)
      button.addEventListener("click", changeUnit, false);
  else if (button.attachEvent)
      button.attachEvent('onclick', changeUnit);

});
