import { Router } from 'express';
import generateMockUser from '../utils/generateMockUser.js';
import { User } from '../models/User.js';
import { Pet } from '../models/Pet.js';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const router = Router();

// GET /api/mocks/mockingusers → generar 50 usuarios ficticios
router.get('/mockingusers', (req, res) => {
  const users = [];
  for (let i = 0; i < 50; i++) {
    users.push(generateMockUser());
  }
  res.json(users);
});

// POST /api/mocks/generateData → insertar usuarios y mascotas en la base de datos
router.post('/generateData', async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const insertedPets = [];
    for (let i = 0; i < pets; i++) {
      const pet = new Pet({
        name: faker.animal.cat(),
        type: faker.animal.type(),
        age: faker.number.int({ min: 1, max: 15 })
      });
      await pet.save();
      insertedPets.push(pet._id);
    }

    for (let i = 0; i < users; i++) {
      const user = new User({
        ...generateMockUser(),
        pets: faker.helpers.arrayElements(insertedPets, faker.number.int({ min: 0, max: 3 }))
      });
      await user.save();
    }

    res.status(201).json({ message: 'Datos generados correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generando datos.' });
  }
});

export default router;
