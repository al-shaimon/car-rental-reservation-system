import { Car } from './car.model';
import { TCar } from './car.interface';

const createCarIntoDB = async (carData: TCar) => {
  return await Car.create(carData);
};

const getAllCars = async () => {
  return await Car.find({ isDeleted: false });
};

const getSingleCar = async (id: string) => {
  return await Car.findById(id);
};

const updateSingleCar = async (id: string, carData: TCar) => {
  return await Car.findByIdAndUpdate(id, carData, { new: true });
};

const deleteSingleCar = async (id: string) => {
  return await Car.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

export const CarServices = {
  createCarIntoDB,
  getAllCars,
  getSingleCar,
  updateSingleCar,
  deleteSingleCar,
};
