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
exports.CarServices = void 0;
const car_model_1 = require("./car.model");
// create car by admin
const createCarIntoDB = (carData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield car_model_1.Car.create(carData);
});
// get all car by any user
const getAllCars = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield car_model_1.Car.find({ isDeleted: false });
});
// get single car by any user
const getSingleCar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield car_model_1.Car.findById(id);
});
// update car by admin
const updateSingleCar = (id, carData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield car_model_1.Car.findByIdAndUpdate(id, carData, { new: true });
});
// delete car by admin
const deleteSingleCar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield car_model_1.Car.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
});
exports.CarServices = {
    createCarIntoDB,
    getAllCars,
    getSingleCar,
    updateSingleCar,
    deleteSingleCar,
};
