import mongoose from 'mongoose';
import { TErrorMessages, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorMessages: TErrorMessages = [
    {
      path: '',
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: errorMessages[0].message,
    errorMessages: errorMessages,
  };
};

export default handleCastError;
