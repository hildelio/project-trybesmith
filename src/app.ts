import express from 'express';
import productRouter from './routes/productRouter';
import orderRouter from './routes/orderRouter';
import loginRouter from './routes/loginRouter';

const app = express();

app.use(express.json());

app.use('/products', productRouter);

app.use('/orders', orderRouter);

app.use('/login', loginRouter);

export default app;
