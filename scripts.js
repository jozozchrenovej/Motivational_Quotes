console.log("Loading 1");


var quoteToDisplay;
var photo_request;


//this function creates the HTML content of the quote
function makeHTML(){
	console.log("Making HTML...");
	var htmlStr = "";
	//var photo_number = Math.floor((Math.random() * 100) + 1);
	
	htmlStr += "<h2>" + " '" + quoteToDisplay + "' " + "</h2>";
	htmlStr += "<h3>" + " - " + "<i>"+ randomName + " " + randomSurname + "</i>" + "</h3>";  
	
	//the following if-else statement is for printing either a picture, of a string in case that picture was not found
	if (photo_request === "<h4>There is no photo, but there is always hope</h4>") {
		htmlStr += photo_request;
	}	

	else {
		htmlStr += "<img src='" + photo_request + "' >";
	}

	//displaying fake FB share button
	htmlStr += "<img id='share_button' src='fbshare.png'>";
	
	
	
	console.log("we are listening for the fb button click");
	
	// A funny message pops up if somebody presses the fake FB share button
	$('#motivational-quote').html(htmlStr);
	$('#share_button').click(function() {
		
		alert("You would really share this???");
	});

	//$('body').on('click','#share_button',function(){alert('it works')});
	
}

//getting pictures from Flickr
function getFlickrData(term){
	console.log("Getting Flickr data...");
	
	
	var flickrURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&extras=url_o&text=";
	
	var currentSearchWord = term;
	var myFlickrKey = "&api_key=" + "77043827e1a34becf84e170f15d23818";
	var flickrReqURL = flickrURL + currentSearchWord + myFlickrKey;
	
	console.log(flickrReqURL);
	
	$.ajax({
		url: flickrReqURL,
		type: 'GET',
		dataType: 'json',
		error: function(err){
			console.log(err);


		},
		success: function(data){
			console.log("Got the Flickr data!!");
			console.log(data);
			
			flickrPhotos = data.photos.photo;
			
			if (flickrPhotos.length === 0) {
				//in case there is not such a photo related to the query that the user has inputted, it prints the following message
				photo_request = "<h4>There is no photo, but there is always hope</h4>";
			}
			else{
				photo_request = flickrPhotos[0].url_o;
			}
			console.log(flickrPhotos);
			
			getRandomName();
			
		}
	});

}

//function for pulling a random name from uinames database
function getRandomName(){
	console.log("Retrieving random name...");
	
	var randomNameURL = "http://uinames.com/api/?amount=1";
	
	$.ajax({
		url: randomNameURL,
		type: 'GET',
		dataType: 'json',
		error: function(err){
			console.log("Oh no...");
			console.log(err);
		},
		success: function(data){
			console.log("WooHoo");
			console.log(data);
			
			randomName = data.name;
			randomSurname = data.surname;
			
			console.log(data.name);
			console.log(data.surname);
			
			makeHTML();
			
		}
	});
	
}

//function for pulling a random quote from forismatic API
function getQuote(word_search){
	console.log("Getting a quote data...");
	
	var quoteURL = "http://api.open-notify.org/iss-now.json";
	
	//var quoteURL = "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";	
	
	$.ajax({
		url: quoteURL,
		type: 'GET',
		dataType: 'json',
		cache: false,
		error: function(err){
			console.log("Oh no...");
			console.log("Could not load a quote...");
			console.log(err);
		},
		success: function(data){
			console.log("WooHoo");
			console.log(data);
			
			quoteToDisplay = data.quoteText;
			console.log(quoteToDisplay);
		
			getFlickrData(word_search);			
			
		},
		
	});
	setInterval(getQuote, 1000);
}

var mashups;



//waiting for everything to load, then action

$(document).ready(function(){  
	console.log("Loading 2");
	//action when button clicked
	$('#the-button').click(function() {
	console.log("You Pressed me?");
	var theInputValue = $('#the-input').val();
	console.log(theInputValue);
	
	
	
	
	getQuote(theInputValue);

	});		

		   

});					   



console.log("Loading 3");