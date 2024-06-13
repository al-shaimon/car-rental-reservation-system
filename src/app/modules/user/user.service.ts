/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { User } from './user.model';
import httpStatus from 'http-status';

const registerUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({
      success: true,
      statusCode: httpStatus[201],
      message: 'User registered successfully',
      data: user,
    });
  } catch (error: any) {
    res.status(400).send({ success: false, message: error.message });
  }
};

export const UserServices = {
  registerUser,
};
