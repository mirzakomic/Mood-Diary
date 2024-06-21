import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../providers/UserContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DiaryEntries from "../components/Entries";
import Button from "../components/Button";

const Diary = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn } = useContext(UserContext);
    const [entries, setEntries] = useState([]);
    const [fetcher, setFetcher] = useState(false);
    const [maxEntriesToShow, setMaxEntriesToShow] = useState(6); // Initial number of entries to show
    const [selectedMood, setSelectedMood] = useState(null); // State to hold selected mood filter
    const handleMoodFilter = (mood) => {
      setSelectedMood(mood === selectedMood ? null : mood); // Toggle selected mood filter
  };

  const loadBtnRef = React.createRef();

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

      const loadMoreEntries = () => {
        setMaxEntriesToShow((prevMaxEntries) => prevMaxEntries + 6); // Increase by 6 entries
          };

          useEffect(() => {
            if (loadBtnRef.current) {
              loadBtnRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, [maxEntriesToShow]);

    return (
        <div className="space-y-6">
        <div className="flex justify-center mt-4 gap-1">
                <Button onClick={() =>handleMoodFilter(1)} size='big' shape='round' variant={selectedMood === 1 ? "secondary" : "primary"}>😞</Button>
                <Button onClick={() =>handleMoodFilter(2)} size='big' shape='round' variant={selectedMood === 2 ? "secondary" : "primary"}>😕</Button>
                <Button onClick={() =>handleMoodFilter(3)} size='big' shape='round' variant={selectedMood === 3 ? "secondary" : "primary"}>😐</Button>
                <Button onClick={() =>handleMoodFilter(4)} size='big' shape='round' variant={selectedMood === 4 ? "secondary" : "primary"}>😊</Button>
                <Button onClick={() =>handleMoodFilter(5)} size='big' shape='round' variant={selectedMood === 5 ? "secondary" : "primary"}>😁</Button>
            </div>
        <DiaryEntries entries={entries} maxEntriesShown={maxEntriesToShow} selectedMood={selectedMood}/>
        <Button size={'big'} onClick={loadMoreEntries}>Load more</Button>
        <div ref={loadBtnRef} />
        </div>
      );
}
 
export default Diary;