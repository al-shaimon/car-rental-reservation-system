/* eslint-disable @typescript-eslint/no-explicit-any */
import { Booking } from './booking.model';
import { Car } from '../car/car.model';
import { TCar } from '../car/car.interface';

// get all bookings admin
const getAllBookings = async (
  filters: { carId?: string; date?: string } = {},
) => {
  const query: any = {};

  if (filters.carId) {
    query.car = filters.carId;
  }

  if (filters.date) {
    query.date = filters.date;
  }

  return await Booking.find(query)
    .populate({ path: 'user', select: '-createdAt -updatedAt' })
    .populate('car');
};

// bookCar by user
const bookCar = async (bookingData: {
  carId: string;
  userId: string;
  date: string;
  startTime: string;
}) => {
  const car = await Car.findById(bookingData.carId);

  if (!car || car.status === 'unavailable') {
    throw new Error('Car is not available for booking');
  }

  const booking = await Booking.create({
    car: bookingData.carId,
    user: bookingData.userId,
    date: bookingData.date,
    startTime: bookingData.startTime,
  });

  await Car.findByIdAndUpdate(bookingData.carId, { status: 'unavailable' });

  const populatedBooking = await Booking.findById(booking._id)
    .populate({ path: 'user', select: '-createdAt -updatedAt' })
    .populate('car');

  return populatedBooking;
};

// get all booked car by logged in user
const getUserBookings = async (userId: string) => {
  return await Booking.find({ user: userId })
    .populate({ path: 'user', select: '-createdAt -updatedAt' })
    .populate('car');
};

const returnCar = async (bookingId: string, endTime: string) => {
  const booking = await Booking.findById(bookingId).populate<{ car: TCar }>(
    'car',
  );

  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.car.status === 'available') {
    throw new Error('Car has already been returned');
  }

  const [startHour, startMinute] = booking.startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  let durationMinutes = endTotalMinutes - startTotalMinutes;

  if (durationMinutes < 0) {
    durationMinutes += 24 * 60;
  }

  const totalCost = ((durationMinutes / 60) * booking.car.pricePerHour).toFixed(
    2,
  );

  // Update booking with end time and total cost
  booking.endTime = endTime;
  booking.totalCost = parseFloat(totalCost); // Store as a number

  // Update the car status to 'available'
  await Car.findByIdAndUpdate(booking.car._id, { status: 'available' });

  // Save the updated booking
  await booking.save();

  // Populate and return the updated booking
  const updatedBooking = await Booking.findById(bookingId)
    .populate({ path: 'user', select: '-createdAt -updatedAt' })
    .populate('car');

  return updatedBooking;
};

export const BookingServices = {
  getAllBookings,
  bookCar,
  getUserBookings,
  returnCar,
};
