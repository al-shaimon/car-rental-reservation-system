"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carValidations = void 0;
const zod_1 = require("zod");
const createCarValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    color: zod_1.z.string(),
    isElectric: zod_1.z.boolean(),
    features: zod_1.z.array(zod_1.z.string()).nonempty(),
    pricePerHour: zod_1.z.number().positive(),
    status: zod_1.z.enum(['available', 'unavailable']).default('available'),
    isDeleted: zod_1.z.boolean().default(false),
});
const updateCarValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    color: zod_1.z.string().optional(),
    isElectric: zod_1.z.boolean().optional(),
    features: zod_1.z.array(zod_1.z.string()).nonempty().optional(),
    pricePerHour: zod_1.z.number().positive().optional(),
    status: zod_1.z.enum(['available', 'unavailable']).default('available').optional(),
    isDeleted: zod_1.z.boolean().default(false).optional(),
});
const returnCarValidationSchema = zod_1.z.object({
    bookingId: zod_1.z.string(),
    endTime: zod_1.z.string(),
});
exports.carValidations = {
    createCarValidationSchema,
    updateCarValidationSchema,
    returnCarValidationSchema,
};
