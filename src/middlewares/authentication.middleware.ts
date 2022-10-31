import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";

const AuthenticationMiddleware = ( request: Request, response: Response, next: NextFunction ) => {

  try {
    const token = request.headers.authorization?.split(" ")[1];

    if ( !token ) {
      return response.status( 401 ).send({ message: " Token Faltando !" })
    };

    jwt.verify(token as string, process.env.SECRET_KEY as string, ( error: any, decoded: any ) => {

      request.user = {
        email: decoded.email,
        isAdm: decoded.isAdm,
        id: decoded.sub
      }
      next();
      }
    );

  } catch ( error ) {
    
    if ( error instanceof AppError ) {
      return response.status( 400 ).send({
        error: error.name,
        message: error.message
      })
    }
  }
};

export default AuthenticationMiddleware;