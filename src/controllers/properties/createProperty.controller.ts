import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import CreatePropertyService from "../../services/properties/createProperty.service";

const CreatePropertyController = async ( request: Request, response: Response ) => {
  try {

    if ( !request.user.isAdm ) {
      return response.status(403).send({ message: "Não tem permissão para registrar novos Users!" });
    }

    const { value, size, address, categoryId } = request.body;

    const newProperty = await CreatePropertyService({
      value,
      size,
      address,
      categoryId
    });

    return response.status(201).send(newProperty);

  } catch (error) {

    if ( error instanceof AppError ) {
      handleError(error, response)
    }
  }
};

export default CreatePropertyController;
