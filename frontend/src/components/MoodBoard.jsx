// src/components/MoodBoard.js
import React, { useContext } from 'react';
import { DiaryContext } from '../providers/DiaryProvider';
import Loader from './Loader';

const MoodBoard = () => {
  const { medianMood } = useContext(DiaryContext);

  if (medianMood === null) return <Loader />;
  if (medianMood === 0) return <div>No mood data available</div>;

  let moodEmoji;
  if (medianMood === 1) {
    moodEmoji = '😞'; // Very negative
  } else if (medianMood === 2) {
    moodEmoji = '😕'; // Negative
  } else if (medianMood === 3) {
    moodEmoji = '😐'; // Neutral
  } else if (medianMood === 4) {
    moodEmoji = '😊'; // Positive
  } else if (medianMood === 5) {
    moodEmoji = '😁'; // Very positive
  }

  return (
    <div className='p-10 flex rounded-3xl w-1/2 justify-center'>
      <p className='text-8xl relative'>{moodEmoji}</p>
      <p className='text-8xl blur-2xl absolute'>{moodEmoji}</p>
      <p>{medianMood}</p>
    </div>
  );
};

export default MoodBoard;