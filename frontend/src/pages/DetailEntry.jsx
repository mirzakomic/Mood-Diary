import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';

const DetailEntry = ({entries}) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const { id } = useParams();
    const [entry, setEntry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
          const response = await axios.get(`${apiUrl}/api/diary-entries/${id}`, { withCredentials: true });
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

    const goBack = () => {
        navigate(-1);
      };

  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.error}</div>;
    if (!entry) return <div>Entry not found</div>;
  

  return (
    <>
    <div className='mt-4 flex'> 
    <Button variant="primary" size="big" shape="round" onClick={goBack}>Go back</Button>
    </div>
    <div className='bg-tertiary p-8 mt-10 rounded-3xl'>
      <h2 className='font-poppinsBold text-2xl'>{entry.title}</h2>
      <p className='leading-6 text-justify mt-4'>{entry.content}</p>
      <div className='flex gap-2 mt-5 mb-5 p-2 rounded-2xl border-dashed border-paleLilac border-2'>
      <p>Feeling {['😞', '😕', '😐', '😊', '😁'][entry.mood - 1]}</p> -
      <p>{weatherIcons[entry.weather]}</p>
      <p>in {entry.location}</p>
      <p>on {new Date(entry.date).toLocaleDateString()} {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
    </div>
    </>
  );
};

export default DetailEntry;