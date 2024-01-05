import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";

import './globals.css';

import Header from './components/Header';
import MainPage from './pages/main';
import ResultPage from './pages/result';

function App() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-50 font-mono'>
      <Header />
      <Routes>
        <Route path='/'       element={<MainPage />} />
        <Route path='/result' element={<ResultPage />} />
        <Route path='*'       element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;