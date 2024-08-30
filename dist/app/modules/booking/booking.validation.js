"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = void 0;
const zod_1 = require("zod");
const userBookingValidationSchema = zod_1.z.object({
    carId: zod_1.z.string(),
    date: zod_1.z.string(),
    startTime: zod_1.z.string(),
    endTime: zod_1.z.string().optional(),
    approval: zod_1.z.boolean().optional(),
    nidOrPassport: zod_1.z.string(),
    drivingLicense: zod_1.z.string(),
    paymentInfo: zod_1.z.string(),
    paymentStatus: zod_1.z.boolean().optional(),
});
const userUpdateBookingValidationSchema = zod_1.z.object({
    date: zod_1.z.string().optional(),
    startTime: zod_1.z.string().optional(),
    paymentStatus: zod_1.z.boolean().optional(),
});
const adminUpdateBookingValidationSchema = zod_1.z.object({
    date: zod_1.z.string().optional(),
    startTime: zod_1.z.string().optional(),
    endTime: zod_1.z.string().optional(),
    approval: zod_1.z.boolean().optional(),
    paymentStatus: zod_1.z.boolean().optional(),
});
exports.BookingValidations = {
    userBookingValidationSchema,
    userUpdateBookingValidationSchema,
    adminUpdateBookingValidationSchema,
};
