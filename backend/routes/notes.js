const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

//ROUTE 1 : Get all the notes using get "/api/notes/fetchallnotes" Login Required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//ROUTE 2 : Create notes using get "/api/notes/addnotes" for a user login required
router.post(
  '/addnotes',
  fetchUser,
  [
    //validations of email, name, password
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Enter a description of min length 5').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    try {
      //If error return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        const notes = new Notes({
          title,
          description,
          tag,
          user: req.user.id,
        });
        const saveNotes = await notes.save();
        res.json(saveNotes);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
);

//ROUTE 3 : Update notes using get "api/notes/updatenote:id" for a user: login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    //create a newNote object
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

    //Find the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send('Not found');
    } else if (note.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed');
    } else {
      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(note);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//ROUTE 4 : Delete a exsisting notes using get "api/notes/deletenote:id" for a user: login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
  try {
    //Find the note to be delete and then delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send('Not found');
    } else if (note.user.toString() !== req.user.id) {
      //Allow deletion if user owns this note
      return res.status(401).send('Not Allowed');
    } else {
      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({ Sucess: 'Note has been deleted', note });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
