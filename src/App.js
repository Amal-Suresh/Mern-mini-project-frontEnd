import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import User from './Routes/User';
import Admin from './Routes/Admin'
import { Toaster } from 'react-hot-toast';


function App() {
  console.log('data is entering into the main js');
  return (
    <div className="App">

    
      <Router>
        <Toaster
          position="top-center"
          reverseOrder={true}
          />
        <Routes>
          <Route path="/*" element={<User />} />
          <Route path='/admin/*' element={<Admin />} />
        </Routes>
      </Router>
   


    </div>
  );
}

export default App;
