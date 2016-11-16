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
          $('.history .collection').append('<a href="'+url+'" target="_blank" class="collection-item">'+title+'<span class="secondary-content"><i class="fa fa-eye" aria-hidden="true"></i> '+visit_count+'</span></a>');
        } else {
          $('.history .collection').append('<a href="'+url+'" target="_blank" class="collection-item">'+url+'<span class="secondary-content"><i class="fa fa-eye" aria-hidden="true"></i> '+visit_count+'</span></a>');
        }
      }
  });
}
getHistory();