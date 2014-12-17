//version number & changes
var drunkenMovieVersion = 0.6
var myTitle = document.querySelector("title");
myTitle.innerHTML += (" " + drunkenMovieVersion);
/*
0.2 = roughly working, still needs gui fixes for user interactivity
0.3 = error handling and represenation works
0.4 = generates html list of movies added
0.5 = fully functioning with error handling but poor user interface
0.6 = improved user interface... mobile first!
0.7 = TODO: visualize the random-ness of choosing a movie
*/

//grab the input and output HTML into JS
var movieInputBox = document.querySelector("#movieInputBox");
var addButton = document.querySelector("#add");

var pickButton = document.querySelector("#picker");
var addButton = document.querySelector("#add");

//grab various other HTML elements
var movieList = document.querySelector("ul");
var chosenMovie = document.querySelector("#chosenMovie");
var error = document.querySelector("#error");
var h3 = document.querySelector("h3");
var reset = document.querySelector("#reset");

//initialize the movieArray so it can be appended later
var movieArray = [];
var newlyAddedMovie = undefined;
var randomMovieNumber = undefined;

//makes HTML lists with function(args) as the content
function addToList() {
  var result = "<li>";
  var args = Array.prototype.slice.call(arguments);
  result += args.join("</li><li>");
  result += "</li>"; // end list
  return result;
};

//function to choose a movie from the movieArray at random
function pickMovie() {
  if (movieArray.length === 0) {
    renderError(true);
  } else {
    randomMovieNumber = Math.floor(Math.random() * movieArray.length)
    chosenMovie.innerHTML = movieArray[randomMovieNumber];
    displayChosenMovie();
  }
};

//event listeners for user interaction
pickButton.addEventListener("click", pickHandler, false);
addButton.addEventListener("click", addHandler, false);
document.addEventListener("keydown", addKeyHandler, false);
error.addEventListener("click", errorClick, false);
reset.addEventListener("click", resetEverything, false);

//handles the enter-key input
function addKeyHandler(event) {
  if (event.keyCode === 13) {
    checkInput();
  }
};

function errorClick() {
  renderError(false);
};

function addHandler() {
  checkInput();
};
function pickHandler() {
  pickMovie();
};

function checkInput() {
  // check the user's input for blanks and doubles
  newlyAddedMovie = movieInputBox.value.toString();
  if (newlyAddedMovie === "" || newlyAddedMovie === String(movieArray[0])) {
    renderError(true);
  } else {
    addMovie();
  }
};

//accepts boolean values as arguments. default is false
function renderError(thereIsAnError) {
  if (thereIsAnError) {
    error.style.display = "block";
    error.style.opacity = "1";
    error.style.height = "auto";
  } else {
    error.style.display = "none";
    error.style.opacity = "0";
    error.style.height = "auto";
  }
};

function addMovie() {
  if (error.style.opacity === "1") {
    renderError(false);
  }
  if (movieInputBox.value !== 0) {
    movieInputBox.value = null;
  }
  if (h3.innerHTML === "No movies in your list... :(") {
    h3.innerHTML = "Your movie list ^_^";
  }
  movieArray.unshift(newlyAddedMovie);
  makeList();
};

function makeList() {
  //simple way
  movieList.innerHTML += addToList(newlyAddedMovie);
  //complicated way (broken)
  //for (var i = 0; i < movieArray.length; i++) {
  //  movieList.innerHTML = addToList(movieArray[i]);
  //}
}

function displayChosenMovie() {
  chosenMovie.style.opacity = "1";
};

function resetEverything() {
  renderError(false);
  movieArray = [];
  movieList.innerHTML = "";
  h3.innerHTML = "No movies in your list... :(";
};