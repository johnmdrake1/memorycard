// import logo from './logo.svg';
import './App.css';
//added imports
//Import React so components can be created
import React from 'react';
//Import React Router for routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Import custom NavigationBar component
import NavigationBar from './components/NavigationBar';
//Import custom GameForm component
import GameForm from './components/GameForm';
//Import custom GameForm component
import GameResults from './components/GameResults';
//Import Single page results component
import ResultsSingle from './components/ResultsSingle'

//Main App component
function App() {
  return (
    //background color, a dark bluish vibe
    <div style={{ backgroundColor: '#202040', minHeight: '100vh'}}>
      {/* Use the React Router to manage multiple pages */}
      <Router>
        {/* Render custom Navigation Bar Component(always shown on all pages) */}
        <NavigationBar />

        {/* Container for page content with Bootstrap margin-top */}
        <div className='container mt-4'>
          {/* Define the application routes  */}
          <Routes>
            {/* Route for the home/form screen  */}
            <Route path='/' element={<GameForm />} />

            {/* Route for the results screen */}
            <Route path='/results' element={<GameResults />} />

            {/* Route for the single category results page... */}
            <Route path='/results-single' element={<ResultsSingle />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

//Export the main App component
export default App;
