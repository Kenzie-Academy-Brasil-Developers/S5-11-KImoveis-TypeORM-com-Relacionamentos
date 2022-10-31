import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const errorHandlingMiddleware = async ( error: Error ,request: Request, response: Response, next: NextFunction ) => {

    if ( error instanceof AppError ){
        return response.status(error.statusCode).json({
            message: error.message
        })
    }

    return response.status(500).json({
        message: " Erro interno do server!"
    })
};

export default errorHandlingMiddleware;