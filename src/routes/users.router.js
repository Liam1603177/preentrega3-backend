import { Router } from 'express';
import { User } from '../models/User.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('pets');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios.' });
  }
});

export default router;
