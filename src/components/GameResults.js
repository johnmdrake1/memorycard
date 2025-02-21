//src/components/GameResults.js
//Import React
import React, { useEffect, useState } from 'react';
//Import useLocation hook from React Router to read navigation state
import { useLocation, useNavigate } from 'react-router-dom';
//Import Row, Col, Card from React Bootstrap
import { Row, Col, Button } from 'react-bootstrap';
//import my openai function
import { fetchGameData } from '../openai';
//import Result Card component
import ResultCard from './ResultCard';

//Game Results function component for displaying retrieved game info
function GameResults() {
    //Access the state passed from GameForm
    const location = useLocation();
    //navigate for routing
    const navigate = useNavigate();
    //Destructure this state to get inputted game and level, or default to dummy data "User Game"/"User Level"
    const { gameName, level, recapOption } = location.state || { gameName: 'User Game', level: 'User Level', recapOption: 'Everything' };

    //Local state to store the data from OpenAI
    const [recap, setRecap] = useState('');
    const [objective, setObjective] = useState('');
    const [controls, setControls] = useState('');

    //useEffect to trigger the API call once on mount, (API hasn't been called as of the time GameResults loads)
    useEffect(() => {
        async function getData() {
            //fetch data from OpenAI API
            const data = await fetchGameData(gameName, level, recapOption);
            console.log("Data(in GameResults.js):")
            console.log(data);
            setRecap(data.recap);
            setObjective(data.objective);
            setControls(data.controls);
        }
        getData();
    }, [gameName, level, recapOption]);

    return (
        //Wrapper div
        <div
            className='p-4 rounded shadow'
            style={{
                maxWidth: '900px',
                margin: '0 auto',
                backgroundColor: '#200020',
                border: '2px solid #ff00ff'
            }}
        >
            {/* A heading for the game recap, which is no longer called a memory card */}
            <h2 className='text-center mb-4' style={{ color: '#00ff00', fontFamily: 'monospace' }}>
                Your <strong>{gameName}</strong> Recap
            </h2>

            {/* Inform the user of the game name and level info is being displayed for */}
            <p className='text-center' style={{ color: '#ffff00', fontWeight: 'bold' }}>
                Here is everything you need to start playing <strong>{gameName}</strong> again on <strong>{level}</strong>!
            </p>
            
            {/* Use Bootstrap row to show 3 cards side by side (on larger screens) with one for each category of catchup */}
            <Row>
                {/* First card: Recap/"the story so far" */}
                <Col md={4}>
                    <ResultCard title="Story Recap" content={recap} />
                    {/* The +more button  */}
                    <div className='text-center mt-2 mb-3'>
                        <Button variant="primary" onClick={() => navigate('/results-single', { state: { gameName, level, recapOption: "Story" } })}>
                            + more
                        </Button>
                    </div>
                </Col>

                {/* Second card: Current Objective at current level  */}
                <Col md={4}>
                    <ResultCard title="Current Objective" content={objective} />
                    <div className='text-center mt-2 mb-3'>
                        <Button variant="primary" onClick={() => navigate('/results-single', { state: {gameName, level, recapOption: "Objective" } })}>
                            + more
                        </Button>
                    </div>
                </Col>

                {/* Third Card: everything you need to remember about the controls and mechanics... */}
                <Col md={4}>
                    <ResultCard title="Controls and Mechanics" content={controls} />
                    <div className='text-center mt-2 mb-3'>
                        <Button variant="primary" onClick={() => navigate('/results-single', { state: { gameName, level, recapOption: "Controls and Mechanics" } })}>
                            + more
                        </Button>
                    </div>
                </Col>
            </Row>
            
        </div>
    );

    
}

//Export the GameResults component
export default GameResults;