import { Router } from 'express';
import { Adoption } from '../models/Adoption.js';
import { User } from '../models/User.js';
import { Pet } from '../models/Pet.js';

const router = Router();

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags:
 *       - Adoptions
 *     responses:
 *       200:
 *         description: Lista de adopciones
 */
router.get('/', async (req, res) => {
  try {
    const adoptions = await Adoption.find().populate('user').populate('pet');
    res.json(adoptions);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener adopciones.' });
  }
});

/**
 * @swagger
 * /api/adoptions:
 *   post:
 *     summary: Registrar una adopción
 *     tags:
 *       - Adoptions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               petId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Adopción registrada
 */
router.post('/', async (req, res) => {
  const { userId, petId } = req.body;

  try {
    const user = await User.findById(userId);
    const pet = await Pet.findById(petId);

    if (!user || !pet) {
      return res.status(404).json({ error: 'Usuario o mascota no encontrado' });
    }

    const adoption = new Adoption({ user: user._id, pet: pet._id });
    await adoption.save();

    res.status(201).json({ message: 'Adopción registrada correctamente', adoption });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar adopción' });
  }
});

export default router;
