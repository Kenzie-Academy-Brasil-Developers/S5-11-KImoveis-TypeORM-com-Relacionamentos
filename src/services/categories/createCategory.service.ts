import AppDataSource from "../../data-source";
import { ICategoryRequest } from "../../interfaces/categories";
import { Categories } from "../../entities/categories.entities";
import { AppError } from "../../errors/appError";

const CreateCategoryService = async ({ name }: ICategoryRequest) => {

  const categoryRepository = AppDataSource.getRepository( Categories );

  const categories = await categoryRepository.find();

  const findTargetCategory = categories.find(( category ) => category.name === name );

  if ( findTargetCategory ) {
    throw new AppError(400, "Categoria já existente!")
  }

  const category = new Categories();

  category.name = name;

  categoryRepository.create(category);

  await categoryRepository.save(category);

  return category;
};

export default CreateCategoryService;
