import { Router } from 'express';
import User from '../models/User.js';
import Pet from '../models/Pet.js';
import Adoption from '../models/Adoption.js';

const router = Router();

router.post('/', async (req, res) => {
  const { userId, petId, adoptionDate } = req.body;

  if (!userId || !petId) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  const adoption = await Adoption.create({
    user: userId,
    pet: petId,
    adoptionDate: adoptionDate || new Date(),
  });

  res.status(201).json({ message: 'Adopción registrada correctamente', adoption });
});

router.get('/', async (req, res) => {
  const adoptions = await Adoption.find().populate('user pet');
  res.status(200).json(adoptions);
});

export default router;
