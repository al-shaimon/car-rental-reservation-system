import express from 'express';
import { AuthControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidations.userValidationSchema),
  AuthControllers.signup,
);
router.post('/signin', AuthControllers.signin);

export const AuthRoutes = router;
