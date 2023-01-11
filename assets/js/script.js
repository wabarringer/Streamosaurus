var APIKeyTMDB = "e4fdcb0708125c02d9d3bb1ad5536644";
// var APIKeyShowtimes =

function getAPI() {
  var requestURL = "https://api.themoviedb.org/3/movie/76341?api_key="+APIKeyTMDB;

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
getAPI()