import { User } from "../../entities/user.entities"
import AppDataSource from "../../data-source"
import { IUserUpdate } from "../../interfaces/users/index"

const updateUserByIdService = async ({ name, email, password }: IUserUpdate, id: string ) => {

    const userRepository = AppDataSource.getRepository( User );

    const findUserToUpdated = await userRepository.findOneBy({
        id
    });

    if ( !findUserToUpdated ){
        return[ "Usuário não encontrado!", 404 ]
    }

    await userRepository.update(
        id,
        {
            name: name ? name : findUserToUpdated.name,
            email: email ? email : findUserToUpdated.email,
            password: password ? password : findUserToUpdated.password
        }
    )

    const user = await userRepository.findOneBy({
        id
    });

    return user;
}

export default updateUserByIdService;