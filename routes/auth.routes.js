const { Router } = require('express');
const router = Router();
const User = require('../models/user.model');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', [
        check('name', 'Name length must be greather than 1').isLength(2),
        check('email', 'Email is incorrect or already exists').isLength(2).isEmail(),
        check('password', 'Password length must be greather than 7').isLength(8)
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);

        const emailExits = await User.findOne({ email: req.body.email });
        if (emailExits) return res.status(400).send('Email already exists');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({ 
            name: req.body.name, 
            email: req.body.email, 
            password: hashedPassword
        });

        try {
            const savedUser = await user.save();
            res.status(201).send({ name: savedUser.name });
        } catch (e) {
            res.status(400).send(e);
        };
});

router.post('/login', [
        check('email').isLength(2).isEmail(),
        check('password').isLength(8)
    ], async (req, res) => {
        console.log(req.session)
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json(errors)

        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(403).json('Incorrect data')
        }

        req.session.user = {
            email: user.email,
            name: user.name,
            id: user._id
        }

        req.session.save(() => {
            console.log('g');
        })

        res.cookie('sessionID', req.sessionID, { maxAge: 1000 * 60 * 60 * 24 * 31, httpOnly: true });

        const token = jwt.sign({ email: user.email }, process.env.SECRET, { expiresIn: '31d' });

        res.json(token);
});

router.post('/me', (req, res) => {
    console.log(req.cookies)
    console.log(req.sessionID)
    if (req.sessionID === req.cookies.sessionID) {
        res.json({ user: req.session.user })
    } else {
        res.json('You are not authorized')
    }
})

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ msg: err })

        res.clearCookie('session-express')
    })
})

module.exports = router;