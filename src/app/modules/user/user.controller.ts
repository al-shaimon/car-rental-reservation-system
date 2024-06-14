/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { sendNoDataFoundResponse } from '../../utils/responseUtils';
import { AuthServices } from './user.service';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, role, password, phone, address } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await AuthServices.signUp({
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
  } catch (error: any) {
    next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = await AuthServices.signIn(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return sendNoDataFoundResponse(res);
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwt_access_secret || '',
      { expiresIn: '30d' },
    );

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
  } catch (error: any) {
    next(error);
  }
};

export const AuthControllers = {
  signup,
  signin,
};
