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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = exports.signin = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const responseUtils_1 = require("../../utils/responseUtils");
const user_service_1 = require("./user.service");
// signup controller
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, role, password, phone, address } = req.body;
        // const hashedPassword = await bcrypt.hash(password, 10);
        const user = yield user_service_1.AuthServices.signUp({
            name,
            email,
            role,
            password,
            phone,
            address,
        });
        // Sending response without password
        const responseUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'User registered successfully',
            data: responseUser,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signup = signup;
// signin controller
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_service_1.AuthServices.signIn(email);
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            return (0, responseUtils_1.sendNoDataFoundResponse)(res);
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, config_1.default.jwt_access_secret || '', { expiresIn: '30d' });
        // Sending response without password
        const responseUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User logged in successfully',
            data: responseUser,
            token,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signin = signin;
exports.AuthControllers = {
    signup: exports.signup,
    signin: exports.signin,
};
