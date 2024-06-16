import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailEntry = ({entries}) => {
    const { id } = useParams();
    const [entry, setEntry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const weatherIcons = {
        sunny: '☀️',
        cloudy: '☁️',
        rainy: '🌧️',
        snowy: '❄️',
        stormy: '⛈️'
      };
  
    useEffect(() => {
      const fetchEntry = async () => {
        try {
          const response = await axios.get(`/api/diary-entries/${id}`);
          setEntry(response.data);
        } catch (error) {
          setError(error.response ? error.response.data : { error: 'An error occurred' });
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchEntry();
    }, [id]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.error}</div>;
    if (!entry) return <div>Entry not found</div>;
  

  return (
    <div>
      <h2 className='font-poppinsBold text-2xl'>{entry.title}</h2>
      <p>{entry.content}</p>
      <p>Mood: {['😞', '😕', '😐', '😊', '😁'][entry.mood - 1]}</p>
      <p>Weather: {weatherIcons[entry.weather]}</p>
      <p>Location: {entry.location}</p>
      <p>Date: {new Date(entry.date).toLocaleDateString()} {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
    </div>
  );
};

export default DetailEntry;