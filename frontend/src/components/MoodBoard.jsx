// src/components/MoodBoard.js
import React, { useContext, useEffect, useState } from 'react';
import { DiaryContext } from '../providers/DiaryProvider';
import Loader from './Loader';


const MoodBoard = () => {
  const { medianMood } = useContext(DiaryContext);
  const [randomEmojis, setRandomEmojis] = useState([]);

// Function to generate random properties for emojis
useEffect(() => {
  const generateRandomEmojis = (count) => {
    return Array.from({ length: count }).map(() => ({
      top: Math.random() * 90,
      left: Math.random() * 50,
      opacity: Math.random() * 0.2 + 0.1,
      size: Math.random() * 3 * 15,
    }));
  };

  setRandomEmojis(generateRandomEmojis(30));
}, []);

  if (medianMood === null) return <Loader />;
  if (medianMood === 0) return <div>No mood data available</div>;

  let moodEmoji;
  let moodText;
  if (medianMood === 1) {
    moodEmoji = '😞'; // Very negative
    moodText = 'Feeling really down'
  } else if (medianMood === 2) {
    moodEmoji = '😕'; // Negative
        moodText = 'Feeling down'
  } else if (medianMood === 3) {
    moodEmoji = '😐'; // Neutral
        moodText = 'Mixed feelings'
  } else if (medianMood === 4) {
    moodEmoji = '😊'; // Positive
        moodText = 'Feeling good'
  } else if (medianMood === 5) {
    moodEmoji = '😁'; // Very positive
        moodText = 'Feeling awesome!'
  }


  return (
<div className='py-10 pl-10 flex rounded-3xl justify-center relative overflow-visible'>
  <div className='flex-1 flex justify-center items-center flex-col'>
    <div className='relative w-24 h-24 flex overflow-visible'>
    <p className='text-8xl relative z-10'>{moodEmoji}</p>
    <p className='text-8xl absolute top-0 left-0 blur-2xl z-0'>{moodEmoji}</p>
    </div>
    <p className='mt-2 font-poppinsBold text-2xl'>{moodText}</p>
  </div>
  <div className='border-l-2 border-primary flex-1'>
    {/* <p>{medianMood}</p> */}
    <h2 className='font-poppinsBold text-xl'>Your moodboard</h2>
    <p className='p-5 text-justify'>This moodboard displays your median mood over the past 30 days. Each time you post a new entry in your diary, the moodboard updates dynamically. The more you track your mood and general well-being, the more accurate your moodboard will be.</p>
  </div>
  {randomEmojis.map(({ top, left, opacity, size }, index) => (
          <p
            key={index}
            className='absolute overflow-clip'
            style={{
              top: `${top}%`,
              left: `${left}%`,
              opacity: opacity,
              fontSize: `${size}px`,
            }}
          >
            {moodEmoji}
          </p>
        ))}
</div>
  );
};

export default MoodBoard;