import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listScheduleService from "../../services/schedule/listPropertySchedule.service";

const ListPropertyScheduleController = async (request: Request, response: Response) => {

	const id = request.params.id;

	const schedule = await listScheduleService( id );

	return response.json(instanceToPlain( schedule ));

};

export default ListPropertyScheduleController;
