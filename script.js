// script.js

// Inicjalizacja zmiennych
let songs = [];
let votes = {}; // Obiekt przechowujący liczbę głosów na poszczególne piosenki

// Funkcja do wyświetlania listy zgłoszonych piosenek
function displaySongs() {
    const songList = document.getElementById('songs');
    songList.innerHTML = '';

    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${song} 
            <button class="vote-btn" onclick="voteSong(${index})">Głosuj</button> 
            <span class="vote-count">Głosów: ${votes[song] || 0}</span>`;
        songList.appendChild(li);
    });
}

// Funkcja obsługująca zgłaszanie tytułów
document.getElementById('submitSongForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const songTitle = document.getElementById('songTitle').value.trim();
    if (songTitle && !songs.includes(songTitle)) {
        songs.push(songTitle);
        votes[songTitle] = 0; // Dodanie nowej piosenki do głosowania
        displaySongs();
    }
    document.getElementById('songTitle').value = ''; // Resetowanie pola
});

// Funkcja do głosowania na piosenkę
function voteSong(index) {
    const song = songs[index];

    // Sprawdzamy, czy użytkownik już zagłosował
    if (localStorage.getItem('hasVoted')) {
        document.getElementById('errorMessage').textContent = 'Już oddałeś swój głos!';
        return;
    }

    // Jeśli użytkownik nie głosował, zapisujemy głos
    votes[song]++;
    
    // Zapisujemy, że użytkownik już zagłosował (może głosować tylko raz)
    localStorage.setItem('hasVoted', 'true');
    
    // Aktualizujemy wyświetlanie wyników głosowania
    displaySongs();

    // Ukrywamy komunikat o błędzie (jeśli był)
    document.getElementById('errorMessage').textContent = '';
}

// Sprawdzamy, czy użytkownik już głosował przy ładowaniu strony
if (localStorage.getItem('hasVoted')) {
    document.getElementById('errorMessage').textContent = 'Już oddałeś swój głos!';
}
