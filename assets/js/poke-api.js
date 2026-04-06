
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemonById = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    return fetch(url)
        .then((response) => response.json())
        .then((pokeDetail) => {

            const pokemon = convertPokeApiDetailToPokemon(pokeDetail)

            // 👉 AQUI CRIA OS DETALHES
            const detalhes = new Detalhes()

            detalhes.specie = pokeDetail.species.name
            detalhes.height = pokeDetail.height /10 + " m"
            detalhes.weight = pokeDetail.weight /10 + " kg"
            detalhes.abilities = pokeDetail.abilities
                .map(a => a.ability.name)
                .join(", ")

            // 👉 ASSOCIA NO POKEMON
            pokemon.pokedexDetail = detalhes

            return pokemon
        })
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}


