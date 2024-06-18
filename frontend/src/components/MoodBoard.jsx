import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';

const MoodBoard = () => {
  const [medianMood, setmedianMood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchmedianMood = async () => {
      try {
        const response = await axios.get('/api/diary-entries/average-mood');
        const roundedmedianMood = Math.round(response.data.medianMood);
        setmedianMood(roundedmedianMood);
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data : { error: 'An error occurred' });
        setLoading(false);
      }
    };

    fetchmedianMood();
  }, []);

  if (loading) return <Loader/>;
  if (error) return <div>Error: {error.error}</div>;

  let moodEmoji;
  // console.log(moodEmoji, medianMood);
  if (medianMood === 1) {
    moodEmoji = '😞'; // Very negative
  } else if (medianMood === 2) {
    moodEmoji = '😕'; // Negative
  } else if (medianMood === 3) {
    moodEmoji = '😐'; // Neutral
  } else if (medianMood === 4) {
    moodEmoji = '😊'; // Positive
    console.log("works at 4");
  } else if (medianMood === 5) {
    moodEmoji = '😁'; // Very positive
  }

  return (
    <div className='p-10 flex rounded-3xl w-1/2 justify-center'>
        <p className='text-8xl relative'>{moodEmoji}</p>
        <p className='text-8xl blur-2xl absolute'>{moodEmoji}</p>
      {/* <p>Average Mood Value: {medianMood}</p> */}
    </div>
  );
};

export default MoodBoard;