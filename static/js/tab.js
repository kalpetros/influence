// Get the entire bookmarks hierarchy
function getTopSites() {
  chrome.topSites.get(
    function(topSites) {
      getDate();
      darkSky();
      topSites.forEach(function(topsite) {
        $('.topsites .collection').append('<a href="'+topsite.url+'" target="_blank"\
                                            class="collection-item">'+topsite.title+'\
                                            <span class="secondary-content">\
                                            </span></a>');
      });
    }
  )
}

// Get the entire bookmarks hierarchy
function getBookmarks() {
  chrome.bookmarks.getTree(
    function(bookmarkTreeNodes) {
      bookmarkTreeNodes.forEach(function(treenode) {
        var folder = treenode.children[0];
        folder.children.forEach(function(children) {
          var title = children.title;
          $('.bookmarks .collection').append('<a href="" target="_blank"\
                                              class="collection-item">'+title+'\
                                              <span class="secondary-content">\
                                              </span></a>');
        });
      });
    }
  )
}

// Get a list of visited pages
function getHistory() {
  chrome.history.search({
      'text': '', // A free-text query to the history service. Leave empty to retrieve all pages.
      'maxResults': 20 //The maximum number of results to retrieve. Defaults to 100.
    },
    function(historyItems) {
      for (var i = 0; i < historyItems.length; ++i) {
        var title = historyItems[i].title;
        var url = historyItems[i].url;
        var visit_count = historyItems[i].visitCount;
        if (title != ''){
          $('.history .collection').append('<a href="'+url+'" target="_blank" \
                                            class="collection-item">'+title+'\
                                            <span class="secondary-content">\
                                            <i class="fa fa-eye" aria-hidden="true"></i>\
                                            '+visit_count+'</span></a>');
        } else {
          $('.history .collection').append('<a href="'+url+'" target="_blank"\
                                            class="collection-item">'+url+'\
                                            <span class="secondary-content">\
                                            <i class="fa fa-eye" aria-hidden="true"></i>\
                                            '+visit_count+'</span></a>');
        }
      }
  });
}

// All things download
function getDownloads() {
  // Downloads in progress
  chrome.downloads.search({
      "state": "in_progress"
    },
    function(DownloadItems) {
      DownloadItems.forEach(function(item) {
        $('.downloads .in-progress').append('<li class="collection-item">'+item.url+'\
                                             <span class="secondary-content"></span></li>');
      });
    }
  )
  // Completed downloads
  chrome.downloads.search({
      "state": "complete"
    },
    function(DownloadItems) {
      DownloadItems.forEach(function(item) {
        $('.downloads .complete').append('<li class="collection-item">'+item.url+'\
                                          <span class="secondary-content"></span></li>');
      });
    }
  )
}

// System information (CPU, MEMORY, STORAGE)
// Get CPU info
function getSystemInfo() {
  chrome.system.cpu.getInfo(function(cpu){
    $('.system .cpu').append('<p>'+cpu.modelName+'</p>');
    cpu.processors.forEach(function(processor) {
      $('.system .cpu').append('<p>'+processor.usage.total+'</p>');
    });
  });
  // Get memory info
  chrome.system.memory.getInfo(function(memory){
    $('.system .memory').append('<p>Capacity: '+memory.capacity+'</p>');
    $('.system .memory').append('<p>Available Capacity: '+memory.availableCapacity+'</p>');
  });
  // Get storage info
  chrome.system.storage.getInfo(function(storage){
    storage.forEach(function(disk) {
      $('.system .storage').append('<p>Total storage space: '+disk.capacity+'</p>');
    });
  });
}

// Get current date and time
function getDate() {
  var fulldate = new Date($.now());
  var date = fulldate.toDateString();
  // Time options
  var options = {hour12: false};
  var time = fulldate.toLocaleTimeString('en-US', options);
  $('.date').append('<h2>'+time+'</h2>');
  $('.date').append('<h3>'+date+'</h3>');
}

// openweathermap.org API
function openWeather() {
  var apiKey = "";
  var latitude = 35;
  var longtitude = 25;
  $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longtitude+'&APPID='+apiKey, function(json) {
    var weather = JSON.stringify(json);
    var data = JSON.parse(weather);
    // Data
    var icon = data.weather[0].icon;
    var description = data.weather[0].main;
    // Convert temperature from Kenvin to Celcius
    var temperature = Math.round(data.main.temp - 273.15);
    var minTemperature = Math.round(data.main.temp_min - 273.15);
    var maxTemperature = Math.round(data.main.temp_max - 273.15);
    // Convert temperature from Celcius to Fahreneit
    var temperatureF = (temperature + 30) * 2;
    var minTemperatureF = (minTemperature + 30) * 2;
    var maxTemperatureF = (maxTemperature + 30) * 2;
    var pressure = data.main.pressure;
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;
    var clouds = data.clouds.all;
    var city = data.name;
    var countryCode = data.sys.country;
    var sunrise = data.sys.sunrise;
    var sunset = data.sys.sunset;
    // Convert sunrise & sunset from unix timestamp to UTC
    var sunriseDate = new Date(sunrise*1000);
    var sunsetDate = new Date(sunset*1000);
    var sunriseHours = sunriseDate.getHours();
    var sunriseMinutes = sunriseDate.getMinutes();
    var sunsetHours = sunsetDate.getHours();
    var sunsetMinutes = sunsetDate.getMinutes();
    // $('.weather').append('<img class="icon" src="http://openweathermap.org/img/w/' + icon + '.png">');
    // $('.weather').append('<h2>'+temperature+'</h2>');
    // $('.weather').append('<h2>'+pressure+'</h2>');
    // $('.weather').append('<h2>'+humidity+'</h2>');
    // $('.weather').append('<h2>'+city+'</h2>');
  });
}

// Dark Sky API
function darkSky() {
  var apiKey = "";
}

getTopSites();
getBookmarks();
getHistory();
getDownloads();
getSystemInfo();