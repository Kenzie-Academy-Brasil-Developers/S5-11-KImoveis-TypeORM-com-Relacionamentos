import CreatePropertyController from "../controllers/properties/createProperty.controller";
import ListPropertiesController from "../controllers/properties/listProperties.controller";

import AuthenticationMiddleware from "../middlewares/authentication.middleware";

import { Router } from "express";

const PropertiesRoutes = Router();

PropertiesRoutes.post( "", AuthenticationMiddleware, CreatePropertyController );

PropertiesRoutes.get( "", ListPropertiesController );

export default PropertiesRoutes;