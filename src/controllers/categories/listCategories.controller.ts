import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import ListCategoriesService from "../../services/categories/listCategories.service";

const ListCategoriesController = async (request: Request, response: Response) => {
  try {
    const categoryList = await ListCategoriesService();

    return response.status(200).send( categoryList );

  } catch (error) {

    if ( error instanceof AppError ) {
      handleError( error, response )
    }
  }
};

export default ListCategoriesController;
