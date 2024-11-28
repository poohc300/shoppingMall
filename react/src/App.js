import React from 'react';
import { Route, Routes } from 'react-router';
import { HashRouter, Link } from 'react-router-dom';
import StudyPages from './pages/Study/StudyPages';
import Project from './pages/Project/ProjectPage';
import Layout from './components/layout/Layout/Layout';
import './styles/App.css';

const App = () => {
  return (
    <div className='app'>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<StudyPages />} path='study' />
          </Route>
          <Route path='/project' element={<Project />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
