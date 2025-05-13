//src/components/ResultsSingle.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { fetchGameData } from '../openai';
import ResultCard from './ResultCard';
import loaderGif from '../assets/loader.gif';

//ready to go loader gif in an img
const loaderImg = (
    <img
      src={loaderGif}
      alt="Loading..."
      style={{
        display: 'block',
        margin: '2rem auto',
        width: '90%',
        maxWidth: '192px',
        height: 'auto',
      }}
    />
);

function ResultsSingle() {
    //Get state from navigation
    const location = useLocation();
    const navigate = useNavigate();
    const { gameName, level, recapOption } = location.state || { gameName: 'User Game', level: 'User Level', recapOption: 'Story'};

    //Local state for API data
    const [data, setData] = useState({ recap: '', objective: '', controls: '' });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const fetchedData = await fetchGameData(gameName, level, recapOption);
            setData(fetchedData);
            setLoading(false);
        }
        getData();
    }, [gameName, level, recapOption]);

    //Determine which category to display based on recapOption
    let cardTitle = "";
    let cardContent = "";
    if (recapOption === "Story") {
        cardTitle = "Story Recap";
        cardContent = data.recap;
    } else if (recapOption === "Objective") {
        cardTitle = "Current Objective";
        cardContent = data.objective;
    } else if (recapOption === "Controls and Mechanics") {
        cardTitle = "Controls and Mechanics";
        cardContent = data.controls;
    } else {
        //Fallback to "Everything" if needed, but this should never be reached
        cardTitle = "Story Recap";
        cardContent = data.recap;
    }

    return (
        <div
            className='p-4 rounded shadow'
            style={{
                maxWidth: '900px',
                margin: '0 auto',
                backgroundColor: '#200020',
                border: '2px solid #ff00ff'
            }}
        >
            <h2 className='text-center mb-4' style={{ color:'#00ff00', fontFamily: 'monospace' }}>
                {gameName} - {cardTitle}
            </h2>
            <ResultCard title={cardTitle} content={loading ? loaderImg : cardContent} />
            {/* Add a Back button to return to the multi-card view */}
            <div className='text-center mt-3'>
                <Button variant='warning' onClick={() => navigate('/results', { state: { gameName, level, recapOption: "Everything" } })}>
                    Back to All Categories
                </Button>
            </div>
        </div>
    );
}

export default ResultsSingle;
