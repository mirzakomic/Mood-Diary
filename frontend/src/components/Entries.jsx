import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from './Button.jsx';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const DiaryEntries = () => {
  const [entries, setEntries] = useState([]);
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

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
      setOpen(false);
    } catch (error) {
      console.error('Failed to delete diary entry', error);
    }
  };

  return (
    <div className='font-poppinsRegular'>
      <h1>Your Diary Entries</h1>
    <div className='flex flex-wrap justify-center gap-6 max-w-5xl h-auto m-auto mt-4'>
      {entries.map((entry) => (
        <div className='bg-lightBabyBlue min-w-72 rounded-2xl text-left p-2' key={entry._id}>
          <h2 className='font-bold text-xl'>{entry.title}</h2>
          <p>{entry.content}</p>
          <p className='bg-darkBabyBlue text-secondary py-2'>Mood: {['😞', '😕', '😐', '😊', '😁'][entry.mood - 1]}</p>
          <p>{new Date(entry.date).toLocaleString()}</p>
              <Button variant="primary" size="small" shape="round" onClick={onOpenModal}>
              🗑️
            </Button>
      <Modal open={open} onClose={onCloseModal} center>
        <h2 className='text-primary mt-10 mb-5'>Are you sure that you want to delete this entry?</h2>
        <Button variant="secondary" size="big" shape="round" onClick={() => deleteEntry(entry._id)}>Yes</Button>
      </Modal>
        </div>
      ))}
    </div>
    </div>
  );
};


export default DiaryEntries;