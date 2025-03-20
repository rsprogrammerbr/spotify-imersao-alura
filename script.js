const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
   const url = `http://localhost:3000/artists?name_like=^${searchTerm}`;
   fetch(url)
      .then((response) => response.json())
      .then((result) => {
         // Filtra os resultados para começar exatamente com o termo de busca
         const filteredResults = result.filter((artist) =>
            artist.name.toLowerCase().startsWith(searchTerm.toLowerCase())
         );
         displayResults(filteredResults);
      });
}

function displayResults(result) {
   // Esconde a playlist
   resultPlaylist.classList.add('hidden');

   // Limpa resultados anteriores
   resultArtist.innerHTML = '';

   // Cria um novo container para os artistas
   const gridContainer = document.createElement('div');
   gridContainer.className = 'grid-container';

   // Verifica se há resultados
   if (result.length === 0) {
      const noResults = document.createElement('p');
      noResults.textContent = 'Nenhum artista encontrado.';
      resultArtist.appendChild(noResults);
   } else {
      // Cria um card para cada artista
      result.forEach((artist) => {
         const artistCard = document.createElement('div');
         artistCard.className = 'artist-card';

         artistCard.innerHTML = `
            <div class="card-img">
               <img src="${artist.urlImg}" alt="${artist.name}" class="artist-img" />
               <div class="play">
                  <span class="fa fa-solid fa-play"></span>
               </div>
            </div>
            <div class="card-text">
               <a title="${artist.name}" class="vst" href=""></a>
               <span class="artist-name">${artist.name}</span>
               <span class="artist-categorie">Artista</span>
            </div>
         `;

         gridContainer.appendChild(artistCard);
      });

      resultArtist.appendChild(gridContainer);
   }

   // Remove a classe hidden para mostrar os resultados
   resultArtist.classList.remove('hidden');
}

searchInput.addEventListener('input', function () {
   const searchTerm = searchInput.value.trim();

   if (searchTerm === '') {
      resultPlaylist.classList.remove('hidden');
      resultArtist.classList.add('hidden');
      return;
   }

   requestApi(searchTerm);
});
