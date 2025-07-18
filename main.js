// main.js
// Fetch and display featured and recent movies from TMDB

const TMDB_API_KEY = 'b1aadae1e89a82fc411ad893d089eee7'; // Replace with your TMDB API key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/w500';

document.addEventListener('DOMContentLoaded', () => {
    fetchMovies('popular', 'featured-movies');
    fetchMovies('now_playing', 'recent-movies');
});

function fetchMovies(type, containerId) {
    fetch(`${TMDB_BASE_URL}/movie/${type}?api_key=${TMDB_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            displayMovies(data.results, containerId);
        })
        .catch(() => {
            document.getElementById(containerId).innerHTML = '<p>Failed to load movies.</p>';
        });
}

function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    if (!movies || movies.length === 0) {
         '<p>No movies found.</p>';
        return;
    }
    container.innerHTML = movies.slice(0, 6).map(movie => `
        <div class="movie-card">
            <img src="${TMDB_IMG_URL + movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Rating: ${movie.vote_average}</p>
            <a href="movie.html?id=${movie.id}" class="details-btn">Details</a>
        </div>
    `).join('');
}
