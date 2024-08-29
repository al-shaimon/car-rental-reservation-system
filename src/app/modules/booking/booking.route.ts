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

router.post(
  '/update-booking/:id',
  auth('user'),
  validateRequest(BookingValidations.userUpdateBookingValidationSchema),
  BookingControllers.updateUserBooking,
);

router.post(
  '/admin/update-booking/:id',
  auth('admin'),
  validateRequest(BookingValidations.adminUpdateBookingValidationSchema),
  BookingControllers.updateAdminBooking,
);

router.delete(
  '/delete/:bookingId',
  auth('user'),
  BookingControllers.deleteUserBooking,
); // User delete
router.delete(
  '/admin/delete/:bookingId',
  auth('admin'),
  BookingControllers.deleteAdminBooking,
); // Admin delete

export const BookingRoutes = router;
