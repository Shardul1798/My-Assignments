import express from 'express';
import { adminController } from '../controllers/admin.controller';
import { checkBasicAuthAndValidate, validateAuthToken } from '../middleware/admin.auth';

export const  adminRouter = express.Router();

adminRouter.post('/login', checkBasicAuthAndValidate, adminController.loginHandler);
adminRouter.put('/register', checkBasicAuthAndValidate ,adminController.RegisterHandler);
adminRouter.get('/check-user', checkBasicAuthAndValidate, adminController.checkUserExists);
adminRouter.get('/logout', validateAuthToken, adminController.logout);
adminRouter.patch('/change-password', validateAuthToken, adminController.changePassword)