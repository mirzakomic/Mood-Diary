import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../providers/UserContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DiaryEntries from "../components/Entries";
import Button from "../components/Button";

const Diary = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const { user, isLoggedIn } = useContext(UserContext);
    const [entries, setEntries] = useState([]);
    const [fetcher, setFetcher] = useState(false);
    const [maxEntriesToShow, setMaxEntriesToShow] = useState(6);
    const [selectedMood, setSelectedMood] = useState(null); 

  const handleMoodFilter = (mood) => {
    if (mood === 'all') {
      setSelectedMood(null); // Show all moods
    } else {
      setSelectedMood(mood); // Set selected mood directly
    }
  };

  const loadBtnRef = React.createRef();

    useEffect(() => {
        if (isLoggedIn) {
          fetchEntries();
        }
      }, [isLoggedIn]);
    
      const fetchEntries = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/diary-entries/all`, { withCredentials: true });
          setEntries(response.data);
          console.log("fetch", entries);
        } catch (error) {
          console.error(error);
        }
      };

      const loadMoreEntries = () => {
        setMaxEntriesToShow((prevMaxEntries) => prevMaxEntries + 6);
          };

          useEffect(() => {
            if (loadBtnRef.current) {
              loadBtnRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, [maxEntriesToShow]);

    return (
        <div className="space-y-6">
        <div className="flex justify-center mt-4 gap-3">
                <Button onClick={() =>handleMoodFilter(1)} fontSize='text-4xl' size='bigBall' shape='round' variant={selectedMood === 1 ? "secondary" : "primary"}>😞</Button>
                <Button onClick={() =>handleMoodFilter(2)} fontSize='text-4xl' size='bigBall' shape='round' variant={selectedMood === 2 ? "secondary" : "primary"}>😕</Button>
                <Button onClick={() =>handleMoodFilter(3)} fontSize='text-4xl' size='bigBall' shape='round' variant={selectedMood === 3 ? "secondary" : "primary"}>😐</Button>
                <Button onClick={() =>handleMoodFilter(4)} fontSize='text-4xl' size='bigBall' shape='round' variant={selectedMood === 4 ? "secondary" : "primary"}>😊</Button>
                <Button onClick={() =>handleMoodFilter(5)} fontSize='text-4xl' size='bigBall' shape='round' variant={selectedMood === 5 ? "secondary" : "primary"}>😁</Button>
                <Button onClick={() => handleMoodFilter('all')} fontSize='text-lg' size='big' shape='round' variant={selectedMood === null ? "secondary" : "primary"}>All</Button>
            </div>
        <DiaryEntries entries={entries} maxEntriesShown={maxEntriesToShow} selectedMood={selectedMood}/>
        <Button size={'big'} onClick={loadMoreEntries}>Load more</Button>
        <div ref={loadBtnRef} />
        </div>
      );
}
 
export default Diary;