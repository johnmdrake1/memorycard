// src/components/GameForm.js
//Import React and useState
import React, { useState } from 'react';
//Import form, button, row, col components from React Bootstrap
import { Form, Button, Row, Col } from 'react-bootstrap';
//Import useNavigate from React Router to switch pages programmatically
import { useNavigate } from 'react-router-dom';

//Game form function component
function GameForm() {
    const navigate = useNavigate();
    //state and state setter for the game's name
    const [gameName, setGameName] = useState('');
    //state and state setter for the user's current level in that game
    const [level, setLevel] = useState('');
    //state and state setter for the type of recap selection, defaults to everything
    const [recapOption, setRecapOption] = useState("Everything");

    //handler for submission of game and level
    const handleSubmit = (e) => {
        e.preventDefault();
        //Navigate to results page with gameName, level, and recapOption. API will be called there.
        // navigate('/results', { state: { gameName, level, recapOption } });
        //conditional routing
        if (recapOption === "Everything") {
            navigate('/results', { state: { gameName, level, recapOption } });
        } else {
            navigate('/results-single', { state: { gameName, level, recapOption } });
        }
    };

    return (
        //Had to wrap the form in a fragment to get the h1 with the title to work(JSX elements need at least one parent element...) so if anything breaks this may be the culprit
        <>
            {/* App title  */}
            <h1 style={{ textAlign: 'center', color: '#0f0', marginBottom: '1remm' }}>
                Welcome to Memory Card!
            </h1>
            <Form
                onSubmit={handleSubmit}
                className="p-4 shadow rounded"
                style={{
                    backgroundColor: '#000',
                    border: '2px solid #00ff00',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}
            >
                {/* Bootstrap row for grouping the input fields */}
                <Row className="mb-3">
                    {/* Column for the game name input  */}
                    <Col xs={12} md={4}>
                        <Form.Group controlId="formGameName">
                            {/* Label for the first field */}
                            <Form.Label style={{ color: '#0f0' }}>Game Name</Form.Label>
                            {/* Text input for the game name */}
                            <Form.Control
                                type="text"
                                placeholder="Enter game name"
                                value={gameName}
                                onChange={(e) => setGameName(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                    {/* Column for the level/stage input */}
                    <Col xs={12} md={4}>
                        <Form.Group controlId="formLevel">
                            {/* Label for the second field */}
                            <Form.Label style={{ color: '#0f0' }}>Current Level/Stage</Form.Label>
                            {/* Text input for level/stage */}
                            <Form.Control
                                type='text'
                                placeholder='Enter level'
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                    {/* Column for type of recap selection  */}
                    <Col xs={12} md={4}>
                        <Form.Group controlId="formRecapOption">
                            <Form.Label style={{ color: '#0f0' }}>Recap:</Form.Label>
                            <Form.Control
                                as="select"
                                value={recapOption}
                                onChange={(e) => setRecapOption(e.target.value)}
                            >
                                <option>Everything</option>
                                <option>Story</option>
                                <option>Objective</option>
                                <option>Controls and Mechanics</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Submit button to trigger handleSubmit */}
                <Button variant='warning' type='submit' className='w-100' style={{ color: '#000', backgroundColor: '#ff0', fontWeight: 'bold' }}>
                    Submit
                </Button>
            </Form>
        </>
    );
}

// Export the GameForm component
export default GameForm;