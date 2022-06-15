$(document).ready(function() {
// An array of Disney movies.  New Disney movies can be added to this array
var topics = ["Snow White and the Seven Dwarfs", "Star Wars: The Force Awakens", "101 Dalmatians", "The Lion King", "Fantasia", "Mary Poppins", "The Avengers", "The Jungle Book ", "Sleeping Beauty", "Pinocchio"];


// Creating Functions & Methods

// displays the buttons (uses a for loop)
function displayButtons(){
    $("#AreaForButtons").empty(); // erases anything in this div id 
    for (var i = 0; i < topics.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("topicA");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", topics[i]);
        gifButton.text(topics[i]);
        $("#AreaForButtons").append(gifButton);
    }
}


// Function that displays all of the gifs
function displayGiphy(){
    var topic = $(this).attr("data-name");
    console.log(topic);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=sg1Gu1xKupquYC4HitvTdwc4XbYdWTuB&limit=10";
    console.log(queryURL); // displays the constructed url

    //AJAX to call input from another source (website)
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); // make sure ajax call receives a response
        $("#GiphyPresentation").empty(); // being sure the div is empty
        var results = response.data; //storing the ajax call response
        if (results == ""){
          alert("There are no gifs for this Disney movie");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); //a div for each gif
            gifDiv.addClass("gifDiv");

            // getting the rating for each gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            //adding the rating to the gif
            gifDiv.append(gifRating);

            // gif to DOM
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state to still at the beginning of the DOM
            gifImage.addClass("image");
            gifDiv.append(gifImage);

            // add the current gif to the beinning of the stack (queue)
            $("#GiphyPresentation").prepend(gifDiv);
        }
    });
}


// Function to add a button (a Disney movie)
function addNewButton(){
    $("#userAddButton").on("click", function(){
    var topic = $("#movie-input").val().trim();
    if (topic == ""){
      return false; // user cannot add a blank button
    }
    topics.push(topic);

    displayButtons();
    return false;
    });
}


// Function Calls
displayButtons();
addNewButton();

// Document Event Listeners (change still and animate on clicks)
$(document).on("click", ".topicA", displayGiphy);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});