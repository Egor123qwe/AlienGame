import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(process.env.PUBLIC_URL)
root.render(
    <HashRouter>
        <App />
    </HashRouter>

);


reportWebVitals();
