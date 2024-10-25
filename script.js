const SWAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokedex/2/'


window.onload = async function () {
    const pokemons = await getAllPokemons();
    const pokemonList = document.getElementById('pokemon-list');
    pokemonList.innerHTML = '';
    for (const pokemon of pokemons) {
        const listItem = document.createElement('li');
        const pokemon = pokemon.pokemon_species;
        listItem.innerText = pokemon.name;
        listItem.addEventListener('click', async function() {
            const pokemonDetails = await getPokemonDetails(pokemon.pokemon_species.url);
            displayPokemonDetails(pokemonDetails);
        });
        pokemonList.appendChild(listItem);

    }
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();;
        await searchPokemonByName(searchInput);
    });

};

async function getAllPokemons() {
    const response = await fetch(`${SWAPI_BASE_URL}`);
    const jsonResponse = await response.json();
    const pokemonsArray = jsonResponse.pokemon_entries.pokemon_species;
    return pokemonsArray;
}

async function getPokemonDetails(url) {
    const response = await fetch(url);
    const pokemonDetails = await response.json();
    return pokemonDetails;
}

function displayPokemonDetails(pokemonDetails) {
    const pokemonContainer = document.getElementById('pokemonContainer');
    pokemonContainer.innerHTML = `
        <h2>${pokemonDetails.name}</h2>
        <p>ID: ${pokemonDetails.id}</p>
        <img src="${pokemonDetails.sprites.other['official-artwork'].front_default}" alt="${pokemonDetails.name}">
        <p>Tipos: ${pokemonDetails.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
    `;
}

async function searchPokemonByName(name) {
    const searchInput = document.getElementById('searchInput');
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
            throw new Error('Pokemon no encontrado');
        }
            const pokemonDetails = await response.json();
            displayPokemonDetails(pokemonDetails);
    } catch (error) {
        alert("ERROR");
    }
}

