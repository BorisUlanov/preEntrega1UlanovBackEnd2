import { Router } from 'express';
import User from '../dao/mongo/user.dao.js';

const router = Router();

// Mostrar usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.getAll(); // llamo dao
        res.render('users', { users }); // vista
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
});

// Nuevo user
router.post('/', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const newUser = await User.create({ firstName, lastName, email, password });
        res.redirect('/users');
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
});

export default router;