import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const ensureAuthMiddleware = async ( request: Request, response: Response, next: NextFunction ) => {

  let token = request.headers.authorization;

  if ( !token ) {
    return response.status(401).json({
      message: "Token inválido *ENSUREAUTHMIDDLEWARE*!",
    });
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY as string, ( error, decoded: any ) => {

    if ( error ) {
 
      return response.status(401).json({
        message: "Token inválido jwt!",
      });
    }

    request.user = {
      email: decoded.email,
      isAdm: decoded.isAdm,
      id: decoded.id
    }

    return next();
  });
};

export default ensureAuthMiddleware;