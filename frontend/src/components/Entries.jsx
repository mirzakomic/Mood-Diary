import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from './Button.jsx';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const DiaryEntries = () => {
  const [entries, setEntries] = useState([]);
  const slicedEntries = entries.slice(-6);
  const [open, setOpen] = useState(false);
  const weatherIcons = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '🌧️',
    snowy: '❄️',
    stormy: '⛈️'
  };

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

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

  return (
    <div className='font-poppinsRegular'>
      <h1 className='mt-8 text-3xl font-poppinsBold uppercase'>Your recent entries</h1>
    <div className='flex flex-wrap justify-center gap-10 max-w-6xl h-auto m-auto mt-8'>
      {slicedEntries.map((entry) => (
        <div className='bg-tertiary min-w-80 max-w-80 rounded-2xl text-left p-4 relative hover:scale-105 hover:transition-all transition-all' key={entry._id}>
          <h2 className='font-poppinsBold text-2xl'> {truncateText(entry.title, 45)}</h2>
          <div className='border-b-2 border-dashed pt-2 border-paleLilac'/>
          <p className='pt-4 leading-6 text-justify'> {truncateText(entry.content, 200)}</p>
          <p className='text-secondary text-4xl w-10 h-10 absolute -top-[10px] -right-[20px]'>{['😞', '😕', '😐', '😊', '😁'][entry.mood - 1]}</p>
          <p className='text-secondary text-4xl w-20 h-20 absolute -top-[10px] -right-[60px] blur-xl'>{['😞', '😕', '😐', '😊', '😁'][entry.mood - 1]}</p>
          <div className='flex gap-2 mt-5 mb-5 p-2 rounded-2xl border-dashed border-paleLilac border-2'>
          <p>{weatherIcons[entry.weather]}</p> in
          <p>{entry.location}</p>
          <p>{new Date(entry.date).toLocaleDateString()} {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
              <Button variant="bg-primary" size="small" shape="round" onClick={onOpenModal}>
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