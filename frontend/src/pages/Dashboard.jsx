import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../user/UserContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DiaryEntries from "../components/Entries";
import SaveIcon from "../assets/img/save_icon.svg"
import MoodBoard from "../components/MoodBoard";

export default function Dashboard() {
  const { user, isLoggedIn } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [weather, setWeather] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [fetcher, setFetcher] = useState(false);
  const userId = user.id;
  
  useEffect(() => {
    if (isLoggedIn) {
      fetchEntries();
    }
  }, [isLoggedIn, fetcher ]);

  const fetchEntries = async () => {
    try {
      const response = await axios.get('/api/diary-entries/all');
      setEntries(response.data);
      console.log("fetch", entries);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.id);
    try {
      const newEntry = { title, content, mood, userId, weather, location};
      const response = await axios.post('/api/diary-entries/new', newEntry);
      console.log("New entry created:", response.data);
      console.log("new post userid:",userId);
      fetchEntries(); // Refresh entries
      setFetcher(prevFetcher => !prevFetcher);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error('Error creating new entry:', error.response.data);
      } else {
        console.error('Error creating new entry:', error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/diary-entries/${id}`);
      setEntries(entries.filter(entry => entry._id !== id));
    } catch (error) {
      console.error('Failed to delete diary entry', error);
    }
  };

  return (
    <>
    <div className="bg-tertiary rounded-2xl p-6 mt-4 shadow-lg font-poppinsRegular">
          <p className="text-lg font-bold">Welcome, {user.name}!</p>
          <p className="text-lg font-bold">Welcome, {user.id}!</p>
<MoodBoard/>
    </div>
    <form className="p-6 bg-paleLilac rounded-2xl mt-4 flex-nowrap text-2xl w-full" onSubmit={handleSubmit}>
    <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-primary p-6 rounded-2xl font-poppinsBold w-full"
          placeholder="Title"
        />
    </div>
    <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="bg-primary p-6 rounded-2xl w-full"
          placeholder="Start writing your diary entry here ..."
        />

    </div>
    <div className="flex gap-10 items-center justify-between flex-wrap">
    <div className="flex space-x-4 mt-2">
              {[1, 2, 3, 4, 5].map(value => (
                <label key={value} className="cursor-pointer">
                  <input
                    type="radio"
                    value={value}
                    checked={mood === value}
                    onChange={() => setMood(value)}
                    className="hidden"
                  />
                  <span className={`p-2 text-2xl ${mood === value ? 'bg-lightBabyBlue transition-all text-white rounded-full' : ''}`}>
                    {['😞', '😕', '😐', '😊', '😁'][value - 1]}
                  </span>
                </label>
              ))}
            </div>
            -
            <div className="weather-selector flex space-x-4 mt-2">
              {['sunny', 'cloudy', 'rainy', 'snowy', 'stormy'].map(value => (
                <label key={value} className="cursor-pointer">
                  <input
                    type="radio"
                    value={value}
                    checked={weather === value}
                    onChange={() => setWeather(value)}
                    className="hidden"
                  />
                  <span className={`p-2 text-2xl ${weather === value ? 'bg-lightBabyBlue text-white rounded-full' : ''}`}>
                    {value === 'sunny' && '☀️'}
                    {value === 'cloudy' && '☁️'}
                    {value === 'rainy' && '🌧️'}
                    {value === 'snowy' && '❄️'}
                    {value === 'stormy' && '🌩️'}
                  </span>
                </label>
              ))}
            </div>
            -
            <div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="bg-primary p-2 rounded-lg w-full"
              placeholder="📍 Location"
            />
        </div>
            </div>
    <button className="flex gap-2 m-auto items-center bg-secondary hover:bg-darkBabyBlue text-primary py-4 px-4 mt-4 rounded-2xl font-bold capitalize" type="submit"><img className="w-8 h-8" src={SaveIcon}/>SAVE</button>
  </form>
  <DiaryEntries entries={entries} />
  </>
);
}