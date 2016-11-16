getHistory();
// Get the entire bookmarks hierarchy
function getBookmarks() {
  chrome.bookmarks.getTree(
    function(bookmarkTreeNodes) {
      for (var i = 0; i < bookmarkTreeNodes.length; i++) {
        var folder = bookmarkTreeNodes[i].children[0];
        for (var j = 0; j < folder.children.length; j++) {
          var title = folder.children[j].title;
          $('.bookmarks .collection').append('<a href="" target="_blank"\
                                              class="collection-item">'+title+'\
                                              <span class="secondary-content">\
                                              </span></a>');
        }
      }
    }
  )
}
getBookmarks();
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
getDownloads();
// System information (CPU, MEMORY, STORAGE)
// Get CPU info
function getSystemInfo() {
  chrome.system.cpu.getInfo(function(cpu){
    console.log(cpu);
    $('.system .cpu').append('<p>'+cpu.modelName+'</p>');
    cpu.processors.forEach(function(processor) {
      $('.system .cpu').append('<p>'+processor.usage.total+'</p>');
    });
  });
  // Get memory info
  chrome.system.memory.getInfo(function(memory){
    console.log(memory);
    $('.system .memory').append('<p>Capacity: '+memory.capacity+'</p>');
    $('.system .memory').append('<p>Available Capacity: '+memory.availableCapacity+'</p>');
  });
  // Get storage info
  chrome.system.storage.getInfo(function(storage){
    console.log(storage);
    storage.forEach(function(disk) {
      $('.system .storage').append('<p>Total storage space: '+disk.capacity+'</p>');
    });
  });
}
getSystemInfo();