const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


// create user using: POST '/api/auth/createUser'. Dosen't require auth
router.post('/createUser', [
    body('email', 'Enter valid Email').isEmail(),
    body('name', 'Enter valid Name').isLength({ min: 3 }),
    body('password', 'Enter valid Password').isLength({ min: 5 }),

], async (req, res) => {

    // If errors return bad request and erros 
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // check weather the user with same email exit already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Email Already Exists" })
        }
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        })

        res.json(user)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")

    }

})

module.exports = router