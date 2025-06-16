import express from 'express';
import mongoose from 'mongoose';
import mocksRouter from './routes/mocks.router.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';

const app = express();
app.use(express.json());

await mongoose.connect('mongodb://localhost:27017/tu_base_de_datos');

app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
