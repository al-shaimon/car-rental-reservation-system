"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    role: zod_1.z.enum(['user', 'admin']),
    password: zod_1.z.string().min(6),
    phone: zod_1.z.string(),
    address: zod_1.z.string(),
});
exports.AuthValidations = {
    userValidationSchema,
};
