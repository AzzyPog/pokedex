

async function catchPokemons () {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=130000&offset=0")
    const jsonRes = await response.json()
    const results = jsonRes.results
} catchPokemons()