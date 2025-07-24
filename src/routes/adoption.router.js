import mongoose from 'mongoose';
import supertest from 'supertest';
import { expect } from '@jest/globals';
import User from '../models/User.js';
import Pet from '../models/Pet.js';
import Adoption from '../models/Adoption.js';
import { Router } from 'express';
const router = Router();


beforeAll(async () => {
  await mongoose.disconnect();
  await mongoose.connect('mongodb://127.0.0.1:27017/test-adoption');
  await mongoose.connection.asPromise();
  await User.deleteMany({});
  await Pet.deleteMany({});
  await Adoption.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Adoption Router', () => {
  let user, pet;

  beforeEach(async () => {
    user = await User.create({
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      password: 'testpass',
      role: 'user',
      pets: [],
    });

    pet = await Pet.create({
      name: 'Firulais',
      specie: 'Perro',
      birthDate: '2020-01-01',
    });
  });

  afterEach(async () => {
    await Adoption.deleteMany({});
    await User.deleteMany({});
    await Pet.deleteMany({});
  });

  test('POST /api/adoptions → debe registrar una adopción', async () => {
    const response = await request.post('/api/adoptions').send({
      userId: user._id.toString(),
      petId: pet._id.toString(),
      adoptionDate: '2024-01-01',
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Adopción registrada correctamente');
  });

  test('GET /api/adoptions → debe obtener todas las adopciones', async () => {
    await Adoption.create({
      user: user._id,
      pet: pet._id,
      adoptionDate: new Date(),
    });

    const response = await request.get('/api/adoptions');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

export default router;
