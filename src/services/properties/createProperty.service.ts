import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";
import { Properties } from "../../entities/properties.entities";
import { Adress } from "../../entities/adresses.entities";
import { Categories } from "../../entities/categories.entities";

const CreatePropertyService = async ({ value, size, address, categoryId, }: IPropertyRequest ) => {

  const propertyRepository = AppDataSource.getRepository( Properties );

  const addressRepository = AppDataSource.getRepository( Adress );

  const categoryRepository = AppDataSource.getRepository( Categories );

  const addresses = await addressRepository.find();

  const propertyList = addresses.map(({ district, zipCode, number, city, state }) => ({
      district,
      zipCode,
      number,
      city,
      state
    })
  );

  const targetAddress = propertyList.find(( addressObj ) => Object.entries( addressObj ).toString() === Object.entries( address ).toString());

  if ( targetAddress ) {
    throw new AppError( 400, "Este endereço já pertence a outro!" )
  }

  const categories = await categoryRepository.find();

  const propertyCategory = categories.find(( targetCategory ) => targetCategory.id === categoryId );

  if ( !propertyCategory ) {
    throw new AppError( 404, "Categoria invalida pelo ID!" )
  }

  if (address.zipCode.length > 8 ) {
    throw new AppError( 400, "CEP Invalido!" )
  }

  if (address.state.length > 2 ) {
    throw new AppError( 400, "Estado Invalido!" )
  }

  const newAddress = new Adress();

  newAddress.district = address.district;
  newAddress.zipCode = address.zipCode;
  newAddress.number = address.number!;
  newAddress.city = address.city;
  newAddress.state = address.state;

  addressRepository.create( newAddress );

  await addressRepository.save( newAddress );

  const date = new Date();

  const property = new Properties();

  property.value = value;
  property.size = size;
  property.address = newAddress;
  property.category = propertyCategory;
  property.createdAt = date;
  property.updatedAt = date;

  propertyRepository.create( property );

  await propertyRepository.save( property );

  return property;
};

export default CreatePropertyService;
