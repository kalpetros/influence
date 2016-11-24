// Get the entire bookmarks hierarchy
function getTopSites() {
  chrome.topSites.get(
    function(topSites) {
      topSites.forEach(function(topsite) {
        var title = truncateString(topsite.title, false);
        $('.topsites .collection').append('<a href="'+topsite.url+'" target="_blank" class="collection-item">\
                                           <img src="https://plus.google.com/_/favicon?domain_url='+topsite.url+'"/>'+' '+title+'\
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
          var title = truncateString(children.title, false);
          $('.bookmarks .old .collection').append('<a href="#" id="'+id+'" class="collection-item bookmark-node">'+title+'\
                                                   <span class="secondary-content">\
                                                   <i class="fa fa-caret-right" aria-hidden="true"></i></span></a>');
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
      $('.bookmarks .old .collection').empty();
      bookmarkSubTreeNodes.forEach(function(subtreenode) {
        var header = $('.bookmarks').children().first();
        var parentId = subtreenode.parentId;
        if (parentId) {
          $(header).children().first().html('<a href="#" id="'+parentId+'" class="bookmark-node"\
                                             ><i class="fa fa-caret-left" aria-hidden="true">\
                                             </i> Bookmarks</a>');
        } else {
          $(header).children().first().html('Bookmarks');
        }
        subtreenode.children.forEach(function(children) {
          var id = children.id;
          var title = truncateString(children.title, false);
          if (children.children) {
            $('.bookmarks .old .collection').append('<a href="#" id="'+id+'" class="collection-item bookmark-node">'+title+'\
                                                     <span class="secondary-content">\
                                                     <i class="fa fa-caret-right" aria-hidden="true"></i></span></a>');
          } else {
            $('.bookmarks .old .collection').append('<a href="'+children.url+'" target="_blank"\
                                                     id="'+id+'"\ class="collection-item">\
                                                     <img src="https://plus.google.com/_/favicon?domain_url='+children.url+'"/>'+' '+title+'\
                                                     <span class="secondary-content"></span></a>');
          }
        });
      });
    }
  )
}

// Get recently added bookmarks
function getRecentBookmarks() {
  chrome.bookmarks.getRecent(
    10,
    function(recentBookmarks) {
      recentBookmarks.forEach(function(bookmark) {
        var title = truncateString(bookmark.title, false);
        $('.bookmarks .recent .collection').append('<a href="'+bookmark.url+'" target="_blank" class="collection-item">\
                                                    <img src="https://plus.google.com/_/favicon?domain_url='+bookmark.url+'"/>'+' '+title+'</a>');
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
    if (historyItems == 0) {
      $('.history .collection').empty().hide();
      $('.history .obliterate').hide();
      $('.history .card-content').append('<h6 class="center-align">No history entries found.</h6>');
    } else {
      var header = $('.history').children().first();
      $(header).children().first().html('History \
                                         <span class="secondary-content tooltipped obliterate"\
                                         data-position="right" data-delay="50"\
                                         data-tooltip="Clear your history">\
                                         <i class="fa fa-trash-o" aria-hidden="true"></i></span>');
      // Initialize dynamically added tooltip
      $('.tooltipped').tooltip();
      for (var i = 0; i < historyItems.length; ++i) {
        var url = historyItems[i].url;
        var visit_count = historyItems[i].visitCount;
        if (historyItems[i].title != '') {
          var title = truncateString(historyItems[i].title, false);
          $('.history .collection').append('<a href="'+url+'" target="_blank" class="collection-item">\
                                            <img src="https://plus.google.com/_/favicon?domain_url='+url+'"/>'+' '+title+'\
                                            <span class="secondary-content">\
                                            <i class="fa fa-eye" aria-hidden="true"></i>\
                                            '+visit_count+'</span></a>');
        } else {
          var title = truncateString(historyItems[i].url, false);
          $('.history .collection').append('<a href="'+url+'" target="_blank" class="collection-item">\
                                            <img src="https://plus.google.com/_/favicon?domain_url='+url+'"/>'+' '+title+'\
                                            <span class="secondary-content">\
                                            <i class="fa fa-eye" aria-hidden="true"></i>\
                                            '+visit_count+'</span></a>');
        }
      }
    }
  });
}

function deleteHistory() {
  chrome.history.deleteAll(function(deleteall) {
    getHistory();
    Materialize.toast('History cleared!', 4000)
  })
}

// Check for new downloads
function checkDownloads() {
  setInterval(function() {
    chrome.downloads.search({
        "state": "in_progress"
      },
      function(items) {
        var downloading = [];
        // Add all active downloads in an array
        items.forEach(function(item) {
          downloading.push(item.id);
        });
        var elements = $('.downloads .in-progress').children();
        // Check if all active downloads appear on the list
        items.forEach(function(item) {
          elements.each(function(i, child) {
            var id = $(child).attr('id');
            var itemid = 'download'+item.id;
            // If true remove id from the array
            if (id == itemid) {
              var found = [item.id];
              downloading = downloading.filter(item => found.indexOf(item) === -1);
            }
          });
        });
        // Add new download to the active downloads list
        if (downloading.length > 0) {
          getActiveDownloads();
        }
      }
    );
    chrome.downloads.search({
        "state": "complete"
      },
      function(items) {
        var downloaded = sessionStorage.getItem('downloaded');
        if (items.length > downloaded) {
          sessionStorage.setItem('downloaded', items.length);
          getActiveDownloads();
        }
      }
    )
  },2000);
}

// Get completed downloads
function getCompletedDownloads() {
  // Completed downloads
  chrome.downloads.search({
      "state": "complete"
    },
    function(DownloadItems) {
      $('.downloads .complete').empty();
      DownloadItems.forEach(function(item) {
        var filename = item.filename;
        chrome.downloads.getFileIcon(
          item.id,
          {'size': 16},
          function(icon) {
            var title = truncateString(filename.substring(filename.lastIndexOf("/") + 1, filename.length), true);
            $('.downloads .complete').append('<a href="#" class="collection-item download-show" data-id="'+item.id+'">\
                                              <img src="'+icon+'"/> '+title+'\
                                              <span class="secondary-content"></span></a>');
          }
        );
      });
    }
  )
}

// All things download
function getActiveDownloads() {
  // Check for active downloads
  chrome.downloads.search({
      "state": "in_progress"
    },
    function(DownloadItems) {
      $('.downloads .in-progress').empty();
      DownloadItems.forEach(function(item) {
        var fullurl = item.finalUrl;
        var title = truncateString(fullurl.substring(fullurl.lastIndexOf("/") + 1, fullurl.length), false);
        var server = fullurl.substring(0, fullurl.lastIndexOf("/"));
        // Check item's state
        if (item.canResume) {
          var event = '<span class="download-event tooltipped" data-event="resume" data-id="'+item.id+'"\
                       data-position="left" data-delay="50" data-tooltip="Resume download">\
                       <i class="fa fa-play" aria-hidden="true"></i></span>';
        } else {
          var event = '<span class="download-event tooltipped" data-event="pause" data-id="'+item.id+'"\
                       data-position="left" data-delay="50" data-tooltip="Pause download">\
                       <i class="fa fa-pause" aria-hidden="true"></i></span>';
        }
        $('.downloads .in-progress').append('<li id="download'+item.id+'" class="collection-item avatar">\
                                            '+event+'\
                                            <span class="title">'+title+'</span>\
                                            <p>'+server+'</p>\
                                            <span class="secondary-content"></span>\
                                            </li>');
        // Check status of download
        downloadStatus();
      });
    }
  )
  getCompletedDownloads();
}

function downloadStatus() {
  // Handle received bytes
  setInterval(function() {
    chrome.downloads.search({
        "state": "in_progress"
      },
      function(DownloadItems) {
        // Handle newly added download by examining how many divs are active
        // and then append the new download
        DownloadItems.forEach(function(item) {
          var totalSize = formatBytes(Math.round(item.totalBytes),1);
          var received = formatBytes(Math.round(item.bytesReceived),1);
          // status(received, totalSize, item);
          $('#download'+item.id+' .secondary-content').html(received+' / '+totalSize);
        });
      }
    )
  },1000);
}

// Show the downloaded file in its folder in a file manager
function showDownload(id) {
  chrome.downloads.show(id);
  chrome.downloads.showDefaultFolder();
}

function downloadEvents(event, id) {
  // Pause download
  if (event == "pause") {
    chrome.downloads.pause(
      id,
      function(callback) {
        var element = $('.download-event[data-id="'+id+'"]');
        $(element).attr('data-event', 'resume');
        $(element).attr('data-tooltip', "Resume download");
        $('.tooltipped').tooltip();
        $(element).html('<i class="fa fa-play" aria-hidden="true"></i>');
      }
    )
  }
  // Resume download
  else if (event == "resume") {
    chrome.downloads.resume(id,
      function(callback) {
        var element = $('.download-event[data-id="'+id+'"]');
        $(element).attr('data-event', 'pause');
        $(element).attr('data-tooltip', "Pause download");
        $('.tooltipped').tooltip();
        $(element).html('<i class="fa fa-pause" aria-hidden="true"></i>');
      }
    )
  }
}

// Get CPU info
function getCPU() {
  chrome.system.cpu.getInfo(function(cpu) {
    // $('.system .cpu').html('<div class="center-align">'+cpu.modelName+'</div>');
    $('.system .cpu').empty();
    var usages = [];
    cpu.processors.forEach(function(processor, i) {
      var kernel = processor.usage.kernel;
      var user = processor.usage.user;
      var total = kernel + user;
      var idle = processor.usage.idle;
      var percentage = Math.round(((total / idle) * 100),1);
      usages.push(percentage);
    });
    // Sum array values and divide sum by array length
    usage = ((usages.reduce(add, 0))/usages.length);
    function add(a,b) {
      return a + b;
    }
    $('.system .cpu').html('<div class="center-align usage">'+usage+'%</div>');
    $('.system .cpu').append('<div class="cpubar"></div>');
    $(".system .cpubar").progressbar({
      value: usage
    });
  });
}

// Get Memory info
function getMemory() {
  // Get memory info
  chrome.system.memory.getInfo(function(memory) {
    $('.system .memory').empty();
    $('.system .memory').html('<div class="center-align usage">\
                               '+formatBytes(memory.availableCapacity)+'\
                               available of '+formatBytes(memory.capacity)+'</div>');
    var capacity = memory.capacity;
    var available = memory.availableCapacity;
    var percentage = (available / capacity) * 100;
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
      $('.system .storage').html('<div class="center-align usage">\
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
// Make string longer by passing
// true as the second parameter
function truncateString(title, full) {
  if (full) {
    var truncated = title.substring(0,100)+'...';
    return title;
  }
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

  // getCurrentPosition options
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 600000
  };
  // Get user's location
  navigator.geolocation.getCurrentPosition(success, error, options);

  function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    // console.log('http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&APPID='+apiKey);
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
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };
}

$(window).on('load', function() {
  // Random backgrounds
  var min = 1;
  var max = 10;
  var image = Math.floor(Math.random()*(max-min+1)+min);
  $('html').css('background', 'url(src/img/image'+image+'.jpg) no-repeat center center fixed');
  $('html').css('background-size', 'cover');

  // Bookmarks navigation
  $(document).on('click', '.bookmark-node', function() {
    var id = $(this).attr('id');
    getBookmarksSubTree(id);
  });

  // Delete all items from history
  $(document).on('click', '.obliterate', function() {
    deleteHistory();
  });

  // Show the downloaded file in its folder in a file manager
  $(document).on('click', '.download-show', function() {
    var id = parseInt($(this).attr('data-id'));
    showDownload(id);
  });

  // Pause download handler
  $(document).on('click', '.download-event', function() {
    var event = $(this).attr('data-event');
    var id = parseInt($(this).attr('data-id'));
    downloadEvents(event, id);
  });

  // Set completed download items length to session storage
  chrome.downloads.search({
      "state": "complete"
    },
    function(items) {
      // Set items length to session storage
      sessionStorage.setItem('downloaded', items.length);
      getCompletedDownloads();
    }
  )
});

// Call everything
// Functions to run in an interval
var timeinterval = setInterval(function() {
  getDate();
},0);

var timeintervalNew = setInterval(function() {
  getCPU();
},1000);

getTopSites();
getRecentBookmarks();
getBookmarksTree();
getHistory();
checkDownloads();
getMemory();
getStorage();
openWeather();