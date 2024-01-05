import React from 'react';
import './globals.css';

import Header from './components/Header';
import MainPage from './pages/main';
import ResultPage from './pages/result';

function App() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-50 font-mono'>
      <Header />
      {<MainPage />}
      {/* <ResultPage /> */}
    </div>
  );
}

export default App;