import React from 'react';
import './globals.css';

import Header from './components/Header';
import Uploader from './components/Uploader';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <Uploader />
    </div>
  );
}

export default App;
