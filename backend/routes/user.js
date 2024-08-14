const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {

    const { name, email, password, phone, profession } = req.body;

    try {

        const user = new User({ name, email, password, phone, profession });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

})

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({ message: 'Login successful', userId: user._id });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

router.get('/', async (req, res) => {

    try {

        const users = await User.find();
        res.json(users);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

router.put('/:id', async (req, res) => {

    const { name, phone, profession } = req.body;

    try {

        const user = await User.findByIdAndUpdate(req.params.id, { name, phone, profession }, { new: true });
        res.json({ message: 'User updated successfully', user });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

router.delete('/:id', async (req, res) => {

    try {

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successsfully' });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

module.exports = router;