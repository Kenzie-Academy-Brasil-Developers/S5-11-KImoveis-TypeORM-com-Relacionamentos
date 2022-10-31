import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/users";
import createUsersServices from "../../services/users/createUsers.service";


const createUsersController = async ( request: Request, response: Response ) => {
    
    try {
        const user: IUserRequest = request.body

        const newUser = await createUsersServices( user );
        
        return response.status(201).send(instanceToPlain( newUser ));

    } catch ( erro ) {

        if ( erro instanceof Error ) {

            return response.status(400).send({
                "error": erro.name,
                "message": erro.message
            })
        }
    }
};

export default createUsersController;