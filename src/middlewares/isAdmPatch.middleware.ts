import { Request, Response, NextFunction } from "express";

const isAdmPatchMiddleware = async ( request: Request, response: Response, next: NextFunction ) => {

  if ( request.user.isAdm === false ) {

      return response.status( 401 ).json({
        message: "Somente para Adm !"
    })
  }
  return next();
};

export default isAdmPatchMiddleware;