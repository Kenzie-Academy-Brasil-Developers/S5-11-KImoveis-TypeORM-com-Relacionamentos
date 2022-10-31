import CreateScheduleController from "../controllers/schedule/createSchedule.controller";
import ListPropertyScheduleController from "../controllers/schedule/listPropertySchedule.controller";

import AuthenticationMiddleware from "../middlewares/authentication.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";

import { Router } from "express";

const ScheduleRoutes = Router();

ScheduleRoutes.post( "", AuthenticationMiddleware, CreateScheduleController );

ScheduleRoutes.get( "/properties/:id", AuthenticationMiddleware, isAdmMiddleware, ListPropertyScheduleController );

export default ScheduleRoutes;