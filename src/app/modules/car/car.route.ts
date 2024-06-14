import express from 'express';
import auth from '../../middlewares/auth';
import { CarControllers } from './car.controller';
import validateRequest from '../../middlewares/validateRequest';
import { carValidations } from './car.validation';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(carValidations.createCarValidationSchema),
  CarControllers.createCar,
);
router.get('/', CarControllers.getAllCars);
router.get('/:id', CarControllers.getCar);
router.put(
  '/:id',
  auth('admin'),
  validateRequest(carValidations.updateCarValidationSchema),
  CarControllers.updateCar,
);
router.delete('/:id', auth('admin'), CarControllers.deleteCar);

export const CarRoutes = router;
