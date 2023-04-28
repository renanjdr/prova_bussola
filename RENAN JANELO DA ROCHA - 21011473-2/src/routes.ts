import { Router } from "express";
import pokemonController from "./pokemon/pokemon.controller";
import teamController from "./team/team.controller";

const routes = Router()
// 1
routes.post('/pokemons', pokemonController.insertPokemons)
// 2
routes.get('/pokemons/types',pokemonController.pokemonTypes)

//3
routes.post("/teams",teamController.createTeam)
routes.get("/teams",teamController.list)
routes.get("/teams/:name",teamController.findByName) 
routes.put("/teams/:id",teamController.update) 
routes.delete("/teams/:name",teamController.delete) 

//4
routes.get('/pokemons/types/:id', pokemonController.getByType)
//5
routes.get('/pokemons/dex/:id', pokemonController.getByDex)
//6
routes.get('/pokemons/name/:id', pokemonController.getByName)
export default routes