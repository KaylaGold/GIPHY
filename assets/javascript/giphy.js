
 
           // Initial array of emojis
           let topics = ['happy','sad', 'angry'];

///////////////////////////////////////////////////////////////

        // Function for dumping the JSON content for each button into the div
      function displayEmojiInfo() {

        let emoji = $(this).attr("data-name");
        let queryURL = "https://media1.giphy.com/media/CaiVJuZGvR8HK/200_s.gif" + emoji + "&api_key=8wxj1dB7Bhxy1x4Gfpap49uArL6LloD6&limit=5";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          $("#e-view").text(JSON.stringify(response));
          renderButtons();
     

                // Creating a div to hold the movie
                let eDiv = $("<div class='emoji'>");

                // Storing the rating data
                let rating = response.rating;
      
                // Creating an element to have the rating displayed
                let pOne = $("<p>").text("Rating: " + rating);
      
                // Displaying the rating
                eDiv.append(pOne);
      
                // Retrieving the URL for the image
                let imgURL = response.images.fixed_height_still.url;
      
                // Creating an element to hold the image
                let image = $("<img>").attr("src", imgURL);
      
                // Appending the image
                eDiv.append(image);
      
                // Putting the entire movie above the previous movies
                $("#e-view").prepend(eDiv);
              
      
            });
        }
  

            
///////////////////////////////////////////////////////
     
           // Function for displaying emoji data
           function renderButtons() {
     
             // Deleting the emoji buttons porior to adding new movie buttons
             // (this is necessary otherwise we will have repeat buttons)
             $("#e-view").empty();
     
             // Looping through the array of emoji topics
             for (let i = 0; i < topics.length; i++) {
     
               // Then dynamicaly generating buttons for each emoji in the array.
               // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
               let a = $("<button>");
               // Adding a class of e-btn to our button
             a.addClass("e-btn");

               // Adding a data-attribute with a value of the emoji at index i
               a.attr("data-name", topics[i]);
               // Providing the button's text with a value of the emoji at index i
               a.text(topics[i]);
               // Adding the button to the HTML
               $("#e-view").append(a);
             }
           }
     
           // This function handles events where one button is clicked
           $("#add-e").on("click", function(event) {
             // event.preventDefault() prevents the form from trying to submit itself.
             // We're using a form so that the user can hit enter instead of clicking the button if they want
             event.preventDefault();
     
             // This line will grab the text from the input box
             let emoji = $("#e-input").val().trim();
             // The emoji from the textbox is then added to our array
             topics.push(emoji);
     
             // calling renderButtons which handles the processing of our emoji array
             renderButtons();
           });
     
            // Adding a click event listener to all elements with a class of "movie-btn"
      $(document).on("click", ".e-btn", displayEmojiInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

     