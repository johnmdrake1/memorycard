//src/components/GameResults.js
//Import React
import React from 'react';
//Import useLocation hook from React Router to read navigation state
import { useLocation } from 'react-router-dom';
//Import Row, Col, Card from React Bootstrap
import { Row, Col, Card } from 'react-bootstrap';

//Game Results function component for displaying retrieved game info
function GameResults() {
    //Access the state passed from GameForm
    const location = useLocation();
    //Destructure this state to get inputted game and level, or default to dummy data "User Game"/"User Level"
    const { gameName, level } = location.state || {gameName: 'User Game', level: 'User Level'};

    
}