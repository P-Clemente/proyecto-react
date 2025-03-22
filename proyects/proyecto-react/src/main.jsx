import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './components/App';
import { Delete } from './components/Delete';
import { Users } from './components/Users';
import { Update } from './components/Update';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Router>
    <Routes>
      <Route path="/" element = {<App/>}/>
      <Route path="/delete" element={<Delete/>}/>
      <Route path="/users" element={<Users/>}/>
      <Route path="/update" element={<Update/>}/>
    </Routes>
  </Router>
)
