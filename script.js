const apiKey = 'Y2a75959a';
const searchButton = document.getElementById('search-btn');
const movieNameInput = document.getElementById('movie-name');
const resultContainer = document.getElementById('result');

async function getMovieInfo() {
    const movieName = movieNameInput.value;
    if (movieName.trim() === '') {
        alert('Please enter a movie name.');
        return;
    }

    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'True') {
            // Extract the top 5 actors from the comma-separated string
            const top5Actors = data.Actors.split(',').slice(0, 5).join(', ');

            const movieHTML = `
                <h2>${data.Title}</h2>
                <p><strong>Released:</strong> ${data.Released}</p>
                <p><strong>Genre:</strong> ${data.Genre}</p>
                <p><strong>Runtime:</strong> ${data.Runtime}</p>
                <p><strong>Plot:</strong> ${data.Plot}</p>
                <p><strong>Top 5 Actors:</strong> ${top5Actors}</p>
                <img src="${data.Poster}" alt="Movie Poster">
            `;
            resultContainer.innerHTML = movieHTML;
        } else {
            resultContainer.innerHTML = '<p>No movie found.</p>';
        }
    } catch (error) {
        console.error('Error fetching movie information:', error);
        resultContainer.innerHTML = '<p>Failed to fetch movie information.</p>';
    }
}

searchButton.addEventListener('click', getMovieInfo);