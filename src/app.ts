import "reflect-metadata"
import "dotenv/config";
import "express-async-errors"
import express from "express"
import errorHandlingMiddleware from "./middlewares/errorHandling.middleware";
import UserRoutes from "./routes/user.routes";
import LoginRoutes from "./routes/login.routes";
import CategoryRoutes from "./routes/categories.routes";
import PropertiesRoutes from "./routes/properties.routes";
import ScheduleRoutes from "./routes/schedule.routes";

const app = express();
app.use(express.json());

app.use( "/users",      UserRoutes );
app.use( "/login",      LoginRoutes );
app.use( "/categories", CategoryRoutes );
app.use( "/properties", PropertiesRoutes );
app.use( "/schedules",  ScheduleRoutes );

app.use(errorHandlingMiddleware);

export default app;