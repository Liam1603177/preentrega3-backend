import { Router } from 'express';
import { Pet } from '../models/Pet.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener mascotas.' });
  }
});

export default router;
