import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from './store';
import { createNote } from './store/notesSlice';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor';
import './App.css';

const AppContent: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCreateNote = () => {
      dispatch(createNote());
    };

    window.addEventListener('createNote', handleCreateNote);
    return () => window.removeEventListener('createNote', handleCreateNote);
  }, [dispatch]);

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <NoteEditor />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;