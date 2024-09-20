const express = require('express');
const router = express.Router();
var fetchUser = require('../middleware/fetchUser');
const Notes = require('../Models/Notes')
const { body, validationResult } = require('express-validator');

// Route1: Get all the notes: GET '/api/notes/fetchallnotes'.Login required

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


// Route3: Update fields for new Note: PUT '/api/notes/updateNotes/:id'.Login required
router.put('/updateNotes/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body

    // create newNoteObj
    try {
        // Create newNoteObj
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        // Find the note to be updated
        let note = await Notes.findById(req.params.id);
        if (!note) {
            console.log(`Note with ID ${req.params.id} not found`);
            return res.status(404).send("Not Found");
        }

        console.log(`Note found: ${note}`);

        // Check if the user owns this note
        if (note.user && note.user.toString() !== req.user.id) {
            console.log(`User not authorized. Note belongs to: ${note.user}, User trying to update: ${req.user.id}`);
            return res.status(401).send("Not Authenticated");
        }

        // Update the note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }


})


// Route4: Delete fields for new Note: DELETE '/api/notes/deleteNotes/:id'.Login required
router.delete('/deleteNotes/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body

    // create newNoteObj
    try {
        // Find the note to be updated and deleted
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // allow deletion if user owns this Note

        // Check if the user owns this note
        if (note.user && note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Authenticated");
        }

        // Delete the note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ note });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
    res.json({ "Success": 'The note was deleted successfully' })



})
module.exports = router 