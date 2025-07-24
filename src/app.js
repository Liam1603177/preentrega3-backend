import express from 'express';
import mongoose from 'mongoose';
import { swaggerUi, specs } from './config/swagger.js';
import adoptionRouter from './routes/adoption.router.js';
import mocksRouter from './routes/mocks.router.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 👉 Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 👉 Rutas
app.use('/api/adoptions', adoptionRouter);
app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);

// 👉 Conexión Mongo + Start server solo si NO es test
if (process.env.NODE_ENV !== 'test') {
  async function main() {
    try {
      // 👇 Usar variable desde .env
      await mongoose.connect(process.env.MONGO_URI);
      console.log('🟢 Conectado a MongoDB');

      app.listen(3000, () => {
        console.log('🚀 Servidor corriendo en puerto 3000');
      });
    } catch (err) {
      console.error('🔴 Error al conectar a MongoDB:', err);
    }
  }

  main();
}

export default app;
