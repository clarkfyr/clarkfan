var xhttp = new XMLHttpRequest();
xhttp.open('GET', 'http://api.openweathermap.org/data/2.5/weather?zip=94720,us&APPID=732e6658f618242e045a71feb919f108');
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var weather_data = JSON.parse(xhttp.responseText);
    document.getElementById("city").innerHTML = "City: " + weather_data.name;
    document.getElementById("temp").innerHTML = "Temperature: " + (weather_data.main.temp - 273.15).toFixed(2) + "°C";
    document.getElementById("humi").innerHTML = "Huminity: " + weather_data.main.humidity + "%";
  }
};
xhttp.send();
