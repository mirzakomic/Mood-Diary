// src/routes/diaryEntryRoutes.js
import express from 'express';
import DiaryEntry from '../models/diaryEntry.js';
import { authenticateToken } from '../user/authToken.js';

const router = express.Router();

// Create a new diary entry
router.post('/new', authenticateToken, async (req, res) => {
  const { title, content, mood, userId } = req.body;
  try {
    const newEntry = new DiaryEntry({
      userId,
      title,
      content,
      mood
    });

    await newEntry.save();
    res.status(201).send(newEntry);
    console.log("new post user id is:", userId);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all diary entries for the logged-in user
router.get('/all', authenticateToken, async (req, res) => {
  try {
    const entries = await DiaryEntry.find({ userId: req.user.id });
    res.status(200).send(entries);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete a diary entry by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const entry = await DiaryEntry.findById(id);
    if (!entry) {
      return res.status(404).send({ error: 'Diary entry not found' });
    }
    if (entry.userId.toString() !== req.user.id) {
      return res.status(403).send({ error: 'Unauthorized to delete this entry' });
    }
    await DiaryEntry.findByIdAndDelete(id);
    res.status(200).send({ message: 'Diary entry deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;