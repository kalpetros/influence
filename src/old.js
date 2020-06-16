function deleteHistory() {
  chrome.history.deleteAll(function (deleteall) {
    getHistory();
    Materialize.toast('History cleared!', 4000);
  });
}

function downloadEvents(event, id) {
  // Pause download
  if (event == 'pause') {
    chrome.downloads.pause(id, function (callback) {
      var element = $('.download-event[data-id="' + id + '"]');
      $(element).attr('data-event', 'resume');
      $(element).attr('data-tooltip', 'Resume download');
      $('.tooltipped').tooltip();
      $(element).html('<i class="fa fa-play" aria-hidden="true"></i>');
    });
  }
  // Resume download
  else if (event == 'resume') {
    chrome.downloads.resume(id, function (callback) {
      var element = $('.download-event[data-id="' + id + '"]');
      $(element).attr('data-event', 'pause');
      $(element).attr('data-tooltip', 'Pause download');
      $('.tooltipped').tooltip();
      $(element).html('<i class="fa fa-pause" aria-hidden="true"></i>');
    });
  }
}

// Launch application
function launchApp(id) {
  chrome.management.launchApp(id);
}
