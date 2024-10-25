const SWAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=151'

window.onload = async function () {
    const pokemons = await getAllPokemons();
    const pokemonList = document.getElementById('pokemon-list');
    pokemonList.innerHTML = '';
    for (const pokemon of pokemons) {
        const listItem = document.createElement('li');
        listItem.innerText = pokemon.name;
        listItem.addEventListener('click', async function() {
            const pokemonDetails = await getPokemonDetails(pokemon.url);
            displayPokemonDetails(pokemonDetails);
        });
        pokemonList.appendChild(listItem);
    }
};

async function getAllPokemons() {
    const response = await fetch(`${SWAPI_BASE_URL}`);
    const jsonResponse = await response.json();
    const pokemonsArray = jsonResponse.results;
    return pokemonsArray;
}

async function getPokemonDetails(url) {
    const response = await fetch(url);
    const pokemonDetails = await response.json();
    return pokemonDetails;
}

function displayPokemonDetails(pokemonDetails) {
    const pokemonContainer = document.getElementById('pokemon-container');
    pokemonContainer.innerHTML = `
    <h2>${pokemonDetails.name}</h2>
    <p>ID: ${pokemonDetails.id}</p>
    src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
    <p>Tipos: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
    `
    ;
}