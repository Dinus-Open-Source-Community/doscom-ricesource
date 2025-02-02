import express from 'express';
import configRoutes from './routes/configRoutes.js';
import komentarRoutes from './routes/komentarRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import cors from 'cors';
const app = express();

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use('/api', configRoutes);
app.use('/api', komentarRoutes);
app.use('/api', usersRoutes);

const port = 5000;
app.listen(port, () => {
    console.log(`Server ${port} dapat rokok 2 batang`);
});
