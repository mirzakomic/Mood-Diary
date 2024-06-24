import React, { useState, useContext } from 'react';
import axios from 'axios';
import Button from './Button.jsx';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import { DiaryContext } from '../providers/DiaryProvider.jsx';

const DiaryEntries = ({maxEntriesShown, selectedMood}) => {
  const { entries, fetchEntries } = useContext(DiaryContext);
  const [open, setOpen] = useState(false);
  const [deleteEntryId, setDeleteEntryId] = useState(null);
  const [toggledEntryId, setToggledEntryId] = useState(null);
  const weatherIcons = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '🌧️',
    snowy: '❄️',
    stormy: '⛈️'
  };

  const onOpenModal = (id) => {
    setDeleteEntryId(id); // Set the entry id to delete
    setOpen(true); // Open the modal
  };

  const onCloseModal = () => {
    setDeleteEntryId(null); // Reset delete entry id
    setOpen(false); // Close the modal
  };

  const toggleDisplayMore = (id) => {
    setToggledEntryId((prevId) => (prevId === id ? null : id));
  };

  const deleteEntry = async () => {
    try {
      await axios.delete(`/api/diary-entries/${deleteEntryId}`);
      await fetchEntries(); // Re-fetch entries after deletion
      onCloseModal(); // Close modal after deletion
    } catch (error) {
      console.error('Failed to delete diary entry', error);
    }
  };

  const filterEntriesByMood = (entry) => {
    if (!selectedMood) {
        return true; // Show all entries if no mood filter selected
    }
    return entry.mood === selectedMood;
};

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const entriesToShow = maxEntriesShown ? entries.slice(-maxEntriesShown) : entries;

  return (
    <div className='font-poppinsRegular'>
      <h1 className='mt-8 text-3xl font-poppinsBold uppercase'>Your recent entries</h1>
      <div className='flex flex-wrap justify-center gap-10 max-w-6xl h-auto m-auto mt-8'>
        {entries
                    .filter(filterEntriesByMood)
                    .slice(0, maxEntriesShown)
                    .map((entry) => (
          <div key={entry._id} className='bg-tertiary min-w-80 max-w-80 rounded-2xl text-left p-4 relative hover:scale-105 hover:transition-all transition-all entry'>
            <Link to={`/entry/${entry._id}`}>
              <h2 className='font-poppinsBold text-2xl'> {truncateText(entry.title, 45)}</h2>
            </Link>
            <div className='border-b-2 border-dashed pt-2 border-paleLilac' />
            <p className='pt-4 leading-6 text-justify'> {truncateText(entry.content, 200)}</p>
            <p className='text-secondary text-4xl w-10 h-10 absolute -top-[10px] -right-[20px]'>{['😞', '😕', '😐', '😊', '😁'][entry.mood - 1]}</p>
            <p className='text-secondary text-4xl w-20 h-20 absolute -top-[10px] -right-[60px] blur-xl'>{['😞', '😕', '😐', '😊', '😁'][entry.mood - 1]}</p>
            <div className='flex gap-2 mt-5 mb-5 p-2 rounded-2xl border-dashed border-paleLilac border-2'>
              <p>{weatherIcons[entry.weather]}</p> in
              <p className='capitalize'>{entry.location}</p>
              <p>{new Date(entry.date).toLocaleDateString()} {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className='flex gap-2'>
              <Button onClick={() => toggleDisplayMore(entry._id)} variant="primary" size="small" shape="round">•••</Button>
              {toggledEntryId === entry._id && (
                <Button variant="primary" size="small" shape="round" onClick={() => onOpenModal(entry._id)}>
                  🗑️
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <h2 className='text-primary mt-10 mb-5'>Are you sure that you want to delete this entry?</h2>
        <Button variant="primary" size="big" shape="round" onClick={deleteEntry}>Yes</Button>
      </Modal>
    </div>
  );
};

export default DiaryEntries;