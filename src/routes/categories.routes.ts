import CreateCategoryController from "../controllers/categories/createCategory.controller";
import ListCategoriesController from "../controllers/categories/listCategories.controller";
import ListCategoriesPropertiesController from "../controllers/categories/listCategoriesProperties.controller";

import AuthenticationMiddleware from "../middlewares/authentication.middleware";

import { Router } from "express";

const CategoryRoutes = Router();

CategoryRoutes.post("", AuthenticationMiddleware, CreateCategoryController);

CategoryRoutes.get("", ListCategoriesController);

CategoryRoutes.get("/:id/properties", ListCategoriesPropertiesController);

export default CategoryRoutes;
