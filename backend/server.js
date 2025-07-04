import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import authRouter from './router/authRouter.js';
import invoiceRouter from './router/invoiceRouter.js';
import leadRouter from './router/leadRouter.js';
import clientRouter from './router/clientRouter.js';
import connectDB from './config/db.js';

const app = express();
const port = process.env.PORT || 5001;

await connectDB(); 

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(cookieParser());

// routers usage
app.use('/api/auth', authRouter);
app.use('/api/leads,', leadRouter); 
app.use('/api/client,', clientRouter); 
app.use('/api/invoice,', invoiceRouter); 


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})