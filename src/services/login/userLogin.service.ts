import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entities";
import { IUserLogin } from "../../interfaces/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";

const UserLogin = async ({ email, password }: IUserLogin ) => {

  const userRepository = AppDataSource.getRepository( User );

  const users = await userRepository.find();

  const account = users.find(( user ) => user.email === email );

  if ( !account ) {
    throw new AppError( 403, "Email ou Password invalido!" )
  }

  if ( !bcrypt.compareSync( password, account.password! )) {
    throw new AppError( 403, "Email ou Password errados!" )
  }

  const token = jwt.sign({ email: email, isAdm: account.isAdm }, String( process.env.SECRET_KEY ), { 
    expiresIn: "24h"
    });

  return token;
};

export default UserLogin;
