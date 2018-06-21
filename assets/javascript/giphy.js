// Initial array of GIF Reactions
let gifReactions = ["Eye Roll", "Face Palm", "Finger Guns", "Oh No You Didn't", "Slow Clap", "SMH",];

// Function for displaying GIF data
function renderButtons () {
  // Deleting/emptyingthe GIFs prior to adding new GIFs
  $("buttons-view").empty();
  // Looping through the array of GIFs
  for (let i =0; i < gifReactions.length; i++){
  // Now dynamically generating buttons for each GIF in the array
  let b = $("<button>");
  // Adding a class of gif-btn to our button
  b.addClass("gif-btn");
  // Adding a data-attribute
  b.attr("data-name", gifReactions[i]);
  // Providing the initial button text
  b.text(gifReactions[i]);
  // Adding the button to the buttons-view div
  $("#buttons-view").append(b);
  
  }
  
  }


  // This function handles events where the GIF button is clicked
$("add-gif").on("click", function(event){
  event.preventDefault();
  // This line grabs the input from the text box
  let gifRClicked = $("#gif-input").val().trim();
  // Adding GIF from the textbox to the array
  gifReactions.push(gifRClicked);
  // Calling renderButtons which handles the processing of the GIF array
  renderButtons();
  });

// Add function displayGifInfo to have HTML display content
function displayGifInfo() {
  let gifRClicked = $(this).attr("data-name");
  let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifRClicked + "&api_key=8wxj1dB7Bhxy1x4Gfpap49uArL6LloD6&limit=5";

// Create AJAX call for the specific reaction GIF being clicked
$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {


// Looping through the array of GIFs
for (let i =0; i < gifReactions.length; i++){
// Creating a div to hold the GIF
let gifDiv = $("<div class = 'gifRClicked'>");
// Store the rating data
let rating = response[i].rating;
// Create a <p> element to display the rating data
let p = $("<p>").text("Rating:" + rating);
// Display the rating
gifDiv.append(p); 

// Creating <img> element to hold the image
let image = $("<img>");
// Retrieving the URL for the image and giving the <image> an src attribute of a property pulled off the result item
image.attr("src", results[i].images.fixed_height_still.url);
image.attr("data-still", results[i].images.fixed_height_still.url);
image.attr("data-animate", results[i].images.fixed_height.url);            
// Appending the image
gifDiv.append(image);
// Now putting the entire GIF above the previous GIFs
$("#gif-view").prepend(gifDiv);

}
});}

  



// Adding a click event listener to all elements with class "gif-btn"
$(document).on("click", ".gif-btn", displayGifInfo)

$(document).on("click", "img", function() {
  console.log("gif clicked")

  let state = $(this).attr("data-state")
  console.log(this)

  if (state === "still") {

      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");

  } else {

      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
  }
});


// Calling renderButtons function to display the initial buttons
renderButtons(); 