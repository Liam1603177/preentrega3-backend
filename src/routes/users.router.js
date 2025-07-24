import { Router } from 'express';
import { User } from '../models/User.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *         first_name:
 *           type: string
 *           example: Juan
 *         last_name:
 *           type: string
 *           example: Pérez
 *         email:
 *           type: string
 *           example: juan@example.com
 *         password:
 *           type: string
 *           example: contraseña_encriptada
 *         role:
 *           type: string
 *           enum: [user, admin]
 *         pets:
 *           type: array
 *           items:
 *             type: string
 *           example: []
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('pets');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios.' });
  }
});


export default router;
