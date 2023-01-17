var APIKeyTMDB = "e4fdcb0708125c02d9d3bb1ad5536644";
var APIKeyMG = "I8kAI3zU053ukzkfjCmdi8ScpdJ7HtiHOgCFiaLf";
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
      //console.log(data);
    });
}
getAPI();

//Fetch movie searching by name ------------------------------------------------------------------
function nameSearch(event) {
  event.preventDefault();
  $("#provider-list").empty();
  $("#rental-provider-list").empty();
  var Searchname = event.currentTarget;
  //console.log(event.currentTarget);
  var Inputtext = $(Searchname).siblings("#input"); //the elemntID of the movie text input
  var nametextsave = Inputtext.val();

  console.log(nametextsave);
  fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${APIKeyTMDB}&query=${nametextsave}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // EDGE CASE: Movie or show doesn't exist in database (doesn't have an ID), give message "could not find"
      // TODO: Create drop down of all results, placing selected option into search field (InputText.val)

      // display stats
      displayDetailsInSecondPage(data);

      // TODO: Create drop down of all results, placing selected option into search field (InputText.val)/May need to change from a drop down to a card that displays a list of the results for the user to choose from
      console.log(data.results);
      var searchLength = data.results.length;
      if (searchLength > 4) {
        searchLength = 5;
      }
      for (var i = 0; i < searchLength; i++) {}
      // ------------------------------------------------------------------------------------------------
      var storedID = data.results[0].id;
      var mediaType = data.results[0].media_type;
      console.log(data.results);
      var requestProvider =
        "https://api.themoviedb.org/3/" +
        mediaType +
        "/" +
        storedID +
        "/watch/providers?api_key=" +
        APIKeyTMDB;
      console.log(requestProvider);
      fetch(requestProvider)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          results();
          function results() {
            var message = $("#message");
            if (!data.results.US) {
              // --------- create message text on interval timer --------------------------------------------
              message.text("Not available in the US!");
              setTimeout(function () {
                message.text("");
              }, "1000");
              // --------------------------------------------------------------------------------------------
            } else if (data.results.US.flatrate) {
              for (let i = 0; i < data.results.US.flatrate.length; i++) {
                var streamProvider = data.results.US.flatrate[i];
                console.log(streamProvider);
                //console.log(streamProvider.provider_name);
                // ----------------- Append streaming provider name to HTML ---------------------------------
                // TODO: link to TMDB
                var providerList = $("#provider-list");
                var iconCard = $("<div class=icon-card></div>");
                var hoverText = $("<div class=hover-text></div>");
                providerList.append(iconCard);
                providerList.append(hoverText);
                var iconPath =
                  "https://image.tmdb.org/t/p/w200" + streamProvider.logo_path;

                iconCard.append(
                  $("<img id=provider-icon src=" + iconPath + ">")
                );
                iconCard.append(hoverText);
                hoverText.append(streamProvider.provider_name);
                // -----------------------------------------------------------------------------------------
                // -------hide main display and show search page display -----------------------------------
                var mainDisplay = $(".main-display");
                var searchedDisplay = $(".searched-display");
                var newReleases = $("#new-releases");
                mainDisplay.addClass("hide");
                searchedDisplay.removeClass("hide");
                newReleases.addClass("hide");
                // -----------------------------------------------------------------------------------------
              }
            } else if (data.results.US.rent) {
              for (let i = 0; i < data.results.US.rent.length; i++) {
                var rentProvider = data.results.US.rent[i];
                // console.log(rentProvider);
                // console.log(rentProvider.provider_name);
                // ----------------- Append rental provider name to HTML ---------------------------------
                var rentalProviderList = $("#rental-provider-list");
                var iconCard = $("<div class=icon-card></div>");
                var hoverText = $("<div class=hover-text></div>");
                rentalProviderList.append(iconCard);
                rentalProviderList.append(hoverText);
                var rentalIconPath =
                  "https://image.tmdb.org/t/p/w200" + rentProvider.logo_path;

                iconCard.append(
                  $("<img id=provider-icon src=" + rentalIconPath + ">")
                );
                iconCard.append(hoverText);
                hoverText.append(rentProvider.provider_name);
                var mainDisplay = $(".main-display");
                var searchedDisplay = $(".searched-display");
                var newReleases = $("#new-releases");
                mainDisplay.addClass("hide");
                searchedDisplay.removeClass("hide");
                newReleases.addClass("hide");
              }
            } else {
              // ------- create message text on interval timer ---------------------------------------------
              message.text("Not available to stream or rent");
              setTimeout(function () {
                message.text("");
              }, "1000");
              // TODO: Give option to search for showtimes
            }
            // ---------------------------------------------------------------------------------------------
          }
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
      //console.log(data);
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
      //console.log(data);
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
      //console.log(data);
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
      //console.log(data);
    });
}
moviereviews(); //returns reviews by folks on the TMDB site
//if results=none, display text = unable to stream this movie, option to input zip code for Theater

//What do do when the movie has multiple results?

//from movie info available: poster_path, original_language, overview, release_date, vote_average

// mediaType: movie, tv, person
// mediaTypeId: is the id of the media type above
function displayDetailsInModal(mediaType, mediaTypeId) {
  var requestURL = `https://api.themoviedb.org/3/${mediaType}/${mediaTypeId}?api_key=${APIKeyTMDB}`;
  console.log(mediaType, mediaTypeId);
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
      $("#my-image2").attr(
        "src",
        "https://www.themoviedb.org/t/p/w500" + data.poster_path
      );
      $("#my-image").attr(
        "src",
        "https://www.themoviedb.org/t/p/w500" + data.backdrop_path
      );
      $("#movie-title").text(data.original_title);
      $("#release-date").text(data.release_date);
      $("#original-language").text(data.original_language);
      $("#rated").text("R");
      $("#genres").text(
        data.genres.map(function (item) {
          return item["name"];
        })
      );
      $("#overview").text(data.overview);
      $("#vote-avg").text(data.vote_average);
    });
}

// mediaType: movie, tv, person
// mediaTypeId: is the id of the media type above
function getCredits(mediaType, mediaTypeId) {
  var requestURL = `https://api.themoviedb.org/3/${mediaType}/${mediaTypeId}/credits?api_key=${APIKeyTMDB}`;
  console.log(
    "hello",
    `mediaType:${mediaType}`,
    `mediaTypeId:${mediaTypeId}`,
    requestURL
  );
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var castNames = data.cast
        .slice(0, 8)
        .map((castMember) => castMember.name); // array of names
      $(".searched-display")
        .find(".cast-card")
        .find("li")
        .each((elementIndex, liEl) => {
          $(liEl).text(castNames[elementIndex]);
        });
    });
}

function displayDetailsInSecondPage(data) {
  var firstResult = data.results[0];
  $(".searched-display")
    .find("img")
    .attr(
      "src",
      "https://www.themoviedb.org/t/p/w500" + firstResult.poster_path
    );
  $(".searched-display").find(".synopsis").text(firstResult.overview);
  $(".searched-display").find(".caption").text(firstResult.vote_average);
  $(".searched-display").find("#box-office").text(firstResult.release_date);
  console.log("hello world", firstResult);
  getCredits(firstResult.media_type, firstResult.id);
  $(".searched-display")
    .find(".stats-card")
    .find(".media-name")
    .text(firstResult.original_name);

  if (firstResult.original_name == ".media-name") {
    $(".searched-display")
      .find(".stats-card")
      .find(".media-name")
      .text(firstResult.original_name);
  } else {
    $(".searched-display")
      .find(".stats-card")
      .find(".media-name")
      .text(firstResult.original_title);
  }
}

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
      for (let i = 0; i < data.results.length; i++) {
        var topMovieList = data.results[i].title;
        var topMovieListInput = $("#top-movie-list");
        var movielistEl = $("<li>");
        var movielistLink = $("<a>");
        movielistLink.text(topMovieList);
        movielistEl.append(movielistLink);
        movielistLink.addClass("listlink");
        movielistLink.attr("id", "ml" + [i]);
        // movielistEl.text(topMovieList);

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
      //console.log(data);
      //console.log(data.results[0].name);
      for (let i = 0; i < data.results.length; i++) {
        var toptvList = data.results[i].name;
        //console.log(toptvList);
        var toptvListInput = $("#top-tv-list");
        var tvlistEl = $("<li>");
        var showlistlink = $("<a>");
        showlistlink.text(toptvList);
        tvlistEl.append(showlistlink);
        showlistlink.addClass("topshowlink");
        showlistlink.attr("id", "tsl" + [i]);
        // tvlistEl.text(toptvList);
        toptvListInput.append(tvlistEl);
      }
    });
}
topshows();
//-----------------displays recent movies---------------------------
function theatermovies() {
  var theatermovies =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=" +
    APIKeyTMDB +
    "&language=en-US";
  fetch(theatermovies)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      // console.log(data.results[0].title)
      for (let i = 0; i < 8; i++) {
        var playingmovies = data.results[i].title;
        // console.log(playingmovies);
        var playingnow = $("#in-theaters");
        var intheatersEl = $("<li>");
        var theaterlistlink = $("<a>");
        theaterlistlink.text(playingmovies);
        intheatersEl.append(theaterlistlink);
        theaterlistlink.addClass("theaterlink");
        theaterlistlink.attr("id", "tl" + [i]);
        // intheatersEl.text(playingmovies);
        playingnow.append(intheatersEl);
      }
    });
}
theatermovies();

var theaterBtn = document.getElementsByClassName("theaterlink");
console.log(theaterBtn);
var button2 = $("theaterlink");
console.log(button2);

//-----------------TV List---------------------------
function playingshows() {
  var showsplaying =
    "https://api.themoviedb.org/3/tv/popular?api_key=" +
    APIKeyTMDB +
    "&language=en-US&page=1";
  fetch(showsplaying)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data)
      // console.log(data.results[0].name)
      for (let i = 0; i < 8; i++) {
        var playingshows = data.results[i].name;
        // console.log(playingshows);
        var tvplayingnow = $("#in-tv");
        var tvplayingEl = $("<li>");
        var showlistlink = $("<a>");
        showlistlink.text(playingshows);
        tvplayingEl.append(showlistlink);
        showlistlink.addClass("showlink");
        showlistlink.attr("id", "tvl" + [i]);
        tvplayingnow.append(tvplayingEl);
      }
    });
}
playingshows();

//------------------trending movie images --------------------------------------
function trendingposter() {
  var trendingmov =
    "https://api.themoviedb.org/3/trending/movie/day?api_key=" + APIKeyTMDB; //all includes people, movie and tv

  fetch(trendingmov)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
trendingposter();
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

//-------------API to populate the carousel -----------------------------
function displayTopFive() {
  var requesttop = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKeyTMDB}&language=en-US&page=1`;
  fetch(requesttop)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
      var carouselList = $(".carousel-img");
      for (let i = 0; i < 5; i++) {
        var movieId = data.results[i].id;
        var movieTitle = data.results[i].title;
        var posterPath =
          "https://www.themoviedb.org/t/p/w500" + data.results[i].poster_path;
        var currentImg = $(carouselList[i]);
        currentImg.attr("src", posterPath);
        currentImg.attr("mediaType", "movie"); // we hardcode to movie because this top 5 from now playing only supports movies
        currentImg.attr("mediaTypeId", movieId);
      }
    });
}
displayTopFive();

//--------------------click events to carousel-----------------------------------------
$(".carousel-img").each((i, currentImg) => {
  $(currentImg).click(() => {
    displayDetailsInModal(
      $(currentImg).attr("mediaType"),
      $(currentImg).attr("mediaTypeId")
    );
  });
});
