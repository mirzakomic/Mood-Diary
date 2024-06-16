import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../user/UserContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DiaryEntries from "../components/Entries";

const Diary = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn } = useContext(UserContext);
    const [entries, setEntries] = useState([]);
    const [fetcher, setFetcher] = useState(false);

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

    return (
        <>
        <DiaryEntries entries={entries}/>
        </>
      );
}
 
export default Diary;