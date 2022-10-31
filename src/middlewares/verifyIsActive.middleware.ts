import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entities";

const verifyIsActiveMiddleware = async ( request: Request, response: Response, next: NextFunction ) => {

  const id = request.params.id;

  const userRepository = AppDataSource.getRepository( User );

  const user = await userRepository.findOne({
    where: { id }
  });

  if ( !user ){
    
    return response.status( 404 ).json({
        message: "Usuário não encontrado!"
    })
  }


  if ( user!.isActive === false ) {

      return response.status( 400 ).json({
        message: "Usuário inativo!"
    })
  }
  return next();
};

export default verifyIsActiveMiddleware;