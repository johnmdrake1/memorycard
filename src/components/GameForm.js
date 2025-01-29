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

    //handler for submission of game and level
    const handleSubmit = (e) => {
        e.preventDefault();
        //Simulate an API call for now, then navigate to /results page
        navigate('/results', { state: { gameName, level } });
    };

    return (
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
                <Col xs={12} md={6}>
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
                <Col xs={12} md={6}>
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
            </Row>

            {/* Submit button to trigger handleSubmit */}
            <Button variant='warning' type='submit' className='w-100' style={{ color: '#000', backgroundColor: '#ff0', fontWeight: 'bold' }}>
                Submit
            </Button>
        </Form>
    )
}

// Export the GameForm component
export default GameForm;