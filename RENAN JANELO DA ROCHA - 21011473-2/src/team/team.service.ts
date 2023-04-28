import { PokemonService } from "../pokemon/pokemon.service"
import teamModel from "./team.schema"

export class TeamService{
    async createTeam(team){
        let time = {
            "trainerName" : team.name,
            "team" : team.pokemons.map(async (pokemon) => {
                const dados = await new PokemonService().getByName(pokemon)
                return dados
            })
        }
        let createdTeam = teamModel.create(time)
        return createdTeam
    }

    async list() {
        const teamList = await teamModel.find()

        return teamList
    }

    async find(name) {
        const foundTeam = await teamModel.find({ trainerName: name })

        return foundTeam
    }

    async update(id, teamUpdate) {
        const updatedTeam = await teamModel.findByIdAndUpdate(id, teamUpdate)

        return updatedTeam
    }

    async delete(name) {
        const deletedTeam = await teamModel.deleteOne({ trainerName: name})
                                    
        return deletedTeam
    }
}