/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const fetchUser = require('../Middleware/fetchUser');
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

//route 1 : get all the notes. endpoint api/notes/fetchnotes 
router.get('/fetchnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");

    }
})

//route 2 : add new notes using POST. endpoint api/notes/addnotes
router.post('/addnotes', fetchUser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "Description must be at least 6 characters").isLength({ min: 6 })], async (req, res) => {

        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");

        }
    })

//route 3 : updating an existing note using PUT . endpoint api/notes/updatenote

router.put('/updatenote/:id', fetchUser, async (req, res) => {

    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) {
            newNote.title = title;
        }

        if (description) {
            newNote.description = description;
        }

        if (tag) {
            newNote.tag = tag;
        }
        // find the note and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//route 4 : deleting an existing note using DELETE . endpoint api/notes/deletenote

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // find the note and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        //allow deleting only if the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been Successfully Deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router