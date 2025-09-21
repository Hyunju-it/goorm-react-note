import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import NoteEditor from './components/NoteEditor';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Sidebar />
        <MainContent />
        <NoteEditor />
      </div>
    </Provider>
  );
};

export default App;