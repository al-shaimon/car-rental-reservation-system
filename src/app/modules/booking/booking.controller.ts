import { Request, Response, NextFunction } from 'express';
import { BookingServices } from './booking.service';
import { sendNoDataFoundResponse } from '../../utils/responseUtils';

// getAllBookings admin
const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { carId, date } = req.query;
    const filters: { carId?: string; date?: string } = {};

    if (carId) {
      filters.carId = carId as string;
    }

    if (date) {
      filters.date = date as string;
    }

    const bookings = await BookingServices.getAllBookings(filters);

    if (bookings.length === 0) {
      return sendNoDataFoundResponse(res);
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Bookings retrieved successfully',
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// bookCar user
const bookCar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { carId, date, startTime } = req.body;
    const booking = await BookingServices.bookCar({
      carId: carId,
      userId: req.user._id,
      date,
      startTime,
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Car booked successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// get all booked car by logged in user
const getUserBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookings = await BookingServices.getUserBookings(req.user._id);
    if (!bookings.length) return sendNoDataFoundResponse(res);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'My Bookings retrieved successfully',
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

const returnCar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookingId, endTime } = req.body;

    const booking = await BookingServices.returnCar(bookingId, endTime);

    if (!booking) {
      return sendNoDataFoundResponse(res);
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Car returned successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const BookingControllers = {
  getAllBookings,
  bookCar,
  getUserBookings,
  returnCar,
};
