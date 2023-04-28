import { Request, Response} from "express";
import { TeamService} from "./team.service";


class teamController{
    async createTeam(req: Request, res: Response){
        const team = await new TeamService().createTeam(req.body)
        return res.status(201).json(team)
    }

    async list(req: Request, res: Response) {
        const teamList = await new TeamService().list()
    
        return res.status(200).json(teamList)
    }

    async findByName(req: Request, res: Response) {
        const team = await new TeamService().find(req.params.name)
    
        return res.status(200).json(team)
    }

    async update(req: Request, res: Response) {
        const updatedTeam = await new TeamService().update(req.params.id, req.body)
    
        return res.status(200).json(updatedTeam)
    }

    async delete(req: Request, res: Response) {
        const deletedTeam = await new TeamService().delete(req.params.name)

        return res.status(200).json(deletedTeam)
    }
}

export default new teamController()