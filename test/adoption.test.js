import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../src/app.js';
import User from '../src/models/User.js';
import Pet from '../src/models/Pet.js';
import Adoption from '../src/models/Adoption.js';

const request = supertest(app);

let userId;
let petId;

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/test-adoption');
  await mongoose.connection.asPromise();

  await Adoption.deleteMany({});
  await User.deleteMany({});
  await Pet.deleteMany({});

  const user = await User.create({
    first_name: 'Test',
    last_name: 'User',
    email: 'testuser@example.com',
    password: 'hashedpass',
    role: 'user',
    pets: []
  });
  userId = user._id;

  const pet = await Pet.create({
    name: 'Firulais',
    specie: 'Perro',
    birthDate: '2020-01-01',
  });
  petId = pet._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Adoption Router', () => {
  it('POST /api/adoptions → debe registrar una adopción', async () => {
    const response = await request.post('/api/adoptions').send({
      userId,
      petId,
      adoptionDate: '2024-01-01'
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('adoption');
    expect(response.body.adoption.user).toBe(userId.toString());
    expect(response.body.adoption.pet).toBe(petId.toString());
  });

  it('GET /api/adoptions → debe devolver las adopciones', async () => {
    const response = await request.get('/api/adoptions');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
