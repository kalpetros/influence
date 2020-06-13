export function getDate() {
    var format = localStorage.getItem('t-format');
    if (format == 1) {
        var format = false;
    } else {
        var format = true;
    }
    $('.date').empty();
    var fulldate = new Date($.now());
    var date = fulldate.toDateString();
    // Time options
    var options = { hour12: format, hour: '2-digit', minute: '2-digit' };
    var time = fulldate.toLocaleTimeString([], options);
    $('.date').append('<h1>' + time + '</h1>');
    $('.date').append('<h5>' + date + '</h5>');
}

// Convert wind speed from m/s to beaufort scale
function toBeaufort(wind) {
    var beaufort = 0;
    if (wind < 0.3) {
        beaufort = 0;
    } else if (wind >= 0.3 && wind <= 1.5) {
        beaufort = 1;
    } else if (wind >= 1.6 && wind <= 3.3) {
        beaufort = 2;
    } else if (wind >= 3.4 && wind <= 5.4) {
        beaufort = 3;
    } else if (wind >= 5.5 && wind <= 7.9) {
        beaufort = 4;
    } else if (wind >= 8 && wind <= 10.7) {
        beaufort = 5;
    } else if (wind >= 10.8 && wind <= 13.8) {
        beaufort = 6;
    } else if (wind >= 13.9 && wind <= 17.1) {
        beaufort = 7;
    } else if (wind >= 17.2 && wind <= 20.7) {
        beaufort = 8;
    } else if (wind >= 20.8 && wind <= 24.4) {
        beaufort = 9;
    } else if (wind >= 24.5 && wind <= 28.4) {
        beaufort = 10;
    } else if (wind >= 28.5 && wind <= 32.6) {
        beaufort = 11;
    } else if (wind >= 32.7) {
        beaufort = 12;
    }
    return beaufort;
}

// Get current weather data
function getWeather() {
    var apiKey = '';

    // getCurrentPosition options
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 600000,
    };
    // Get user's location
    navigator.geolocation.getCurrentPosition(success, error, options);

    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        // console.log('http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&APPID='+apiKey);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url:
                'http://api.openweathermap.org/data/2.5/weather?lat=' +
                latitude +
                '&lon=' +
                longitude +
                '&APPID=' +
                apiKey,
            crossDomain: true,
        })
            .done(function (json) {
                var current_date = new Date();
                current_date = current_date.toDateString();
                // Add a timestamp
                json.timestamp = current_date;
                var data = JSON.stringify(json);
                // Save response to local storage
                localStorage.setItem('weatherData', data);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                console.log(xhr.responseText);
                console.log(textStatus);
            });
    }

    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    }
}

// Weather data aggregation
function aggregateWeather() {
    var current_date = new Date();
    current_date = current_date.toDateString();
    var unit = localStorage.getItem('w-unit');
    var wind = localStorage.getItem('w-wind');
    // Check if weather data exists in local storage
    var weatherData = localStorage.getItem('weatherData');
    // First time load/browsing data cleared
    if (weatherData == null) {
        getWeather();
        weatherData = localStorage.getItem('weatherData');
        // Parse stringified object
        var data = JSON.parse(weatherData);
    }
    // It runs every day (updates weather)
    else {
        var data = JSON.parse(weatherData);
        if (data.timestamp != current_date) {
            getWeather();
            weatherData = localStorage.getItem('weatherData');
            data = JSON.parse(weatherData);
        }
    }
    // var icon = data.weather[0].icon;
    // var description = data.weather[0].main;
    // Convert temperature from Kenvin to Celcius
    var temperature = Math.round(data.main.temp - 273.15);
    // var minTemperature = Math.round(data.main.temp_min - 273.15);
    // var maxTemperature = Math.round(data.main.temp_max - 273.15);
    // Convert temperature from Celcius to Fahreneit
    if (unit == 0) {
        temperature = (temperature + 30) * 2;
        // minTemperature = (minTemperature + 30) * 2;
        // maxTemperature = (maxTemperature + 30) * 2;
    } else {
        temperature = temperature;
    }
    // Addition weather information
    // var pressure = data.main.pressure;
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;
    var windDegrees = data.wind.deg;
    if (wind == 0) {
        windSpeed = toBeaufort(windSpeed);
    } else {
        windSpeed = windSpeed;
    }
    // var clouds = data.clouds.all;
    // var city = data.name;
    // var countryCode = data.sys.country;
    // var sunrise = data.sys.sunrise;
    // var sunset = data.sys.sunset;
    // Convert sunrise & sunset from unix timestamp to UTC
    // var sunriseDate = new Date(sunrise*1000);
    // var sunsetDate = new Date(sunset*1000);
    // var sunriseHours = sunriseDate.getHours();
    // var sunriseMinutes = sunriseDate.getMinutes();
    // var sunsetHours = sunsetDate.getHours();
    // var sunsetMinutes = sunsetDate.getMinutes();
    // Map owm weather id with weathericon class
    var weatherIcon = 'wi-owm-' + data.weather[0].id;
    // Strings
    var tempStr =
        '<h1>' +
        temperature +
        '<i class="wi wi-degrees"></i><i class="wi ' +
        weatherIcon +
        '"></i></h1>';
    var windStr =
        windSpeed +
        'm/s <i class="wi wi-wind towards-' +
        windDegrees +
        '-deg"></i>';
    if (wind == 0) {
        windStr =
            '<i class="wi wi-wind-beaufort-' +
            windSpeed +
            '"></i> <i class="wi wi-wind towards-' +
            windDegrees +
            '-deg"></i>';
    } else {
        windStr = windStr;
    }
    var humidityStr = humidity + ' <i class="wi wi-humidity"></i>';
    $('.weather').html(
        tempStr + '<h5>' + windStr + ' ' + humidityStr + '</h5>'
    );
}

// Get random photos
function photos() {
    // Random backgrounds from unsplash.com
    var unsplash = 'https://source.unsplash.com/category/nature/1920x1080';
    $('html').css(
        'background',
        'url(' + unsplash + ') no-repeat center center fixed'
    );
    $('html').css('background-size', 'cover');
}
