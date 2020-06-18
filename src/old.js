function deleteHistory() {
  chrome.history.deleteAll(function (deleteall) {
    getHistory();
    Materialize.toast('History cleared!', 4000);
  });
}
