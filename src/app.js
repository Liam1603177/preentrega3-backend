import express from 'express';
import mongoose from 'mongoose';
import { swaggerUi, specs } from './config/swagger.js';
import adoptionRouter from './routes/adoption.router.js';
import mocksRouter from './routes/mocks.router.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';

const app = express();
app.use(express.json());

async function main() {
await mongoose.connect('mongodb://localhost:27017/tu_base_de_datos');

app.use('/api/adoptions', adoptionRouter);
app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});

}
main().catch(err => console.log(err));

export default app;