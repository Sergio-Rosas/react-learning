import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
//import App from './App';

import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/*<App />*/}
        <StarRating maxRating={5}/>
        <StarRating maxRating={5} messages={["Awful", "Bad", "Normal", "Good", "Amazing"]} color="blue" size={24} defaultRating={5}/>
    </React.StrictMode>
);
