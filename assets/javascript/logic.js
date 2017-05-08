//Here I will declare my frist couple variables Travis Scott, Kid Cudi, & Wiz Khalifa

var artists = ["Travis Scott", "Kid Cudi", "Wiz Khalifa"];
 
//create a function that will render buttons on screen

function renderButtons() {
	$("#artist-button").empty();

	//the purpose of this forloop is to go through the array of artists 
	for ( var i = 0; i < artists.length; i++){

		var artistButton = $("<button class='btn btn-primary' id='artistBtn'>");
		artistButton.attr("data-name", artists[i]);
		artistButton.text(artists[i]);
		$("#artist-button").append(artistButton);
	}
}
//I will use the on click function to send the users input to the giphy API & return the gifs

$("#addArtist").on("click", function(){
	event.preventDefault();

	//declaring a variable artistname, inside that variable im storing the artist input value and trimming it
	var artistName = $("#artist-input").val().trim(); 
	//pushing in the new artist name into artists
	artists.push(artistName);
	//running the render button function every time when there is a new artist added 
	renderButtons();
	$("#artist-input").val("");
})

//create function that will render the gifs
//query select document, and whenever the user click with anything id of artistbtn, run this
$(document).on("click", "#artistBtn", function(){
	//clear the div whenever an artist button is clicked
	$("#artistGifs").empty();

	var artistName = $(this).attr("data-name");
	var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + artistName + "&api_key=dc6zaTOxFJmzC&limit=10"
	
	//query selection the ajax function & in my request I am sending the query url and the method to get back the gif urls in order to render gifs on the screen
	$.ajax({
		url: queryUrl,
		method: "GET"
	//after the request is sent and the response is recieved this function runs
	}).done(function(response){
		console.log(response.data);

		//creating a for loop that will start at 0 and increment by one as long as i is less than the length of response.data
		for (var i = 0; i < response.data.length; i++) {
			//creating an img and storing it in the variable named gif
			var gif = $("<img>");
			//adding a src attribute and setting it equal to the still URL
			gif.attr("src", response.data[i].images.original_still.url);
			gif.attr("data-still", response.data[i].images.original_still.url);
			gif.attr("data-animate", response.data[i].images.original.url);
			gif.attr("data-state", "still");
			//adding an id called gif
			gif.attr("id", "gifId");
			//query selecting the div w the id artistGifs and Im appending the gif that just created 
			$("#artistGifs").append(gif);
		}
		

	}); 
});
//on click function that gets triggered whenever the user click on the id of gifId anywhere on the document
$(document).on("click", "#gifId", function(){
	//creating a var state to store the attribute of the gif being clicked
	var state = $(this).attr("data-state");

	//if state is still  
	if (state === "still"){
		//setting the gifs source to the animated source
		$(this).attr("src", $(this).data("animate"));
		//setting data state to animate
		$(this).attr("data-state", "animate");
	}

	//if state is not equal to still
	else {
		//then set the source of the gif to the still source
		$(this).attr("src", $(this).data("still"));
		//setting the datastate attr to still
		$(this).attr("data-state", "still");
	}
})

//this function renders the buttons that exist in my original artist array
renderButtons();