import UserLoginController from "../controllers/login/userLogin.controller";

import { Router } from "express";

const LoginRoutes = Router();

LoginRoutes.post( "", UserLoginController );

export default LoginRoutes;