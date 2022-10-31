import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entities"

const deleteUserService = async ( id: string ) => {
    
    const userRepository = AppDataSource.getRepository( User );

    const userToDelete = await userRepository.find();

    const account = userToDelete.find( targetUser => targetUser.id === id );

    account!.isActive = false;

    await userRepository.save(account!);

    return account;
}

export default deleteUserService