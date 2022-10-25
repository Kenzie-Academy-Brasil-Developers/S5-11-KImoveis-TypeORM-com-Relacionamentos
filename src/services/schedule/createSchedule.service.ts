import AppDataSource from '../../data-source'
import { Properties } from '../../entities/properties.entities'
import { Schedules } from '../../entities/schedules.entities'
import { User } from '../../entities/user.entities'
import { AppError } from '../../errors/appError'
import { IScheduleRequest } from '../../interfaces/schedules'

const createScheduleService = async ( schedule: IScheduleRequest, userId: string ): Promise<Schedules> => {

	const schedulesRepository = AppDataSource.getRepository(Schedules);

	const userRepository = AppDataSource.getRepository(User);

	const propertyRepository = AppDataSource.getRepository(Properties);


	const getHour = +schedule.hour.split(' : ')[0]

	if ( getHour < 8 || getHour >= 18 ) {
		throw new AppError( 400, "Horario invalido, escolha entre 08:00h as 18:00h!" )
	}

	const getDay = new Date(schedule.date).getDay()

	if ( getDay === 0 || getDay === 6 ) {
		throw new AppError( 400, "Data invalida, escolha outra!" )
	}

	const findUser = await userRepository.findOneBy({ id: userId })

	if (!findUser) {
		throw new AppError( 404, "Usuário não encontrado!" )
	}

	const findProperty = await propertyRepository.findOneBy({
		id: schedule.propertyId
	})

	if ( !findProperty ) {
		throw new AppError( 404, "Propriedade não encontrada!")
	}

	const agenda = await schedulesRepository.find()

	const targetGender = agenda.find((agenda) => agenda)

	if ( targetGender ) {
		throw new AppError( 400, "Dato ou hrario já existente!" );
	}
	const newSchedule = new Schedules()
	newSchedule.date = schedule.date
	newSchedule.hour = schedule.hour
	newSchedule.property = findProperty
	newSchedule.user = findUser

	const createSchedule = schedulesRepository.create(newSchedule)

	await schedulesRepository.save(createSchedule)

	return createSchedule
}
export default createScheduleService