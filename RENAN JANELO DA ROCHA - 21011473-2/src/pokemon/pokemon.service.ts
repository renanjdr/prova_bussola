import { writeFile, readFile} from 'fs/promises'
import pokemonModel from "./pokemon.schema";

export class PokemonService{
    constructor() {
        this.getPokeUrls()
    }
    
    async getPokeUrls() {
        let pokeApiResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        
        pokeApiResponse.json().then((result) => {
            writeFile('pokemonUrl.json', JSON.stringify(result.results,null, 2));
          });
        
    }
    async insertAllPokemonData() {
        const allPokemonUrl = await readFile("pokemonUrl.json", "utf-8");
        const allPokemonUrlList = await JSON.parse(allPokemonUrl)

        const pokeList = allPokemonUrlList.map(async (pokeLink) => {
          let url = pokeLink.url.toString();
    
          // const result = await fetch(url).then(response => response.json())
          const response = await fetch(url);
          const result = await response.json();
    
          const pokeStats = result.stats.map((pokeStat) => {
            return {
              statName: pokeStat.stat.name,
              value: pokeStat.base_stat,
            };
          });
    
          const pokeMoves = result.moves.map((pokeMove) => {
            return pokeMove.move.name
          });

          const randomMoves: any = []
          while(randomMoves.length < 4 && randomMoves.length < pokeMoves.length) {
            let pos =  Math.floor(Math.random() * pokeMoves.length)
            if(! randomMoves.includes(pokeMoves[pos])){
                randomMoves.push(pokeMoves[pos])
            }
          }
    
          const PokeData = {
            name: result.forms[0].name,
            type: result.types[0].type.name,
            dex: result.game_indices[9].game_index,
            height: result.height,
            weight: result.weight,
            stats: pokeStats,
            moves: randomMoves,
          };
    
          return PokeData;
        });
    
        const pokeArr = await Promise.all(pokeList);
        pokeArr.sort((a, b) => {
          return a.dex - b.dex;
        });
        


        writeFile("pokedex.json", JSON.stringify(pokeArr, null, 2))
        const many = pokemonModel.insertMany(pokeArr)
        return many

    }
    async pokemonTypes(){
        const pokemons = await (JSON.parse(await readFile('pokedex.json', 'utf-8')))

        const pokemonsPorTipo = pokemons.reduce((pokemonsPorTipo, pokemonAtual) => {

            pokemonsPorTipo[pokemonAtual.type] = pokemonsPorTipo[pokemonAtual.type] || []
            pokemonsPorTipo[pokemonAtual.type].push(pokemonAtual)
            return pokemonsPorTipo

        }, {})
        writeFile('pokemonsPorTipo.json',JSON.stringify(pokemonsPorTipo, null, 2))
        return pokemonsPorTipo

    } 
    async getByName(nome){
      const poke = await pokemonModel.find({ name: nome})
      return poke
    }   
    async getByDex(id){
      const poke = await pokemonModel.findOne({ dex: id})
      return poke
    }
    async getByType(tipo){
      const poke = await pokemonModel.find({ type: tipo})
      return poke
    }
}