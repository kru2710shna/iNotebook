const express = require('express');
const router = express.Router();
var fetchUser = require('../middleware/fetchUser');
const Notes = require('../Models/Notes')
const { body, validationResult } = require('express-validator');

// Route1: Get all the notes: POST '/api/notes/fetchallnotes'.Login required

router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)

    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")

    }
})


// Route2: Add a new note: POST '/api/notes/addNotes'.Login required
router.post('/addNotes', fetchUser, [
    body('title', 'Enter valid Title').isLength({ min: 3 }),
    body('description', 'Enter valid Description').isLength({ min: 5 }),

], async (req, res) => {

    try {
        const { title, description, tag } = req.body
        // If errors return bad request and erros 
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savenote = await note.save()
        res.json(savenote)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")

    }
})

module.exports = router 