import { Request, Response, NextFunction } from "express";

const verifyUpdateForbiddenFieldsMiddleware = ( request: Request, response: Response, next: NextFunction ) => {

  if ( request.body.hasOwnProperty( "isAdm" ) || request.body.hasOwnProperty( "isActive" ) || request.body.hasOwnProperty( "id" )) {
      return response.status( 401 ).json({
        message: "Não é possivel atualizar o campo IsADM!"
    })
  }
  
  return next();
};

export default verifyUpdateForbiddenFieldsMiddleware;