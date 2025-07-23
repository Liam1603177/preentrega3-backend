import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';
import { User } from '../src/models/User.js';
import { Pet } from '../src/models/Pet.js';
import { Adoption } from '../src/models/Adoption.js';

let server;
let userId;
let petId;

beforeAll(async () => {
  // Conexión a la base de datos de testing
  await mongoose.connect('mongodb://127.0.0.1:27017/test-adoption');

  // Crear usuario y mascota para usar en test
  const user = new User({
    first_name: 'Test',
    last_name: 'User',
    email: 'testuser@example.com',
    password: 'hashedpass',
    role: 'user',
    pets: []
  });
  await user.save();
  userId = user._id;

  const pet = new Pet({
    name: 'Firulais',
    type: 'dog',
    age: 3
  });
  await pet.save();
  petId = pet._id;

  server = app.listen(4000); // correr app en test
});

afterAll(async () => {
  await Adoption.deleteMany({});
  await User.deleteMany({});
  await Pet.deleteMany({});
  await mongoose.connection.close();
  server.close();
});

describe('Adoption Router', () => {
  it('POST /api/adoptions → debe registrar una adopción', async () => {
    const response = await request(app)
      .post('/api/adoptions')
      .send({ userId, petId });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('adoption');
    expect(response.body.adoption).toHaveProperty('user');
    expect(response.body.adoption).toHaveProperty('pet');
  });

  it('GET /api/adoptions → debe devolver las adopciones', async () => {
    const response = await request(app).get('/api/adoptions');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
