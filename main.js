
$.ajaxSetup({
	error:function(x,e,errorThrown) {
		console.log(x.getStatusCode());
		$("#status").prepend("Error!");		
	}
});

//EDIT THESE LINES
//Title of the blog
var TITLE = "Вестник связи";
//RSS url
var RSS = "http://www.mforum.ru/rss/news.xml";
//Stores entries
var entries = [];
var selectedEntry = "";

//listen for detail links
$(".contentLink").live("click", function() {
	selectedEntry = $(this).data("entryid");
});


onDeviceReady: function() {
//	adbuddiz.setAndroidPublisherKey("a9b7d05a-c791-41b1-a3b0-ca629af013a7");
//      	adbuddiz.setIOSPublisherKey("TEST_PUBLISHER_KEY_IOS");
//      	adbuddiz.cacheAds();
//	adbuddiz.showAd();
        app.receivedEvent('deviceready');
   }


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
	

