import { Request, Response, NextFunction } from "express";

const isAdmMiddleware = async ( request: Request, response: Response, next: NextFunction ) => {

  if ( request.user.isAdm === false ) {
    
      return response.status( 403 ).json({
        message: "Somente para Adm !"
    })
  }
  return next();
};

export default isAdmMiddleware;