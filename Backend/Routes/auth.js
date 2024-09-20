const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const JWD_SECRET = 'Ohmygodwhatishappeneing612'
var jwt = require('jsonwebtoken');

// Route1: create user using: POST '/api/auth/createUser'. Dosen't require auth
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

        const salt = await bcrypt.genSaltSync(10);
        const securePassword = await bcrypt.hash(req.body.password, salt)
        // Create New User 
        user = await User.create({
            name: req.body.name,
            password: securePassword,
            email: req.body.email
        })

        const data = {
            id: user.id
        }
        const authtoken = jwt.sign(data, JWD_SECRET);

        res.json({ authtoken })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
})

// Route2: authenticate the user using: POST '/api/auth/login'. Dosen't require auth
router.post('/login', [
    body('email', 'Enter valid Email').isEmail(),
    body('password', 'Password Cannot be Blank').exists(),
], async (req, res) => {

    // If errors return bad request and errors 
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Try to login with correct Credentials ' })
        }
        const passwordcompre = await bcrypt.compare(password, user.password)
        if (!passwordcompre) {
            return res.status(404).json({ error: 'Try to login with correct Credentials ' })

        }

        const data = {
            id: user.id
        }
        const authtoken = jwt.sign(data, JWD_SECRET);
        res.json({ authtoken })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")

    }
})

// Route3: Get Logged In user details: POST '/api/auth/getuser'.Login required
router.post('/getUser', fetchUser, async (req, res) => {

    try {
        userId = ""
        const user = User.findById(userId).select("-password")
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")

    }
})
module.exports = router