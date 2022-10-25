import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import CreateCategoryService from "../../services/categories/createCategory.service";

const CreateCategoryController = async ( request: Request, response: Response ) => {
  try {
    const { name } = request.body;

    if ( !request.user.isAdm ) {
      return response.status(403).send({ message: "Não tem permissão para criar novas categorias!" })
    }

    const newCategory = await CreateCategoryService({ name });

    return response.status(201).send(newCategory);

  } catch (error) {

    if ( error instanceof AppError ) {
      handleError( error, response )
    }
  }
};

export default CreateCategoryController;
