import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entities";
import { Properties } from "../../entities/properties.entities";
import { AppError } from "../../errors/appError";

const ListCategoriesPropertiesService = async ( id: string ) => {

  const categoryRepository = AppDataSource.getRepository( Categories );

  const category = await categoryRepository.findOne({
  where: 
  {
    id: id
  },
  relations: 
  {
    properties: true
  }
  });

  if ( !category ) {
    throw new AppError( 404, "Categoria não encontrada!" )
  };

  return category;
};

export default ListCategoriesPropertiesService;
