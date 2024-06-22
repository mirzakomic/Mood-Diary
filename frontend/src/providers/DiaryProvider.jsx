import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';

export const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);
  const [entries, setEntries] = useState([]);
  const [medianMood, setMedianMood] = useState(null);

  const fetchEntries = async () => {
    try {
      const response = await axios.get('/api/diary-entries/all');
      setEntries(response.data);
      console.log("fetched");
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await axios.delete(`/api/diary-entries/${id}`);
      // Update entries state after successful deletion
      setEntries(entries.filter(entry => entry._id !== id));
    } catch (error) {
      console.error('Failed to delete diary entry', error);
    }
  };

  const fetchMedianMood = async () => {
    try {
      const response = await axios.get('/api/diary-entries/average-mood');
      setMedianMood(Math.round(response.data.medianMood));
    } catch (error) {
      console.error('Error fetching median mood:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchEntries();
      fetchMedianMood();
    }
    else {
      return;
    }
  }, [isLoggedIn]);

  return (
    <DiaryContext.Provider value={{ entries, setEntries, fetchEntries, deleteEntry, medianMood, fetchMedianMood }}>
      {children}
    </DiaryContext.Provider>
  );
};