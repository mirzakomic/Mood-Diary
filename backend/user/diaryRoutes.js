// src/routes/diaryEntryRoutes.js
import express from 'express';
import DiaryEntry from '../models/diaryEntry.js';
import { authenticateToken } from '../user/authToken.js';

const router = express.Router();

// Create a new diary entry
router.post('/new', authenticateToken, async (req, res) => {
  const { title, content, mood, userId, location, date, weather } = req.body;
  try {
    const newEntry = new DiaryEntry({
      userId,
      title,
      content,
      mood,
      location,
      date,
      weather
    });

    await newEntry.save();
    res.status(201).send(newEntry);
    // console.log("new post user id is:", userId);
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

// Get average mood for entries from the past 30 days for the logged-in user
router.get('/average-mood', authenticateToken, async (req, res) => {
  console.log('Request received to /average-mood');
  try {
    console.log('Request received to /average-mood');

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    console.log('Fetching entries since:', thirtyDaysAgo);

    const entries = await DiaryEntry.find({
      userId: req.user.id,
      date: { $gte: thirtyDaysAgo }
    });
    const moodValues = entries.map(entry => entry.mood);
    moodValues.sort((a, b) => a - b);

    let medianMood;
    const n = moodValues.length;

    if (n === 0) {
      medianMood = 0; // Default median mood if no entries
    } else if (n % 2 === 1) {
      medianMood = moodValues[Math.floor(n / 2)]; // Median for odd number of entries
    } else {
      medianMood = (moodValues[n / 2 - 1] + moodValues[n / 2]) / 2; // Median for even number of entries
    }

    res.status(200).send({ medianMood });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//     console.log('Entries fetched:', entries.length);

//     if (entries.length === 0) {
//       console.log('No entries found in the past 30 days');
//       return res.status(404).send({ error: 'No entries found in the past 30 days' });
//     }

//     let totalMoodValue = 0;
//     entries.forEach(entry => {
//       switch (entry.mood) {
//         case 1: totalMoodValue += -2; break; 
//         case 2: totalMoodValue += -1; break;
//         case 3: totalMoodValue += 0; break; 
//         case 4: totalMoodValue += 1; break; 
//         case 5: totalMoodValue += 2; break; 
//         default: break;
//       }
//     });

//     const averageMood = totalMoodValue / entries.length;
//     console.log('Average mood calculated:', averageMood);

//     res.status(200).send({ averageMood });
//   } catch (error) {
//     console.error('Error fetching average mood:', error);
//     res.status(500).send({ error: error.message });
//   }
// });

// Get a single diary entry by ID for the logged-in user
router.get('/:id', authenticateToken, async (req, res) => {
  console.log('Request received to /:id');
  try {
    const entry = await DiaryEntry.findOne({ _id: req.params.id, userId: req.user.id });
    if (!entry) {
      return res.status(404).send({ error: 'Entry not found' });
    }
    res.status(200).send(entry);
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