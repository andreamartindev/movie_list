import { API_URL } from "./url.js"
const IMG_PATH ='https://image.tmdb.org/t/p/w500'
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=4542e389a71e52ad19c45fcccd57f24c&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')



const options = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NTQyZTM4OWE3MWU1MmFkMTljNDVmY2NjZDU3ZjI0YyIsInN1YiI6IjYzN2I1YmQ1ZmFiM2ZhMDA3ZmJmYjkyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MF1wOnD0UHK29p_KHUFsfD7K2LhV4jctO-qkQBNRaxE'
    }
  };

getMovies(API_URL)
  
//   fetch(API_URL, options)
//     .then(response => response.json())
//     .then(response => console.log(response.results[0].title))
//     .catch(err => console.error(err));

async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies){
    main.innerHTML = ''

    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview} = movie

        const movieCont = document.createElement('div')
        movieCont.classList.add('movie')
        movieCont.innerHTML = `
        
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${voteClass(vote_average)}">${vote_average.toFixed(1)}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <p>${overview}</p>
            </div>
        `
        
        main.appendChild(movieCont)
    })
}

function voteClass(vote){
    if(vote >= 8){
        return 'green'
    } else if ( vote >= 5){
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', e =>{
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_URL + searchTerm)
        search.value = ''
    } else{
        window.location.reload()
    }

    
})