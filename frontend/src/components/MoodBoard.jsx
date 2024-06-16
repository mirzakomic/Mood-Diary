import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MoodBoard = () => {
  const [averageMood, setAverageMood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAverageMood = async () => {
      try {
        const response = await axios.get('/api/diary-entries/average-mood');
        setAverageMood(response.data.averageMood);
        console.log("something arrived from moods");
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data : { error: 'An error occurred' });
        setLoading(false);
        console.log("fehler bei moods");
      }
    };

    fetchAverageMood();
  }, []);

  if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.error}</div>;

  let moodEmoji;
  if (averageMood < -1) {
    moodEmoji = '😞'; // Very negative
  } else if (averageMood >= -1 && averageMood < 3) {
    moodEmoji = '😕'; // Negative
  } else if (averageMood <= 0 && averageMood < 5) {
    moodEmoji = '😐'; // Neutral
  } else if (averageMood > 5 && averageMood <= 10) {
    moodEmoji = '😊'; // Positive
  } else {
    moodEmoji = '😁'; // Very positive
  }

  return (
    <div>
      <h1>Mood Board</h1>
      <p>Average Mood: {moodEmoji}</p>
      <p>Average Mood Value: {averageMood}</p>
    </div>
  );
};

export default MoodBoard;