const pokecardHolder = document.querySelector("main div:first-of-type");
const randomBtn = document.querySelector("#btn");
let loadingDefaultPokemons = true; // Variável de controle para indicar se o carregamento padrão está ativo

document.querySelector("header h1").addEventListener('click', () => {
    location.reload()
})

//botão de randomizar os pokemons
randomBtn.addEventListener('click', () => {
    pokecardHolder.innerHTML = ""

    const randomValue = document.querySelector('#randomInput').value;

    if (loadingDefaultPokemons) {
        loadingDefaultPokemons = false; // Interrompe o carregamento padrão
    }

    randomPokemon(parseInt(randomValue))
});

async function catchPokemons(quantity) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${quantity}&offset=0`);
    const jsonRes = await response.json();
    const allPokemons = jsonRes.results;

    //verificando cada pokemon dentro do array de pokemons
    for (let pokemon of allPokemons) {

        if (loadingDefaultPokemons) {
            //criando o card
            const pokemonRes = await fetch(pokemon.url);
            const pokemonUnit = await pokemonRes.json();

            const pokecard = document.createElement('div');
            const h2 = document.createElement('h2');
            const img = document.createElement('img');
            pokecard.classList.add('pokecard');
            pokecard.appendChild(h2);
            pokecard.appendChild(img);
            pokecardHolder.appendChild(pokecard);
            h2.textContent = pokemon.name;
            img.src = pokemonUnit.sprites.front_default;
        }


        if (pokecardHolder.childElementCount === quantity) {
            break;
        }
    }
} 

async function randomPokemon(quantity) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1281&offset=0`);
    const jsonRes = await response.json();
    const allPokemons = jsonRes.results;
    
    //randomizando os pokemons pedidos
    const sortedPokemons = allPokemons.sort(() => Math.random() - 0.5).slice(0, quantity);

    for (let pokemon of sortedPokemons) {
        //criando o card
        const pokemonRes = await fetch(pokemon.url);
        const pokemonUnit = await pokemonRes.json();

        const pokecard = document.createElement('div');
        const h2 = document.createElement('h2');
        const img = document.createElement('img');
        pokecard.classList.add('pokecard');
        pokecard.appendChild(h2);
        pokecard.appendChild(img);
        pokecardHolder.appendChild(pokecard);
        h2.textContent = pokemon.name;
        img.src = pokemonUnit.sprites.front_default;

        if (pokecardHolder.childElementCount === quantity) {
            break;
        }
    }
}

catchPokemons(1280);
