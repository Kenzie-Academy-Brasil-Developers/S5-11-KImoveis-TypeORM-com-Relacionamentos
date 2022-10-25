import createUsersController from "../controllers/users/createUsers.controllers";
import deleteUserController from "../controllers/users/deleteUsersById.controllers";
import listUsersController from "../controllers/users/listUsers.controllers";
import updateUserByIdController from "../controllers/users/updateUserById.controllers";

import AuthenticationMiddleware from "../middlewares/authentication.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import verifyUpdateForbiddenFieldsMiddleware from "../middlewares/verifyUpdateForbiddenFields.middleware";
import isAdmPatchMiddleware from "../middlewares/isAdmPatch.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";
import verifyIsActiveMiddleware from "../middlewares/verifyIsActive.middleware";

import { Router } from "express";

const UserRoutes = Router();

UserRoutes.post("", createUsersController);

UserRoutes.get("", AuthenticationMiddleware, isAdmMiddleware, listUsersController);

UserRoutes.patch("/:id", ensureAuthMiddleware, isAdmPatchMiddleware, verifyUpdateForbiddenFieldsMiddleware, updateUserByIdController);

UserRoutes.delete("/:id", ensureAuthMiddleware, isAdmMiddleware, verifyIsActiveMiddleware, deleteUserController);

export default UserRoutes;
