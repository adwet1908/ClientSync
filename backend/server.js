import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRouter from './router/authRouter.js';
import invoiceRouter from './router/invoiceRouter.js';
import leadRouter from './router/leadRouter.js';
import clientRouter from './router/clientRouter.js';
import connectDB from './config/db.js';
import projectRouter from './router/projectRouter.js';

const app = express();
const port = process.env.PORT || 5001;

dotenv.config();

app.use(cookieParser());

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
}));
await connectDB(); 

// routers usage
app.use('/api/auth', authRouter);
app.use('/api/client', clientRouter); 
app.use('/api/lead', leadRouter); 
app.use('/api/invoice', invoiceRouter); 
app.use('/api/project', projectRouter); 


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})