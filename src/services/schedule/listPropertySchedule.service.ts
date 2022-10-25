import AppDataSource from "../../data-source"
import { Properties } from "../../entities/properties.entities"
import { AppError } from "../../errors/appError"

const ListScheduleService = async ( id: string ) => {

	const propertyRepository = AppDataSource.getRepository(Properties);

	const property = await propertyRepository.findOneBy({ id });

	if ( !property ) {
		throw new AppError( 404, "Propriedade não encontrada!" )
	};

	const findSchedule = await propertyRepository.findOne({
		where: 
    {
			id
		},
		relations: 
    {
			category: true,
			schedules: true
		}
	});

	if ( !findSchedule ) {
		throw new AppError( 404, "Schedule não encontrada!" )
	};

	return findSchedule;
};

export default ListScheduleService;
