const pokemonDetails = document.getElementById("pokemonDetails");

// pegar id da URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// buscar pokemon
pokeApi.getPokemonById(id).then((pokemon) => {
    renderPokemonDetail(pokemon);
});


function renderPokemonDetail(pokemon) {
    pokemonDetails.innerHTML = `
        <div class="pokemon-detail ${pokemon.type}">
            
            <div class="header">
                <span class="number">#${pokemon.number}</span>
                <h2 class="name">${pokemon.name}</h2>

                <div class="types">
                    ${pokemon.types.map(type => `<span class="type ${type}">${type}</span>`).join("")}
                </div>

                <img class="pokemon-image" src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <div class="info">
                <h3>About</h3>

                <div class="info-item">
                    <span>Specie</span>
                    <span>${pokemon.pokedexDetail.specie}</span>
                </div>

                <div class="info-item">
                    <span>Height</span>
                    <span>${pokemon.pokedexDetail.height}</span>
                </div>

                <div class="info-item">
                    <span>Weight</span>
                    <span>${pokemon.pokedexDetail.weight}</span>
                </div>

                <div class="info-item">
                    <span>Abilities</span>
                    <span>${pokemon.pokedexDetail.abilities}</span>
                </div>
            </div>

        </div>
    `;
}