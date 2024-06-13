import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from './Button.jsx';

const DiaryEntries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const { data } = await axios.get('/api/diary-entries/all');
        setEntries(data);
      } catch (error) {
        console.error('Failed to fetch diary entries', error);
      }
    };

    fetchEntries();
  }, []);

  const deleteEntry = async (id) => {
    try {
      await axios.delete(`/api/diary-entries/${id}`);
      console.log("clicked delete");
      setEntries(entries.filter(entry => entry._id !== id));
      console.log("deleted?");
    } catch (error) {
      console.error('Failed to delete diary entry', error);
    }
  };

  return (
    <>
      <h1>Your Diary Entries</h1>
    <div className='flex flex-wrap justify-center gap-6 max-w-5xl h-auto m-auto mt-4'>
      {entries.map((entry) => (
        <div className='bg-lightBabyBlue min-w-72 rounded-2xl text-left' key={entry._id}>
          <h2 className='font-bold text-xl'>{entry.title}</h2>
          <p>{entry.content}</p>
          <p className='bg-darkBabyBlue text-secondary py-2'>Mood: {['😞', '😕', '😐', '😊', '😁'][entry.mood - 1]}</p>
          <p>{new Date(entry.date).toLocaleString()}</p>
              <Button variant="primary" size="small" shape="round" onClick={() => onDelete(entry._id)}>
              🗑️
            </Button>
        </div>
      ))}
    </div>
    </>
  );
};


export default DiaryEntries;