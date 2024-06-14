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
exports.CarControllers = void 0;
const responseUtils_1 = require("../../utils/responseUtils");
const car_service_1 = require("./car.service");
// create car by admin
const createCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield car_service_1.CarServices.createCarIntoDB(req.body);
        const responseCar = {
            _id: car._id,
            name: car.name,
            description: car.description,
            color: car.color,
            isElectric: car.isElectric,
            features: car.features,
            pricePerHour: car.pricePerHour,
            status: car.status,
            isDeleted: car.isDeleted,
            createdAt: car.createdAt,
            updatedAt: car.updatedAt,
        };
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'Car created successfully',
            data: responseCar,
        });
    }
    catch (error) {
        next(error);
    }
});
// get all car by any user
const getAllCars = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cars = yield car_service_1.CarServices.getAllCars();
        if (cars === null || cars.length === 0) {
            return (0, responseUtils_1.sendNoDataFoundResponse)(res);
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Cars retrieved successfully',
            data: cars,
        });
    }
    catch (error) {
        next(error);
    }
});
// get single car by any user
const getCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield car_service_1.CarServices.getSingleCar(req.params.id);
        if (!car || car.isDeleted) {
            return (0, responseUtils_1.sendNoDataFoundResponse)(res);
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Car retrieved successfully',
            data: car,
        });
    }
    catch (error) {
        next(error);
    }
});
// update car by admin
const updateCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield car_service_1.CarServices.updateSingleCar(req.params.id, req.body);
        if (!car) {
            return (0, responseUtils_1.sendNoDataFoundResponse)(res);
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Car updated successfully',
            data: car,
        });
    }
    catch (error) {
        next(error);
    }
});
// delete car by admin
const deleteCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield car_service_1.CarServices.deleteSingleCar(req.params.id);
        if (!car) {
            return (0, responseUtils_1.sendNoDataFoundResponse)(res);
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Car deleted successfully',
            data: car,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.CarControllers = {
    createCar,
    getAllCars,
    getCar,
    updateCar,
    deleteCar,
};
