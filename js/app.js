//http://www.omdbapi.com/?apikey=69b4829f&
//s=fight
//page=1
//type=movie
//i=imdbID

const apiKey = '69b4829f';
const getMovies = (query) => {
  return fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)
  .then((response) => response.json())
  .then((movieData) => {
    movieData.Search.forEach((movie) => {
      fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
      .then(response => response.json())
      .then(movieDetail => console.log(movieDetail));
    });
  });
}

getMovies('fight')