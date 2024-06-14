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
exports.BookingControllers = void 0;
const booking_service_1 = require("./booking.service");
const responseUtils_1 = require("../../utils/responseUtils");
// getAllBookings admin
const getAllBookings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId, date } = req.query;
        const filters = {};
        if (carId) {
            filters.carId = carId;
        }
        if (date) {
            filters.date = date;
        }
        const bookings = yield booking_service_1.BookingServices.getAllBookings(filters);
        if (bookings.length === 0) {
            return (0, responseUtils_1.sendNoDataFoundResponse)(res);
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Bookings retrieved successfully',
            data: bookings,
        });
    }
    catch (error) {
        next(error);
    }
});
// bookCar user
const bookCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId, date, startTime } = req.body;
        const booking = yield booking_service_1.BookingServices.bookCar({
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
    }
    catch (error) {
        next(error);
    }
});
// get all booked car by logged in user
const getUserBookings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield booking_service_1.BookingServices.getUserBookings(req.user._id);
        if (!bookings.length)
            return (0, responseUtils_1.sendNoDataFoundResponse)(res);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'My Bookings retrieved successfully',
            data: bookings,
        });
    }
    catch (error) {
        next(error);
    }
});
const returnCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookingId, endTime } = req.body;
        const booking = yield booking_service_1.BookingServices.returnCar(bookingId, endTime);
        if (!booking) {
            return (0, responseUtils_1.sendNoDataFoundResponse)(res);
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Car returned successfully',
            data: booking,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.BookingControllers = {
    getAllBookings,
    bookCar,
    getUserBookings,
    returnCar,
};
