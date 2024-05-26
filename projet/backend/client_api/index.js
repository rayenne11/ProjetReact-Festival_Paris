import express from 'express';
import morgan from 'morgan';
import clientRouter from './routes/client.js'; // Note the '.js' extension
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

//definition des middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors('*'));

app.use('/client', clientRouter);

const connectDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://test:test@cluster0.l1allid.mongodb.net/projet-opus', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('db connected');
  } catch (error) {
    console.log(error.message);
  }
};

app.listen(5000, () => {
  connectDb();
  console.log('listening on port 5000!');
});
