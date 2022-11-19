import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Score from './Components/Score/Score'
import Profile from './Components/Profile/Profile';
import Stats from './Components/Stats/Stats';
import Navbar from './Components/NavBar/Navbar';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Navbar />
  <Routes>
    <Route exact path="/" element={<App />} />
    <Route path="/score" element={<Score />} />
    <Route path="/stats" element={<Stats />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
</Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
