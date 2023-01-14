var APIKeyTMDB = "e4fdcb0708125c02d9d3bb1ad5536644";
var APIKeyMG = "	gLzhamakWx2Q3FRoiJdGL8v40Iz440nZ5TH6l6a4";
var goBtn = $("#go-button");

//api.themoviedb.org/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg

https: function getAPI() {
  var requestURL =
    "https://api.themoviedb.org/3/movie/76341?api_key=" + APIKeyTMDB;

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
getAPI();

//Fetch movie searching by name ------------------------------------------------------------------
function nameSearch(event) {
  event.preventDefault();

  var Searchname = event.currentTarget;
  console.log(event.currentTarget);
  var Inputtext = $(Searchname).siblings("#input"); //the elemntID of the movie text input
  var nametextsave = Inputtext.val();

  console.log(nametextsave);
  fetch(
    "https://api.themoviedb.org/3/search/movie?api_key=" +
      APIKeyTMDB +
      "&query=" +
      nametextsave
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // EDGE CASE: Movie or show doesn't exist in database (doesn't have an ID), give message "could not find"
      // TODO: Create drop down of all results, placing selected option into search field (InputText.val)
      var storedID = data.results[0].id;
      var requestProvider =
        "https://api.themoviedb.org/3/movie/" +
        storedID +
        "/watch/providers?api_key=" +
        APIKeyTMDB;
      fetch(requestProvider)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var message = $("#message");
          if (!data.results.US) {
            // --------- create message text on interval timer --------------------------------------------
            message.text("Not available in the US");
            setTimeout(function () {
              message.text("");
            }, "1000");
            // --------------------------------------------------------------------------------------------
          } else if (data.results.US.flatrate) {
            for (let i = 0; i < data.results.US.flatrate.length; i++) {
              var streamProvider = data.results.US.flatrate[i];
              console.log(streamProvider);
              console.log(streamProvider.provider_name);
              // ----------------- Append streaming provider name to HTML ---------------------------------
              // TODO: fix stacking issue by clearing results at start of click event
              var providerList = $("#provider-list");
              var providerName = $("<p>");
              var iconPath =
                "https://image.tmdb.org/t/p/w200" + streamProvider.logo_path;
              providerName.text(streamProvider.provider_name);
              providerList.append($("<img src" + iconPath + ">"));
              providerList.append(providerName);
              // -----------------------------------------------------------------------------------------
              // -------hide main display and show search page display -----------------------------------
              var mainDisplay = $(".main-display");
              var searchedDisplay = $(".searched-display");
              mainDisplay.addClass("hide");
              searchedDisplay.removeClass("hide");
              // -----------------------------------------------------------------------------------------
            }
          } else {
            // TODO: Give option to search for showtimes
            // ------- create message text on interval timer ---------------------------------------------
            message.text("Not available on streaming");
            setTimeout(function () {
              message.text("");
            }, "1000");
          }
          // ---------------------------------------------------------------------------------------------
        });
    });
}
goBtn.on("click", nameSearch);

//Fetch Trending Movies or tv -----------------------------------------------------------------

function gettrendingAPI() {
  var requestTrendingURL =
    "https://api.themoviedb.org/3/trending/movie/day?api_key=" + APIKeyTMDB; //all includes people, movie and tv

  fetch(requestTrendingURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var top5 = data.results;
    }); //returns 20 pages; could do results 1-5
}
gettrendingAPI();

//Fetches movie by ID to see watch providers ---------------------------------------------------
function watchproviders() {
  //get movie id from movie data
  // var movieID = storedID
  var requestprovider =
    "https://api.themoviedb.org/3/movie/12/watch/providers?api_key=" +
    APIKeyTMDB;
  fetch(requestprovider)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
watchproviders();

//Fetch Recent movies for movie list on front page-----------------------------------------------
function recentmovies() {
  var requestrecent =
    "https://api.themoviedb.org/3/movie/latest?api_key=" +
    APIKeyTMDB +
    "&language=en-US";
  fetch(requestprovider)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function moviereviews() {
  //get movie id from movie data
  // var movieID = storedID
  var requestreviews =
    "https://api.themoviedb.org/3/movie/12/reviews?api_key=" +
    APIKeyTMDB +
    "&language=en-US&page=1";
  fetch(requestreviews)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
moviereviews(); //returns reviews by folks on the TMDB site
//if results=none, display text = unable to stream this movie, option to input zip code for Theater

//What do do when the movie has multiple results?
//from movie info available: poster_path, original_language, overview, release_date, vote_average

//-----------------slideshow js-------------------
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 2 seconds
}

//-------------fetch api for top rated movies button -----------------------------
function topmovies() {
  var requesttop =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=" +
    APIKeyTMDB +
    "&language=en-US&page=1";
  fetch(requesttop)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      // console.log(data.results[0].title);
      for (let i = 0; i < data.results.length; i++) {
        var topMovieList = data.results[i].title;
        // console.log(topMovieList);
        var topMovieListInput = $("#top-movie-list");
        var movielistEl = $("<li>");
        movielistEl.text(topMovieList);
        topMovieListInput.append(movielistEl);
      }
    });
}
topmovies();
//----------------------------
function topshows() {
  var requesttoptv =
    "https://api.themoviedb.org/3/tv/top_rated?api_key=" +
    APIKeyTMDB +
    "&language=en-US&page=1";
  fetch(requesttoptv)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.results[0].name);
      for (let i = 0; i < data.results.length; i++) {
        var toptvList = data.results[i].name;
        console.log(toptvList);
        var toptvListInput = $("#top-tv-list");
        var tvlistEl = $("<li>");
        tvlistEl.text(toptvList);
        toptvListInput.append(tvlistEl);
      }
    });
}
topshows();

//------------------JS for Movie and TV Modals-----------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) {
      // Escape key
      closeAllModals();
    }
  });
});
