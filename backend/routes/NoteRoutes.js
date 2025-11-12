import express from 'express';
import Notes from '../models/Note.js';
import authMiddleware from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/add-note', authMiddleware, async (req, res) => {
  try {
    const newNote = new Notes({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      user: req.user.id,
    });

    await newNote.save();
    res.status(200).json({ success: true, note: newNote, message: "Note added successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Note not added", error: err.message });
  }
});

router.get('/get-notes', authMiddleware, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/edit-note/:id', authMiddleware, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const note = await Notes.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content, tags, updatedOn: new Date() },
      { new: true }
    );

    if (!note) return res.status(404).json({ msg: "Note not found" });
    res.json({ success: true, note });
  } catch (err) {
    res.status(500).json({ msg: "Error updating note" });
  }
});

router.delete('/delete-note/:id', authMiddleware, async (req, res) => {
  try {
    const note = await Notes.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ success: false, message: "Note not found" });
    res.json({ success: true, message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting note", error: err.message });
  }
});


export default router;
