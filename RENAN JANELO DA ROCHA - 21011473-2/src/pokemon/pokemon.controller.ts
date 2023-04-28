import { Request, Response} from "express";
import { PokemonService } from "./pokemon.service";

class pokemonController{
    async insertPokemons(req: Request, res: Response) {
        
        const pokemonsList = await new PokemonService().insertAllPokemonData()
        return res.status(201).json(pokemonsList)
    }

    async pokemonTypes(req: Request, res: Response) {
        
        const typeList = await new PokemonService().pokemonTypes()
        return res.status(200).json(typeList)
    }

    async getByName(req: Request, res: Response) {
        
        const pokemon = await new PokemonService().getByName(req.params.id)
        return res.status(200).json(pokemon)
    }

    async getByDex(req: Request, res: Response) {
        
        const pokemon = await new PokemonService().getByDex(req.params.id)
        return res.status(200).json(pokemon)
    }
    async getByType(req: Request, res: Response) {
        
        const pokemon = await new PokemonService().getByType(req.params.id)
        return res.status(200).json(pokemon)
    }
}

export default new pokemonController()