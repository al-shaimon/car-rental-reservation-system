import { Car } from './car.model';
import { TCar } from './car.interface';

// create car by admin

const createCarIntoDB = async (carData: TCar) => {
  return await Car.create(carData);
};

// get all car by any user

const getAllCars = async () => {
  return await Car.find({ isDeleted: false });
};

// get single car by any user

const getSingleCar = async (id: string) => {
  return await Car.findById(id);
};

// update car by admin

const updateSingleCar = async (id: string, carData: TCar) => {
  return await Car.findByIdAndUpdate(id, carData, { new: true });
};

// delete car by admin

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
