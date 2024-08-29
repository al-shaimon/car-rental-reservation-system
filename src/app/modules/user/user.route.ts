import express from 'express';
import { AuthControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './user.validation';
import authMiddleware from './authMiddleware';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidations.userValidationSchema),
  AuthControllers.signup,
);
router.post('/signin', AuthControllers.signin);
router.post(
  '/forget-password',
  validateRequest(AuthValidations.forgetPasswordSchema),
  AuthControllers.forgetPassword,
);
router.post(
  '/reset-password/:token',
  validateRequest(AuthValidations.resetPasswordSchema),
  AuthControllers.resetPassword,
);

router.post(
  '/update-profile',
  authMiddleware,
  validateRequest(AuthValidations.updateProfileSchema),
  AuthControllers.updateProfile,
);

export const AuthRoutes = router;
