"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const car_controller_1 = require("./car.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const car_validation_1 = require("./car.validation");
const booking_controller_1 = require("../booking/booking.controller");
const router = express_1.default.Router();
router.put('/return', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(car_validation_1.carValidations.returnCarValidationSchema), booking_controller_1.BookingControllers.returnCar);
router.post('/', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(car_validation_1.carValidations.createCarValidationSchema), car_controller_1.CarControllers.createCar);
router.get('/', car_controller_1.CarControllers.getAllCars);
router.get('/:id', car_controller_1.CarControllers.getCar);
router.put('/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(car_validation_1.carValidations.updateCarValidationSchema), car_controller_1.CarControllers.updateCar);
router.delete('/:id', (0, auth_1.default)('admin'), car_controller_1.CarControllers.deleteCar);
exports.CarRoutes = router;
