import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../user/UserContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DiaryEntries from "../components/Entries";

export default function Dashboard() {
  const { user, isLoggedIn } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(3);
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const userId = user.id;
  
  useEffect(() => {
    if (isLoggedIn) {
      fetchEntries();
    }
  }, [isLoggedIn]);

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
      const newEntry = { title, content, mood, userId};
      const response = await axios.post('/api/diary-entries/new', newEntry);
      console.log("New entry created:", response.data);
      console.log("new post userid:",userId);
      fetchEntries(); // Refresh entries
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
    <div className="bg-darkBabyBlue rounded-2xl p-4 mt-4 shadow-lg">
          <p className="text-lg font-bold">Welcome, {user.name}!</p>
          <p className="text-lg font-bold">Welcome, {user.id}!</p>
          <p className="text-left">Let's get you started. This small web-app is all about you and your journey. This personal diary is about you. Write short or lenthy posts about your day, special events and rate your mood that day with different emojis.</p>
    </div>
    <form className="p-4 bg-paleLilac rounded-2xl mt-4" onSubmit={handleSubmit}>
    <div>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-primary p-2 rounded-lg"
        />
      </label>
    </div>
    <div>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="bg-primary p-2 rounded-lg"
        />
      </label>
    </div>
    <div>
      <label>
        Mood:
        <select
          value={mood}
          onChange={(e) => setMood(Number(e.target.value))}
          className="bg-primary p-2 rounded-lg"
        >
          <option value={1}>😞</option>
          <option value={2}>😕</option>
          <option value={3}>😐</option>
          <option value={4}>😊</option>
          <option value={5}>😁</option>
        </select>
      </label>
      <input className="bg-secondary text-primary p-2 rounded-lg" value={userId} placeholder={userId} />
    </div>
    <button className="bg-secondary text-primary p-2 rounded-lg" type="submit">Save Entry</button>
  </form>
  <DiaryEntries entries={entries} onDelete={handleDelete} />
  </>
);
}