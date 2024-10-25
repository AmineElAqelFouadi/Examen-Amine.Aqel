const SWAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon'

window.onload = async function () {
    const pokemns = await getAllPokemons();
    const pokemonList = document.getElementById('pokemon-list');
    for (const pokemon of pokemns) {
        const listItem = document.createElement('li');
        listItem.innerText = pokemon.name;
        pokemonList.appendChild(listItem);
    }
    
};

async function getAllPokemons() {
    const response = await fetch(`${SWAPI_BASE_URL}/?limit=151`);  
    const jRsponse = await response.json();
    const pokemonsArray = jRsponse.results.name;
    return pokemonsArray;
}