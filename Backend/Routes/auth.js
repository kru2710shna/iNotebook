const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


// create user using: POST '/api/auth'. Dosen't require auth
router.post('/', [
    body('email', 'Enter valid Email').isEmail(),
    body('name', 'Enter valid Name').isLength({ min: 3 }),
    body('password', 'Enter valid Password').isLength({ min: 5 }),

], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then(user => res.json(user))
        .catch(err => console.log(err))
})

module.exports = router