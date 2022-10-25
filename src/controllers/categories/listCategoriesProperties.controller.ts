import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import ListCategoriesPropertiesService from "../../services/categories/listCategoriesProperties.service";

const ListCategoriesPropertiesController = async ( request: Request, response: Response) => {
  try {
    const id = request.params.id;
    
    const propertyList = await ListCategoriesPropertiesService(id);

    return response.status(200).send(propertyList);

  } catch (error) {

    if ( error instanceof AppError ) {
      handleError( error, response )
    }
  }
};

export default ListCategoriesPropertiesController;
