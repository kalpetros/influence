// Get the entire bookmarks hierarchy
function getTopSites() {
  chrome.topSites.get(
    function(topSites) {
      topSites.forEach(function(topsite) {
        var title = truncateString(topsite.title);
        $('.topsites .collection').append('<a href="'+topsite.url+'" target="_blank"\
                                           class="collection-item">'+title+'\
                                           <span class="secondary-content">\
                                           </span></a>');
      });
    }
  )
}

// Get the entire bookmarks hierarchy
function getBookmarksTree() {
  chrome.bookmarks.getTree(
    function(bookmarkTreeNodes) {
      bookmarkTreeNodes.forEach(function(treenode) {
        treenode.children.forEach(function(children) {
          var id = children.id;
          var title = truncateString(children.title);
          $('.bookmarks .collection').append('<a href="#" id="'+id+'"\
                                              class="collection-item bookmark-node">'+title+'\
                                              <span class="secondary-content">\
                                              <i class="fa fa-caret-right" aria-hidden="true"></i>\
                                              </span></a>');
        });
      });
    }
  )
}

// Get bookmarks sub tree based on its id
function getBookmarksSubTree(id) {
  chrome.bookmarks.getSubTree(
    id,
    function(bookmarkSubTreeNodes) {
      bookmarkSubTreeNodes.forEach(function(subtreenode) {
        $('.bookmarks .collection').empty();
        var header = $('.bookmarks').children().first();
        var parentId = subtreenode.parentId;
        $(header).children().first().html('<a href="#" id="'+parentId+'" class="bookmark-node"\
                                           ><i class="fa fa-caret-left" aria-hidden="true">\
                                           </i> Bookmarks</a>');
        subtreenode.children.forEach(function(children) {
          var id = children.id;
          var title = truncateString(children.title);
          if (children.children) {
            $('.bookmarks .collection').append('<a href="#" id="'+id+'"\
                                                class="collection-item bookmark-node">'+title+'\
                                                <span class="secondary-content">\
                                                <i class="fa fa-caret-right" aria-hidden="true"></i>\
                                                </span></a>');
          } else {
            $('.bookmarks .collection').append('<a href="'+children.url+'" target="_blank"\
                                                id="'+id+'"\ class="collection-item bookmark-node">'+title+'\
                                                <span class="secondary-content">\
                                                </span></a>');
          }
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
      var url = historyItems[i].url;
      var visit_count = historyItems[i].visitCount;
      if (historyItems[i].title != ''){
        var title = truncateString(historyItems[i].title);
        $('.history .collection').append('<a href="'+url+'" target="_blank" \
                                          class="collection-item">'+title+'\
                                          <span class="secondary-content">\
                                          <i class="fa fa-eye" aria-hidden="true"></i>\
                                          '+visit_count+'</span></a>');
      } else {
        var title = truncateString(historyItems[i].url);
        $('.history .collection').append('<a href="'+url+'" target="_blank"\
                                          class="collection-item">'+title+'\
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
        $('.downloads .in-progress').empty();
        var totalSize = formatBytes(item.totalBytes);
        var received = formatBytes(item.bytesReceived);
        var title = truncateString(item.filename);
        $('.downloads .in-progress').append('<li class="collection-item">'+title+'\
                                             <span class="secondary-content">'+received+' / '+totalSize+'</span></li>');
      });
    }
  )
  // Completed downloads
  chrome.downloads.search({
      "state": "complete"
    },
    function(DownloadItems) {
      $('.downloads .complete').empty();
      DownloadItems.forEach(function(item) {
        var title = truncateString(item.filename);
        $('.downloads .complete').append('<li class="collection-item">'+title+'\
                                          <span class="secondary-content"></span></li>');
      });
    }
  )
}

// Get CPU info
function getCPU() {
  chrome.system.cpu.getInfo(function(cpu) {
    $('.system .cpu').html('<div class="center-align">'+cpu.modelName+'\
                            </div>');
    cpu.processors.forEach(function(processor, i) {
      var capacity = 1500000
      var available = processor.usage.total
      var percentage = (available / capacity) * 100
      $('.system .cpu').append('<div class="cpu'+i+'"></div>');
      $(".system .cpu"+i).progressbar({
        value: percentage
      });
    });
  });
}

// Get Memory info
function getMemory() {
  // Get memory info
  chrome.system.memory.getInfo(function(memory) {
    $('.memory').empty();
    $('.system .memory').html('<div class="center-align">\
                               '+formatBytes(memory.availableCapacity)+'\
                               available of '+formatBytes(memory.capacity)+'</div>');
    var capacity = memory.capacity
    var available = memory.availableCapacity
    var percentage = (available / capacity) * 100
    $('.system .memory').append('<div class="memorybar"></div>')
    $(".system .memorybar").progressbar({
      value: percentage
    });
  });
}

// Get storage info
function getStorage() {
  // Get storage info
  chrome.system.storage.getInfo(function(storage){
    storage.forEach(function(disk) {
      $('.system .storage').html('<div class="center-align">\
                                  Total storage space: '+formatBytes(disk.capacity)+'\
                                  </div>');
    });
  });
}

// Convert bytes
function formatBytes(bytes, decimals) {
  if(bytes == 0) return '0 Byte';
  var k = 1000; // or 1024 for binary
  var dm = decimals + 1 || 3;
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Truncate a long string
function truncateString(title) {
  if (title.length > 40) {
    var truncated = title.substring(0,40)+'...';
    return truncated;
  }
  return title;
}

// Get current date and time
function getDate() {
  $('.date').empty();
  var fulldate = new Date($.now());
  var date = fulldate.toDateString();
  // Time options
  var options = {hour12: false, hour: '2-digit', minute:'2-digit'};
  var time = fulldate.toLocaleTimeString([], options);
  $('.date').append('<h1>'+time+'</h1>');
  $('.date').append('<h5>'+date+'</h5>');
}

// openweathermap.org API
function openWeather() {
  // Use your openweathermap API key here
  var apiKey = "";
  // Get user's location
  var position = navigator.geolocation.getCurrentPosition(function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    $.ajax({
      type: "POST",
      dataType: 'json',
      url: 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&APPID='+apiKey,
      crossDomain : true
    })
    .done(function(json) {
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
      $('.weather').append('<h1>'+temperature+'&deg; '+description+'</h1>');
      $('.weather').append('<h5><i class="fa fa-exchange" aria-hidden="true"></i> '+windSpeed+'m/s <i class="fa fa-tint" aria-hidden="true"></i> '+humidity+'%</h5>');
    })
    .fail( function(xhr, textStatus, errorThrown) {
      console.log(xhr.responseText);
      console.log(textStatus);
    });
  });
}

$(document).ready(function() {
  var min = 1;
  var max = 9;
  var image = Math.floor(Math.random()*(max-min+1)+min);
  $('body').css('background-image', 'url("static/img/image'+image+'.jpg")');
  $('.bookmark-node').click(function() {
    var id = $(this).attr('id');
    getBookmarksSubTree(id);
  });
});

// Call everything
// Functions to run in an interval
var timeinterval = setInterval(function(){
  getDate();
  getDownloads();
  getCPU();
},0);

getTopSites();
getBookmarksTree();
getHistory();
getDownloads();
getMemory();
getStorage();
openWeather();