
// // Then run a request to the BBC API with the movie specified
// request('https://newsapi.org/v1/articles?source=bbc-news&sortBy=latest&apiKey=27b0fae587184d978804a9fe7727d8b4', function (error, response, body) {

// 	// If the request is successful (i.e. if the response status code is 200)
// 	if (!error && response.statusCode == 200) {

// 		// Parse the body of the site and recover just the imdbRating
// 		// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it). 
// 		console.log("BBC News Top headlines: " + "\n"); 
// 		console.log(JSON.parse(body)["articles"]);
// 	}
// });

// // Then run a request to the CNN API with the movie specified
// request('https://newsapi.org/v1/articles?source=cnn&sortBy=latest&apiKey=27b0fae587184d978804a9fe7727d8b4', function (error, response, body) {

// 	// If the request is successful (i.e. if the response status code is 200)
// 	if (!error && response.statusCode == 200) {

// 		// Parse the body of the site and recover just the imdbRating
// 		// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it). 
// 		console.log("CNN News Top headlines: " + "\n"); 
// 		console.log(JSON.parse(body)["articles"]);
// 	}
// });


// SETUP VARIABLES
// ==========================================================
var allNews = [{ }];

var numResults 	= 0;


// Based on the queryTerm we will create a queryURL 
var queryURLBase = ['https://newsapi.org/v1/articles?source=the-guardian-uk&sortBy=latest&apiKey=27b0fae587184d978804a9fe7727d8b4',
					'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=27b0fae587184d978804a9fe7727d8b4',
					'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=27b0fae587184d978804a9fe7727d8b4'];


// Array to hold the various article info
var articleCounter = 0;

// FUNCTIONS
// ==========================================================


// This runQuery function expects two parameters (the number of articles to show and the final URL to download data from)
function runQuery(numArticles, queryURL){

	// Then run a request to the Gardian(UK) API with the movie specified
	//request(queryURLBase, function (error, response, body) {
	$.ajax({url: queryURL, method: "GET"}) 
		.done(function(gardianNews) {
		// If the request is successful (i.e. if the response status code is 200)
		if ( gardianNews.status == 'ok') {

			numResults = numResults + Object.keys(gardianNews.articles).length;
			console.log(numResults);
			// Parse the body of the site and recover just the imdbRating
			// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it). 
			//console.log("Gardian (UK) News Top headlines: " + "\n"); 
			//console.log(JSON.parse(body)["articles"]);
			//var gardianNews = JSON.parse(body);
			// Loop through and provide the correct number of articles
	
			allNews.push.apply(allNews, gardianNews.articles);		
		}
	});

}

// METHODS
// ==========================================================
	
	// On Click button associated with the Search Button
	$('#runSearch').on('click', function(){

		// Initially sets the articleCounter to 0
		articleCounter = 0;

		// Empties the region associated with the articles
		$("#wellSection").empty();

		//console.log(allNews);
		//console.log(allNews.length);
		for (var j=1; j<numResults; j++) {

			// Add to the Article Counter (to make sure we show the right number)
			articleCounter++;

			// Create the HTML Well (Section) and Add the Article content for each
			var wellSection = $("<div>");
			wellSection.addClass('well');
			wellSection.attr('id', 'articleWell-' + articleCounter)
			$('#wellSection').append(wellSection);


			// Then display the remaining fields in the HTML (Title, Date, URL)
			$("#articleWell-"+ articleCounter).append('<h5>' + allNews[j].title + "</h5>");
			$("#articleWell-"+ articleCounter).append('<h5>' + allNews[j].publishedAt + "</h5>");
			$("#articleWell-"+ articleCounter).append("<a href='" + allNews[j].url + "' target='_blank'>" + allNews[j].url + "</a>");	

		}		
		// This line allows us to take advantage of the HTML "submit" property. This way we can hit enter on the keyboard and it registers the search (in addition to clicks).
		return false;
	});	

// This button clears the top articles section
$('#clearAll').on('click', function(){
	articleCounter = 0;
	$("#wellSection").empty();
})

$( document ).ready(function() {
	for (var i=0; i<queryURLBase.length; i++) {
		queryURL = queryURLBase[i];

		// Then we will pass the final queryURL and the number of results to include to the runQuery function
		runQuery(numResults, queryURL);
	}
});
