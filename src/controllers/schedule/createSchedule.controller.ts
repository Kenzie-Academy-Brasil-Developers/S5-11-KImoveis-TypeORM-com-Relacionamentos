import { Request, Response } from "express";
import createScheduleService from "../../services/schedule/createSchedule.service";

const CreateScheduleController = async ( request: Request, response: Response) => {

  const userId = request.user.id
	const schedule = request.body
	const createSchedule = await createScheduleService(schedule, userId)

	return response.status(201).json({
		schedules: createSchedule,
		message: "Schedule criada com sucesso!"
	})
};

export default CreateScheduleController;
