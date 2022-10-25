import { User } from "../../entities/user.entities"
import { hashSync } from "bcrypt";
import AppDataSource from "../../data-source";
import { IUserRequest } from "../../interfaces/users";
import { AppError } from "../../errors/appError";

const createUsersServices = async ({name, email, password, isAdm }: IUserRequest) => {

  if ( !password ){
    throw new AppError(409, "Erro de Password SERVICES!")
  }

 const userRepository = AppDataSource.getRepository(User);

 const users = await userRepository.find();

 const emailAlreadyExists = users.find(user => user.email === email )

 if ( emailAlreadyExists ){
  throw new AppError(409, "Email já existente!")
 }

 const newUser = new User()
  newUser.name = name;
  newUser.email = email;
  newUser.password = hashSync(password, 10);
  newUser.isAdm = isAdm;
  newUser.createdAt = new Date(Date.now());
  newUser.updatedAt = new Date(Date.now());

  userRepository.create(newUser)
  
  await userRepository.save(newUser)
 
  return newUser
};

export default createUsersServices;
