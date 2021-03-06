//http://www.omdbapi.com/?apikey=69b4829f&
//s=fight
//page=1
//type=movie
//i=imdbID

const html = {
  movies: document.getElementsByClassName('movie'),
  searchbarForm: document.getElementById('search'),
  searchbar: document.getElementById('searchbar'),
  moviesContainer: document.getElementsByClassName('titles-wrapper')[0]
}

const apiKey = '69b4829f';
let searchResults = [];
const getMovies = (query) => {
  searchResults = [];
  return fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)
  .then((response) => response.json())
  .then((movieData) => {
    movieData.Search.forEach((movie) => {
      fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
      .then(response => response.json())
      .then(movieDetail => searchResults.push(movieDetail))
    });
  })
  .then(setTimeout(() => {render()}, 1500));
}

render()

function render() {
  html.moviesContainer.innerHTML = "";
  for (let result of searchResults) {
    html.moviesContainer.insertAdjacentHTML('afterbegin', `
    <div class="movie">
      <img
        src="${result.Poster}"
      />
      <div class="overlay">
        <div class="title">${result.Title}</div>
        <div class="rating">${result.imdbRating}/10</div>
        <div class="plot">
         ${result.Plot}
        </div>
      </div>
    </div>
    `)
  }
}

function handleSubmit(e) {
  e.preventDefault();
  getMovies(html.searchbar.value);
}

html.searchbarForm.addEventListener('submit', handleSubmit)