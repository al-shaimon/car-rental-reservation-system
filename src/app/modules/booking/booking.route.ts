import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingControllers } from './booking.controller';
import { BookingValidations } from './booking.validation';

const router = express.Router();

router.get('/', auth('admin'), BookingControllers.getAllBookings);
router.post(
  '/',
  auth('user'),
  validateRequest(BookingValidations.userBookingValidationSchema),
  BookingControllers.bookCar,
);
router.get('/my-bookings', auth('user'), BookingControllers.getUserBookings);

export const BookingRoutes = router;
