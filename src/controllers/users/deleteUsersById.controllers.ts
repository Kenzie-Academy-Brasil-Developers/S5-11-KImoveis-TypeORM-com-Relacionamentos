import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUsersById.service";

const deleteUserController = async (request: Request, response: Response) => {
    try {
        const id: string = request.params.id;

        const user =  await deleteUserService(id);
        
        return response.status(204).json({message: "Usuário Deletado!"});

    } catch (error) {

        if (error instanceof Error) {

            return response.status(403).send({
                "error": error.name,
                "message": error.message
            })
        }
    }
}

export default deleteUserController;