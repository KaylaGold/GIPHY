// Initial array of GIF Reactions
let topics = ["Slow clap", "Hair flip", "Judging you", "Finger guns", "Oh no you didnt", "You got this"];

// Add function displayGifInfo to have HTML display content
function displayGifInfo() {

  // Deleting/emptying the GIFs prior to adding new GIFs
  $('#gifButtons').empty();

  // Looping through the array of GIFs
  for (let i = 0; i < topics.length; i++) {

    // Now dynamically generating buttons for each GIF in the array
    let b = $('<button>');
    // Adding a class of gif-btn to our button
    b.addClass("gif gif-btn");
    // Adding a data-attribute
    b.attr("data-gif", topics[i]);
    // Providing the initial button text
    b.text(topics[i]);
    // Adding the button to the gifButtons div
    $("#gifButtons").append(b);
  };
};


// This function handles events where the GIF button is clicked
$("#addGif").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the text box
  let input = $("#gif-input").val().trim()
  // Adding GIF from the textbox to the array
  topics.push(input);
  // Calling displayGifInfo which handles the processing of the GIF array
  displayGifInfo();
  $('#gif-input').val("");
});

$(document).on("click", ".gif", function () {
  let gifClicked = $(this).attr("data-gif")
  console.log(gifClicked);

  let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifClicked + "&api_key=8wxj1dB7Bhxy1x4Gfpap49uArL6LloD6&limit=5"

  // Create AJAX call for the specific reaction GIF being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      let content = response.data;

      for (let i = 0; i < content.length; i++) {
        // Creating a div to hold the GIF
        let gifDiv = $("<span class='item'>");

        // Store the rating data
        let rating = content[i].rating;
        // Create a <p> element to display the rating data
        let p = $("<p>").text("Rating: " + rating);
        // Display the rating
        gifDiv.append(p);

        // Creating an image tag to hold the image
        let image = $("<img>");

        //Retrieving the URL for the image and giving the <image> an src attribute of a property pulled off the result item
        image.attr("src", content[i].images.fixed_height_still.url);
        image.attr("data-stop", content[i].images.fixed_height_still.url);
        image.attr("data-run", content[i].images.fixed_height.url);

        // Appending the image
        gifDiv.append(image);

        // Now putting the entire GIF above the previous GIFs in HTML
        $("#view-gif").prepend(gifDiv);
      }
    }
    )

    // When double click image, it will run/stop
    $(document).on("click", "img", function() {
      console.log("gif clicked")

      let state = $(this).attr("data-state")
      console.log(this)

      if (state === "stop") {

          $(this).attr("src", $(this).attr("data-run"));
          $(this).attr("data-state", "run");

      } else {

          $(this).attr("src", $(this).attr("data-stop"));
          $(this).attr("data-state", "stop");
      }
  });
})

displayGifInfo();
