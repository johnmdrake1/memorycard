//src/components/GameResults.js
//Import React
import React, { useEffect, useState } from 'react';
//Import useLocation hook from React Router to read navigation state
import { useLocation } from 'react-router-dom';
//Import Row, Col, Card from React Bootstrap
import { Row, Col, Card } from 'react-bootstrap';
//import my openai function
import { fetchGameData } from '../openai';

//Game Results function component for displaying retrieved game info
function GameResults() {
    //Access the state passed from GameForm
    const location = useLocation();
    //Destructure this state to get inputted game and level, or default to dummy data "User Game"/"User Level"
    const { gameName, level } = location.state || { gameName: 'User Game', level: 'User Level' };

    //Local state to store the data from OpenAI
    const [recap, setRecap] = useState('');
    const [objective, setObjective] = useState('');
    const [controls, setControls] = useState('');

    //useEffect to trigger the API call once on mount, (API hasn't been called as of the time GameResults loads)
    useEffect(() => {
        async function getData() {
            //fetch data from OpenAI API
            const data = await fetchGameData(gameName, level);
            setRecap(data.recap);
            setObjective(data.objective);
            setControls(data.controls);
        }
        getData();
    }, [gameName, level]);

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
            {/* A heading for the game recap, which is called a "Memory Card" for now */}
            <h2 className='text-center mb-4' style={{ color: '#00ff00', fontFamily: 'monospace' }}>
                Your Memory Card for <strong>{gameName}</strong>
            </h2>

            {/* Inform the user of the game name and level info is being displayed for */}
            <p className='text-center' style={{ color: '#ffff00', fontWeight: 'bold' }}>
                Here is everything you need to start playing <strong>{gameName}</strong> at <strong>{level}</strong>!
            </p>

            {/* Use Bootstrap row to show 3 cards side by side (on larger screens) with one for each category of catchup */}
            <Row>
                {/* First card: Recap/"the story so far" */}
                <Col md={4}>
                    <Card className='mb-3 border-0 shadow-sm' style={{ backgroundColor: '#1a1a1a', color: '#00ff00' }}>
                        <Card.Body>
                            <Card.Title>The story so far</Card.Title>
                            <Card.Text>
                                {recap}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Second card: Current Objective at current level  */}
                <Col md={4}>
                    <Card className='mb-3 border-0 shadow-sm' style={{ backgroundColor: '#1a1a1a', color: '#00ff00' }}>
                        <Card.Body>
                            <Card.Title>Where you're at, and what's next</Card.Title>
                            <Card.Text>
                                {objective}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Third Card: everything you need to remember about the controls and mechanics... */}
                <Col md={4}>
                    <Card className='mb-3 border-0 shadow-sm' style={{ backgroundColor: '#1a1a1a', color: '#00ff00' }}>
                        <Card.Body>
                            <Card.Title>Controls &amp; Mechanics</Card.Title>
                            <Card.Text>
                                {controls}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );

    
}

//Export the GameResults component
export default GameResults;