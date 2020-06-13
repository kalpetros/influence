// Get the entire bookmarks hierarchy
function getBookmarksTree() {
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
        bookmarkTreeNodes.forEach(function (treenode) {
            treenode.children.forEach(function (children) {
                var id = children.id;
                var title = truncateString(children.title, false);
                $('.bookmarks .old .collection').append(
                    '<a href="#" id="' +
                        id +
                        '" class="collection-item bookmark-node">' +
                        title +
                        '\
                                                   <span class="secondary-content">\
                                                   <i class="fa fa-caret-right" aria-hidden="true"></i></span></a>'
                );
            });
        });
    });
}

// Get bookmarks sub tree based on its id
function getBookmarksSubTree(id) {
    chrome.bookmarks.getSubTree(id, function (bookmarkSubTreeNodes) {
        $('.bookmarks .old .collection').empty();
        bookmarkSubTreeNodes.forEach(function (subtreenode) {
            var header = $('.bookmarks').children().first();
            var parentId = subtreenode.parentId;
            if (parentId) {
                $(header)
                    .children()
                    .first()
                    .html(
                        '<a href="#" id="' +
                            parentId +
                            '" class="bookmark-node"\
                                             ><i class="fa fa-caret-left" aria-hidden="true">\
                                             </i> Bookmarks</a>'
                    );
            } else {
                $(header).children().first().html('Bookmarks');
            }
            subtreenode.children.forEach(function (children) {
                var id = children.id;
                var title = truncateString(children.title, false);
                if (children.children) {
                    $('.bookmarks .old .collection').append(
                        '<a href="#" id="' +
                            id +
                            '" class="collection-item bookmark-node">' +
                            title +
                            '\
                                                     <span class="secondary-content">\
                                                     <i class="fa fa-caret-right" aria-hidden="true"></i></span></a>'
                    );
                } else {
                    $('.bookmarks .old .collection').append(
                        '<a href="' +
                            children.url +
                            '" target="_blank"\
                                                     id="' +
                            id +
                            '" class="collection-item">\
                                                     <img src="https://plus.google.com/_/favicon?domain_url=' +
                            children.url +
                            '"/>' +
                            ' ' +
                            title +
                            '\
                                                     <span class="secondary-content"></span></a>'
                    );
                }
            });
        });
    });
}

// Get recently added bookmarks
function getRecentBookmarks() {
    chrome.bookmarks.getRecent(10, function (recentBookmarks) {
        recentBookmarks.forEach(function (bookmark) {
            var title = truncateString(bookmark.title, false);
            $('.bookmarks .recent .collection').append(
                '<a href="' +
                    bookmark.url +
                    '" target="_blank" class="collection-item">\
                                                    <img src="https://plus.google.com/_/favicon?domain_url=' +
                    bookmark.url +
                    '"/>' +
                    ' ' +
                    title +
                    '</a>'
            );
        });
    });
}

// Get a list of visited pages
function getHistory() {
    chrome.history.search(
        {
            text: '', // A free-text query to the history service. Leave empty to retrieve all pages.
            maxResults: 20, //The maximum number of results to retrieve. Defaults to 100.
        },
        function (historyItems) {
            if (historyItems == 0) {
                $('.history .collection').empty().hide();
                $('.history .obliterate').hide();
                $('.history .card-content').append(
                    '<h6 class="center-align">No history entries found.</h6>'
                );
            } else {
                var header = $('.history').children().first();
                $(header)
                    .children()
                    .first()
                    .html(
                        'History \
                                         <span class="secondary-content tooltipped obliterate"\
                                         data-position="right" data-delay="50"\
                                         data-tooltip="Clear your history">\
                                         <i class="fa fa-trash-o" aria-hidden="true"></i></span>'
                    );
                // Initialize dynamically added tooltip
                $('.tooltipped').tooltip();
                for (var i = 0; i < historyItems.length; ++i) {
                    var url = historyItems[i].url;
                    var visit_count = historyItems[i].visitCount;
                    if (historyItems[i].title != '') {
                        var title = truncateString(
                            historyItems[i].title,
                            false
                        );
                        $('.history .collection').append(
                            '<a href="' +
                                url +
                                '" target="_blank" class="collection-item">\
                                            <img src="https://plus.google.com/_/favicon?domain_url=' +
                                url +
                                '"/>' +
                                ' ' +
                                title +
                                '\
                                            <span class="secondary-content">\
                                            <i class="fa fa-eye" aria-hidden="true"></i>\
                                            ' +
                                visit_count +
                                '</span></a>'
                        );
                    } else {
                        var title = truncateString(historyItems[i].url, false);
                        $('.history .collection').append(
                            '<a href="' +
                                url +
                                '" target="_blank" class="collection-item">\
                                            <img src="https://plus.google.com/_/favicon?domain_url=' +
                                url +
                                '"/>' +
                                ' ' +
                                title +
                                '\
                                            <span class="secondary-content">\
                                            <i class="fa fa-eye" aria-hidden="true"></i>\
                                            ' +
                                visit_count +
                                '</span></a>'
                        );
                    }
                }
            }
        }
    );
}

function deleteHistory() {
    chrome.history.deleteAll(function (deleteall) {
        getHistory();
        Materialize.toast('History cleared!', 4000);
    });
}

// Check for new downloads
function checkDownloads() {
    setInterval(function () {
        chrome.downloads.search(
            {
                state: 'in_progress',
            },
            function (items) {
                var downloading = [];
                // Add all active downloads in an array
                items.forEach(function (item) {
                    downloading.push(item.id);
                });
                var elements = $('.downloads .in-progress').children();
                // Check if all active downloads appear on the list
                items.forEach(function (item) {
                    elements.each(function (i, child) {
                        var id = $(child).attr('id');
                        var itemid = 'download' + item.id;
                        // If true remove id from the array
                        if (id == itemid) {
                            var found = [item.id];
                            downloading = downloading.filter(
                                (item) => found.indexOf(item) === -1
                            );
                        }
                    });
                });
                // Add new download to the active downloads list
                if (downloading.length > 0) {
                    getActiveDownloads();
                }
            }
        );
        chrome.downloads.search(
            {
                state: 'complete',
            },
            function (items) {
                var downloaded = sessionStorage.getItem('downloaded');
                if (items.length > downloaded) {
                    sessionStorage.setItem('downloaded', items.length);
                    getActiveDownloads();
                }
            }
        );
    }, 2000);
}

// Get completed downloads
function getCompletedDownloads() {
    // Completed downloads
    chrome.downloads.search(
        {
            state: 'complete',
        },
        function (DownloadItems) {
            $('.downloads .complete').empty();
            DownloadItems.forEach(function (item) {
                var filename = item.filename;
                chrome.downloads.getFileIcon(item.id, { size: 16 }, function (
                    icon
                ) {
                    var title = truncateString(
                        filename.substring(
                            filename.lastIndexOf('/') + 1,
                            filename.length
                        ),
                        true
                    );
                    if (icon == null) {
                        $('.downloads .complete').append(
                            '<a href="#" class="collection-item download-show" data-id="' +
                                item.id +
                                '">\
                                              <i class="fa fa-file" aria-hidden="true"></i> ' +
                                title +
                                '\
                                              <span class="secondary-content"></span></a>'
                        );
                    } else {
                        $('.downloads .complete').append(
                            '<a href="#" class="collection-item download-show" data-id="' +
                                item.id +
                                '">\
                                                <img src="' +
                                icon +
                                '"/> ' +
                                title +
                                '\
                                                <span class="secondary-content"></span></a>'
                        );
                    }
                });
            });
        }
    );
}

// All things download
function getActiveDownloads() {
    // Check for active downloads
    chrome.downloads.search(
        {
            state: 'in_progress',
        },
        function (DownloadItems) {
            $('.downloads .in-progress').empty();
            DownloadItems.forEach(function (item) {
                var fullurl = item.finalUrl;
                var title = truncateString(
                    fullurl.substring(
                        fullurl.lastIndexOf('/') + 1,
                        fullurl.length
                    ),
                    false
                );
                var server = fullurl.substring(0, fullurl.lastIndexOf('/'));
                // Check item's state
                if (item.canResume) {
                    var event =
                        '<span class="download-event tooltipped" data-event="resume" data-id="' +
                        item.id +
                        '"\
                       data-position="left" data-delay="50" data-tooltip="Resume download">\
                       <i class="fa fa-play" aria-hidden="true"></i></span>';
                } else {
                    var event =
                        '<span class="download-event tooltipped" data-event="pause" data-id="' +
                        item.id +
                        '"\
                       data-position="left" data-delay="50" data-tooltip="Pause download">\
                       <i class="fa fa-pause" aria-hidden="true"></i></span>';
                }
                $('.downloads .in-progress').append(
                    '<li id="download' +
                        item.id +
                        '" class="collection-item avatar">\
                                            ' +
                        event +
                        '\
                                            <span class="title">' +
                        title +
                        '</span>\
                                            <p>' +
                        server +
                        '</p>\
                                            <span class="secondary-content"></span>\
                                            </li>'
                );
                // Check status of download
                downloadStatus();
            });
        }
    );
    getCompletedDownloads();
}

function downloadStatus() {
    // Handle received bytes
    setInterval(function () {
        chrome.downloads.search(
            {
                state: 'in_progress',
            },
            function (DownloadItems) {
                // Handle newly added download by examining how many divs are active
                // and then append the new download
                DownloadItems.forEach(function (item) {
                    var totalSize = formatBytes(Math.round(item.totalBytes), 1);
                    var received = formatBytes(
                        Math.round(item.bytesReceived),
                        1
                    );
                    // status(received, totalSize, item);
                    $('#download' + item.id + ' .secondary-content').html(
                        received + ' / ' + totalSize
                    );
                });
            }
        );
    }, 1000);
}

// Show the downloaded file in its folder in a file manager
function showDownload(id) {
    chrome.downloads.show(id);
    chrome.downloads.showDefaultFolder();
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

function getApps() {
    chrome.management.getAll(function (apps) {
        apps_array = [];
        apps.forEach(function (app) {
            if (app.isApp) {
                apps_array.push(app);
            }
        });
        var items = 0;
        apps.forEach(function (app) {
            if (app.isApp) {
                items += 1;
            }
        });
        if (items % 3 == 0) {
            var rows = items / 3;
        } else {
            var rows = Math.round((items + 1) / 3, 1);
        }
        // Position apps in a 3xn grid
        for (var i = 0; i <= rows - 1; i++) {
            $('.apps .card-content').append(
                '<div class="row row' + i + ' center-align"></div>'
            );
            for (var j = i * 3; j <= apps_array.length - 1; j++) {
                // Get the biggest icon
                var icn = '';
                var icons = apps_array[j].icons;
                icons.forEach(function (icon) {
                    if (icon.size > 120) {
                        icn = icon.url;
                    }
                });
                // Add app in a column
                $('.apps .card-content .row' + i).append(
                    '<div class="col s4 m4 l4">\
              <a class="launch-app" data-app-id="' +
                        apps_array[j].id +
                        '">\
              <img src="' +
                        icn +
                        '" height="64px" width="64px"/></a></div>'
                );
                // Break loop every third iteration
                if ((j + 1) % 3 == 0) {
                    break;
                }
            }
        }
    });
}

// Launch application
function launchApp(id) {
    chrome.management.launchApp(id);
}

// Get CPU info
function getCPU() {
    var ticks = [],
        idles = [];
    chrome.system.cpu.getInfo(function (cpu) {
        var cores = cpu.processors.length;
        cpu.processors.forEach(function (processor, i) {
            var kernel = processor.usage.kernel;
            var user = processor.usage.user;
            var idle = processor.usage.idle;
            var tick = kernel + user + idle;
            ticks.push(tick);
            idles.push(idle);
        });
        totalTicks = ticks.reduce(add, 0);
        totalIdle = idles.reduce(add, 0);
        function add(a, b) {
            return a + b;
        }
    });
    if (typeof totalTicks == 'undefined') {
        totalTicks = 1663894.75;
        totalIdle = 1336661.5;
        cores = 4;
    }
    return { total: totalTicks / cores, idle: totalIdle / cores };
}

// Get Memory info
function getMemory() {
    // Get memory info
    chrome.system.memory.getInfo(function (memory) {
        $('.system .memory').empty();
        $('.system .memory').html(
            '<div class="center-align usage">\
                               ' +
                formatBytes(memory.availableCapacity) +
                '\
                               available of ' +
                formatBytes(memory.capacity) +
                '</div>'
        );
        var capacity = memory.capacity;
        var available = memory.availableCapacity;
        var percentage = (available / capacity) * 100;
        $('.system .memory').append('<div class="memorybar"></div>');
        $('.system .memorybar').progressbar({
            value: percentage,
        });
    });
}

// Get storage info
function getStorage() {
    // Get storage info
    chrome.system.storage.getInfo(function (storage) {
        storage.forEach(function (disk) {
            $('.system .storage').html(
                '<div class="center-align usage">\
                                  Total storage space: ' +
                    formatBytes(disk.capacity) +
                    '\
                                  </div>'
            );
        });
    });
}

// Convert bytes
function formatBytes(bytes, decimals) {
    if (bytes == 0) return '0 Byte';
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
        var truncated = title.substring(0, 100) + '...';
        return title;
    }
    if (title.length > 30) {
        var truncated = title.substring(0, 20) + '...';
        return truncated;
    }
    return title;
}

// Get current date and time

// All things preferences
var Preferences = {
    weather: function () {
        aggregateWeather();
    },
    timeFormat: function () {
        clearInterval(timeInterval);
        timeInterval = setInterval(function () {
            getDate();
        }, 0);
    },
    widget: function (widget) {
        var visibility = localStorage.getItem(widget);
        if (visibility == 0) {
            $('.' + widget).hide();
        } else {
            $('.' + widget).show();
        }
    },
    init: function () {
        var switches = $('.switch');
        switches.each(function () {
            var id = $(this).find('label :input').attr('id');
            var checked = localStorage.getItem(id);
            var isWidget = $('.widgets').find('#' + id).length;
            // Check if it is a widget
            if (isWidget == 1) {
                Preferences.widget(id);
            }
            // Runs only on first time load
            if (checked == null) {
                localStorage.setItem(id, 1);
                $(this).find('label :input').attr('checked', true);
            } else if (checked == 1) {
                $(this).find('label :input').attr('checked', true);
            } else {
                $(this).find('label :input').attr('checked', false);
            }
        });
    },
};

// All window on load functions
$(window).on('load', function () {
    // Bookmarks navigation
    $(document).on('click', '.bookmark-node', function () {
        var id = $(this).attr('id');
        getBookmarksSubTree(id);
    });

    // Delete all items from history
    $(document).on('click', '.obliterate', function () {
        deleteHistory();
    });

    // Show the downloaded file in its folder in a file manager
    $(document).on('click', '.download-show', function () {
        var id = parseInt($(this).attr('data-id'));
        showDownload(id);
    });

    // Pause download handler
    $(document).on('click', '.download-event', function () {
        var event = $(this).attr('data-event');
        var id = parseInt($(this).attr('data-id'));
        downloadEvents(event, id);
    });

    // Launch an application
    $(document).on('click', '.launch-app', function () {
        var id = $(this).attr('data-app-id');
        launchApp(id);
    });

    // Show/hide preferences
    $(document).on('click', '.preferences-btn', function () {
        if ($('.preferences').hasClass('active')) {
            $('.preferences').hide();
            $('.preferences').removeClass('active');
        } else {
            $('.preferences').show();
            $('.preferences').addClass('active');
        }
    });

    // Preferences handling
    $(document).on('change', '.switch', function () {
        // Get switch's id
        var id = $(this).find(':input').attr('id');
        // Set preference to 0/1 (left/right)
        if (id == 'w-unit') {
            if ($('#' + id).prop('checked')) {
                localStorage.setItem('w-unit', 1);
                Preferences.weather();
            } else {
                localStorage.setItem('w-unit', 0);
                Preferences.weather();
            }
        } else if (id == 'w-wind') {
            if ($('#' + id).prop('checked')) {
                localStorage.setItem('w-wind', 1);
                Preferences.weather();
            } else {
                localStorage.setItem('w-wind', 0);
                Preferences.weather();
            }
        } else if (id == 't-format') {
            if ($('#' + id).prop('checked')) {
                localStorage.setItem('t-format', 1);
                Preferences.timeFormat();
            } else {
                localStorage.setItem('t-format', 0);
                Preferences.timeFormat();
            }
        } else if (id == 'topsites') {
            if ($('#' + id).prop('checked')) {
                localStorage.setItem('topsites', 1);
                Preferences.widget(id);
            } else {
                localStorage.setItem('topsites', 0);
                Preferences.widget(id);
            }
        } else if (id == 'bookmarks') {
            if ($('#' + id).prop('checked')) {
                localStorage.setItem('bookmarks', 1);
                Preferences.widget(id);
            } else {
                localStorage.setItem('bookmarks', 0);
                Preferences.widget(id);
            }
        } else if (id == 'history') {
            if ($('#' + id).prop('checked')) {
                localStorage.setItem('history', 1);
                Preferences.widget(id);
            } else {
                localStorage.setItem('history', 0);
                Preferences.widget(id);
            }
        } else if (id == 'apps') {
            if ($('#' + id).prop('checked')) {
                localStorage.setItem('apps', 1);
                Preferences.widget(id);
            } else {
                localStorage.setItem('apps', 0);
                Preferences.widget(id);
            }
        } else if (id == 'downloads') {
            if ($('#' + id).prop('checked')) {
                localStorage.setItem('downloads', 1);
                Preferences.widget(id);
            } else {
                localStorage.setItem('downloads', 0);
                Preferences.widget(id);
            }
        } else if (id == 'system') {
            if ($('#' + id).prop('checked')) {
                localStorage.setItem('system', 1);
                Preferences.widget(id);
            } else {
                localStorage.setItem('system', 0);
                Preferences.widget(id);
            }
        }
    });

    // Set completed download items length to session storage
    chrome.downloads.search(
        {
            state: 'complete',
        },
        function (items) {
            // Set items length to session storage
            sessionStorage.setItem('downloaded', items.length);
            getCompletedDownloads();
        }
    );
});

// Grab first CPU measurement
var firstMeasure = getCPU();

// Grab second CPU measurement
// Get CPU usage percentage since boot time
var timeintervalCPU = setInterval(function () {
    $('.system .cpu').empty();

    var secondMeasure = getCPU();

    var idleDifference = secondMeasure.idle - firstMeasure.idle;
    var totalDifference = secondMeasure.total - firstMeasure.total;
    var percentage =
        100 - Math.round((idleDifference / totalDifference) * 100, 1);

    $('.system .cpu').html(
        '<div class="center-align usage">' + percentage + '%</div>'
    );
    $('.system .cpu').append('<div class="cpubar"></div>');
    $('.system .cpubar').progressbar({
        value: percentage,
    });
}, 2000);

// Display date
var timeInterval = setInterval(function () {
    getDate();
}, 0);

// Initialize user preferences
// Preferences.init();
// photos();
// aggregateWeather();
// getTopSites();
// getRecentBookmarks();
// getBookmarksTree();
// getHistory();
// checkDownloads();
// getApps();
// getMemory();
// getStorage();

export { getTest };
