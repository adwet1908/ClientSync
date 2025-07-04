import express from 'express'; 
import {adminRegister, adminLogin, adminLogout} from '../controllers/auth.controller.js';

const authRouter = express.Router(); 

authRouter.post('/admin-register', adminRegister)
authRouter.post('/admin-login', adminLogin)
authRouter.post('/', adminLogin); 

export default authRouter; 