import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAllNotes } from './utils/local-data';
import Header from './components/Header';
import NoteInput from './pages/NoteInput';
import MainPage from './pages/MainPage';
import NotePage from './pages/NotePage';

function App() {
  const [notes, setNotes] = useState(getAllNotes());

  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage note={notes} type="active" />} />
          <Route path="/archives" element={<MainPage note={notes} type="archived" />} />
          <Route path="/notes/new" element={<NoteInput setNotes={setNotes} />} />
          <Route path="/notes/:name" element={<NotePage notes={notes} setNotes={setNotes} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
