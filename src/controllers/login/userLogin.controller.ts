import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { IUserLogin } from "../../interfaces/users";
import UserLoginService from "../../services/login/userLogin.service";

const UserLoginController = async ( request: Request, response: Response ) => {
  try {
    const { email, password }: IUserLogin = request.body;

    const token = await UserLoginService({ email, password });

    return response.status(200).send({ token });
    
  } catch (error) {

    if ( error instanceof AppError ) {
      handleError( error, response )
    }
  }
};

export default UserLoginController;
