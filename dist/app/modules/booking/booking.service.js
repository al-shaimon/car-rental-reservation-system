"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const booking_model_1 = require("./booking.model");
const car_model_1 = require("../car/car.model");
// get all bookings admin
const getAllBookings = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (filters = {}) {
    const query = {};
    if (filters.carId) {
        query.car = filters.carId;
    }
    if (filters.date) {
        query.date = filters.date;
    }
    return yield booking_model_1.Booking.find(query)
        .populate({ path: 'user', select: '-createdAt -updatedAt' })
        .populate('car');
});
// bookCar by user
const bookCar = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield car_model_1.Car.findById(bookingData.carId);
    if (!car || car.status === 'unavailable') {
        throw new Error('Car is not available for booking');
    }
    const booking = yield booking_model_1.Booking.create({
        car: bookingData.carId,
        user: bookingData.userId,
        date: bookingData.date,
        startTime: bookingData.startTime,
    });
    yield car_model_1.Car.findByIdAndUpdate(bookingData.carId, { status: 'unavailable' });
    const populatedBooking = yield booking_model_1.Booking.findById(booking._id)
        .populate({ path: 'user', select: '-createdAt -updatedAt' })
        .populate('car');
    return populatedBooking;
});
// get all booked car by logged in user
const getUserBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield booking_model_1.Booking.find({ user: userId })
        .populate({ path: 'user', select: '-createdAt -updatedAt' })
        .populate('car');
});
const returnCar = (bookingId, endTime) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.findById(bookingId).populate('car');
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
    const totalCost = ((durationMinutes / 60) * booking.car.pricePerHour).toFixed(2);
    // Update booking with end time and total cost
    booking.endTime = endTime;
    booking.totalCost = parseFloat(totalCost); // Store as a number
    // Update the car status to 'available'
    yield car_model_1.Car.findByIdAndUpdate(booking.car._id, { status: 'available' });
    // Save the updated booking
    yield booking.save();
    // Populate and return the updated booking
    const updatedBooking = yield booking_model_1.Booking.findById(bookingId)
        .populate({ path: 'user', select: '-createdAt -updatedAt' })
        .populate('car');
    return updatedBooking;
});
exports.BookingServices = {
    getAllBookings,
    bookCar,
    getUserBookings,
    returnCar,
};
