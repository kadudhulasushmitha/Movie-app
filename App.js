const API_KEY = 'api_key=8e2bce48b119d114c3402030398c8d7f';
const BASE_URL = 'https://api.themoviedb.org/4';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const   IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


getMovies(API_URL);

function getMovies(url){
    
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMovies(data);
    });
}


function showMovies(data) {
    main.innerHTML = '';

    data.forEach((movie) => {
        const{title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createdElement('div');
        movieEl.classList.add('movie');
        movie.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">

        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">

            <h3>overview</h3>
            ${overview}
            
        </div>
        `

        main.appendChild(movieEl);
    });
};

function getColor(vote){
    if (vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return "red"
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.Value;

    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_KEY);
    }

})