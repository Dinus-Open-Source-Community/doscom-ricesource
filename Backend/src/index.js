import express from 'express';
import configRoutes from './routes/configRoutes.js';
import komentarRoutes from './routes/komentarRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import adminRoutes from './routes/adminRouter.js';
import login from './routes/loginController.js';
import cors from 'cors';
import dotenv from 'dotenv';


const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use('/', configRoutes);
app.use('/', komentarRoutes);
app.use('/', usersRoutes);
app.use('/admin', adminRoutes);
app.use('/',login)

// const port = 5000;
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server ${port} dapat rokok 2 batang`);
});