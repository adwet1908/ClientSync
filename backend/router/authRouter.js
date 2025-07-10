import express from 'express'; 
import {adminRegister, adminLogin, adminLogout, adminStatus} from '../controllers/auth.controller.js';
import verifyToken from '../middleware/verifyToken.js';

const authRouter = express.Router(); 

authRouter.post('/admin-register', adminRegister)
authRouter.post('/admin-login', adminLogin)
authRouter.post('/admin-logout', adminLogout); 
authRouter.get('/get-user', verifyToken, adminStatus); 

export default authRouter; 