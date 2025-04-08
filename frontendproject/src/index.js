import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import Context from './components/Context/Context';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
     <BrowserRouter>
     <Context>
     <App />
     <ToastContainer />
     </Context>
  </BrowserRouter>
);
