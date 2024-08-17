document.getElementById('searchBar').addEventListener('input', function(e) {
    const query = e.target.value;
    if (query.length > 2) {
        searchGames(query);
    } else {
        loadInitialGames();
    }
});

document.getElementById('homeButton').addEventListener('click', function() {
    document.getElementById('searchBar').value = '';
    loadInitialGames();
});

let myGames = [];

function loadInitialGames() {
    fetch(`https://api.rawg.io/api/games?key=c7b9ce3b8e8140cbb74299d1acfa5f41&page_size=12`)
        .then(response => response.json())
        .then(data => {
            displayGames(data.results);
        });
}

function searchGames(query) {
    fetch(`https://api.rawg.io/api/games?key=c7b9ce3b8e8140cbb74299d1acfa5f41&search=${query}`)
        .then(response => response.json())
        .then(data => {
            displayGames(data.results);
        });
}

function displayGames(games) {
    const gameList = document.getElementById('gameList');
    gameList.innerHTML = '';

    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        const gameImage = document.createElement('img');
        gameImage.src = game.background_image;
        gameCard.appendChild(gameImage);

        const gameTitle = document.createElement('h3');
        gameTitle.textContent = game.name;
        gameCard.appendChild(gameTitle);

        const gameDetails = document.createElement('p');
        gameDetails.textContent = `Rating: ${game.rating} | Released: ${game.released}`;
        gameCard.appendChild(gameDetails);

        const addButton = document.createElement('button');
        addButton.classList.add('add-button');
        addButton.textContent = 'Add to My Games';
        addButton.addEventListener('click', () => addToMyGames(game));
        gameCard.appendChild(addButton);

        gameList.appendChild(gameCard);
    });
}

function addToMyGames(game) {
    if (!myGames.some(g => g.id === game.id)) {
        const newGame = {
            ...game,
            hoursPlayed: 0,
            rating: 0
        };
        myGames.push(newGame);
        updateMyGamesList();

        const confirmation = document.createElement('div');
        confirmation.classList.add('confirmation');
        confirmation.textContent = `${game.name} has been added to My Games!`;
        document.body.appendChild(confirmation);

        setTimeout(() => {
            confirmation.remove();
            suggestSimilarGames(game.id);
        }, 2000);
    }
}

function removeFromMyGames(gameId) {
    myGames = myGames.filter(g => g.id !== gameId);
    updateMyGamesList();
}

function updateMyGamesList() {
    const myGamesList = document.getElementById('myGamesList');
    myGamesList.innerHTML = '';

    myGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        const gameImage = document.createElement('img');
        gameImage.src = game.background_image;
        gameCard.appendChild(gameImage);

        const gameTitle = document.createElement('h3');
        gameTitle.textContent = game.name;
        gameCard.appendChild(gameTitle);

        const gameDetails = document.createElement('p');
        gameDetails.textContent = `Rating: ${game.rating} | Released: ${game.released}`;
        gameCard.appendChild(gameDetails);

        const gameInput = document.createElement('div');
        gameInput.classList.add('game-input');

        const hoursInput = document.createElement('input');
        hoursInput.type = 'number';
        hoursInput.placeholder = 'Hours played';
        hoursInput.value = game.hoursPlayed;
        hoursInput.addEventListener('change', (e) => {
            game.hoursPlayed = e.target.value;
        });

        const ratingInput = document.createElement('input');
        ratingInput.type = 'number';
        ratingInput.placeholder = 'Your rating';
        ratingInput.max = 10;
        ratingInput.min = 0;
        ratingInput.value = game.rating;
        ratingInput.addEventListener('change', (e) => {
            game.rating = e.target.value;
        });

        gameInput.appendChild(hoursInput);
        gameInput.appendChild(ratingInput);
        gameCard.appendChild(gameInput);

        const removeButton = document.createElement('button');
        removeButton.classList.add('add-button');
        removeButton.textContent = 'Remove from My Games';
        removeButton.addEventListener('click', () => removeFromMyGames(game.id));
        gameCard.appendChild(removeButton);

        myGamesList.appendChild(gameCard);
    });
}

function suggestSimilarGames(gameId) {
    fetch(`https://api.rawg.io/api/games/${gameId}/suggested?key=c7b9ce3b8e8140cbb74299d1acfa5f41&page_size=3`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                displaySuggestedGames(data.results);
            }
        });
}

function displaySuggestedGames(games) {
    const suggestedGamesList = document.getElementById('suggestedGamesList');
    suggestedGamesList.innerHTML = ''; 

    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        const gameImage = document.createElement('img');
        gameImage.src = game.background_image;
        gameCard.appendChild(gameImage);

        const gameTitle = document.createElement('h3');
        gameTitle.textContent = game.name;
        gameCard.appendChild(gameTitle);

        const gameDetails = document.createElement('p');
        gameDetails.textContent = `Rating: ${game.rating} | Released: ${game.released}`;
        gameCard.appendChild(gameDetails);

        const addButton = document.createElement('button');
        addButton.classList.add('add-button');
        addButton.textContent = 'Add to My Games';
        addButton.addEventListener('click', () => addToMyGames(game));
        gameCard.appendChild(addButton);

        suggestedGamesList.appendChild(gameCard);
    });
    function displayGames(games) {
        const gameList = document.getElementById('gameList');
        gameList.innerHTML = '';
    
        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.classList.add('game-card');
    
            const gameImage = document.createElement('img');
            gameImage.src = game.background_image;
            gameCard.appendChild(gameImage);
    
            const gameTitle = document.createElement('h3');
            gameTitle.textContent = game.name;
            gameCard.appendChild(gameTitle);
    
            const gameDetails = document.createElement('p');
            gameDetails.textContent = `Rating: ${game.rating} | Released: ${game.released}`;
            gameCard.appendChild(gameDetails);
    
            const lightboxButton = document.createElement('button');
            lightboxButton.classList.add('add-button');
            lightboxButton.textContent = 'View Details';
            lightboxButton.addEventListener('click', () => openLightbox(game));
            gameCard.appendChild(lightboxButton);
    
            gameList.appendChild(gameCard);
        });
    }
    
    function openLightbox(game) {
        const lightbox = document.getElementById('lightbox');
        document.getElementById('lightboxTitle').textContent = game.name;
        document.getElementById('lightboxDescription').textContent = `Description: ${game.description_raw || 'No description available.'}`;
        document.getElementById('lightboxGenre').textContent = `Genre: ${game.genres.map(genre => genre.name).join(', ')}`;
        document.getElementById('lightboxReleased').textContent = `Released: ${game.released}`;
    
        lightbox.style.display = 'flex';
    
        const closeBtn = lightbox.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    
        window.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
    
}

window.onload = loadInitialGames;
