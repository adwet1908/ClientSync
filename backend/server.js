import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import 'dotenv/config';


const app = express();
const port = process.env.PORT || 5001;

// basic middleware support 
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,              // Enable cookies
}));
app.use(cookieParser());


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})