"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = void 0;
const zod_1 = require("zod");
const userBookingValidationSchema = zod_1.z.object({
    carId: zod_1.z.string(),
    date: zod_1.z.string(),
    startTime: zod_1.z.string(),
});
exports.BookingValidations = {
    userBookingValidationSchema,
};
