/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { sendNoDataFoundResponse } from '../../utils/responseUtils';
import { CarServices } from './car.service';

const createCar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const car = await CarServices.createCarIntoDB(req.body);

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
  } catch (error: any) {
    next(error);
  }
};

const getAllCars = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cars = await CarServices.getAllCars();
    if (cars === null || cars.length === 0) {
      return sendNoDataFoundResponse(res);
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Cars retrieved successfully',
      data: cars,
    });
  } catch (error: any) {
    next(error);
  }
};

const getCar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const car = await CarServices.getSingleCar(req.params.id);
    if (!car || car.isDeleted) {
      return sendNoDataFoundResponse(res);
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Car retrieved successfully',
      data: car,
    });
  } catch (error: any) {
    next(error);
  }
};

const updateCar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const car = await CarServices.updateSingleCar(req.params.id, req.body);
    if (!car) {
      return sendNoDataFoundResponse(res);
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Car updated successfully',
      data: car,
    });
  } catch (error: any) {
    next(error);
  }
};

const deleteCar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const car = await CarServices.deleteSingleCar(req.params.id);
    if (!car) {
      return sendNoDataFoundResponse(res);
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Car deleted successfully',
      data: car,
    });
  } catch (error: any) {
    next(error);
  }
};

export const CarControllers = {
  createCar,
  getAllCars,
  getCar,
  updateCar,
  deleteCar,
};
