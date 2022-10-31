import { User } from "../../entities/user.entities";
import AppDataSource from "../../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserLogin } from "../../interfaces/users";
import { AppError } from "../../errors/appError";

const userLoginService = async ({ email, password } : IUserLogin ) => {

  const userRepository = AppDataSource.getRepository( User );

  const user = await userRepository.findOneBy({
    email: email
  });

  if ( !user ) {
    throw new AppError( 403, "User não encontrado!" );
  }

  if ( !bcrypt.compareSync( password, user.password! )) {
    throw new AppError( 403, "Senha invalida!" )
  }

  if ( user.email !== email ) {
    throw new AppError( 403, "Email invalido!" )
  }
  
  const token = jwt.sign(
    {
      isAdm: user.isAdm,
      email: email,
      id: user.id
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "24h"
    }
  );

  return token;
};

export default userLoginService;
