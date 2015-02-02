
$.ajaxSetup({
	error:function(x,e,errorThrown) {
		console.log(x.getStatusCode());
		$("#status").prepend("Error!");		
	}
});

//EDIT THESE LINES
//Title of the blog
var TITLE = "ИТ-вакансии в Москве";
//RSS url
var RSS = "http://http://www.itnews.com/feed";
//Stores entries
var entries = [];
var selectedEntry = "";

//listen for detail links
$(".contentLink").live("click", function() {
	selectedEntry = $(this).data("entryid");
});

    // deviceready Event
    //

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    
//	onDeviceReady: function() {
//        app.receivedEvent('deviceready');
//    },

//	onDeviceReady: function() {
//	adbuddiz.setAndroidPublisherKey("a9b7d05a-c791-41b1-a3b0-ca629af013a7");
//      	adbuddiz.setIOSPublisherKey("TEST_PUBLISHER_KEY_IOS");
//      	adbuddiz.cacheAds();
//	adbuddiz.showAd();
//        app.receivedEvent('deviceready');
//   },
	onDeviceReady: function() {
        app.receivedEvent('deviceready');
   },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

//Listen for main page
$("#mainPage").live("pageinit", function() {
	//Set the title
	$("h1", this).text(TITLE);

	$.get(RSS, {}, function(res, code) {
		entries = [];
		var xml = $(res);
		var items = xml.find("item");
		$.each(items, function(i, v) {
			entry = { 
				title:$(v).find("title").text(), 
				link:$(v).find("link").text(), 
				description:$.trim($(v).find("description").text())
			};
			entries.push(entry);
		});

		//now draw the list
		var s = '';
		$.each(entries, function(i, v) {
			s += '<li><a href="#contentPage" class="contentLink" data-entryid="'+i+'">' + v.title + '</a></li>';
		});
		$("#linksList").html(s);
		$("#linksList").listview("refresh");
	});

});

//Listen for the content page to load
$("#contentPage").live("pageshow", function(prepage) {
	//Set the title
	$("h1", this).text(entries[selectedEntry].title);
	var contentHTML = "";
	contentHTML += entries[selectedEntry].description;
	contentHTML += '<p/><a href="'+entries[selectedEntry].link + '">Источник</a>';
	$("#entryText",this).html(contentHTML);
});
	
