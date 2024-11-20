import { router } from 'express';
import User from '../models/user.model.js';

const router = router();

//Mostrar usuarios
router.get('/', async (req, res) => {
    const users = await User.find();
    res.render('users', { users });
});

//Nuevo
router.post('/', async (req, res) => {
    const { fristName, lastName, email, password } = req.body;
    const newUser = new User ({ firstName, lastName, email, password});
    await newUser.save();
    res.redierct('/users');//redirect me gusto mas que una ruta
});

export default router;