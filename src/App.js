
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { useState } from 'react';
import './App.css';
import Login from './pages/LoginPage';
import TestPage from './pages/TestPage';
import CondidatePage from './pages/CondidatePage';
import SectionPage from './pages/SectionPage';
import Header from './components/Header'
import NotesListPage from './pages/NotesListPage'


function App() {

  const [token, setToken] = useState('');
  const userLogin = (tok) => {
    setToken(tok);
  }



  return (
      <BrowserRouter>
      <body>
        <div className="container dark">
          <div className='app'>
          {/* <Login userLogin={userLogin}/> */}
            <Routes>
              {/* <Route path="/" exact element={ <NotesListPage/> } /> */}
              <Route path="/mainPage" exact element={ <NotesListPage/> } />
              <Route path="/" exact element={ <Login/> } />
              <Route path="/condidate" exact element={ <CondidatePage/> } />
              <Route path="/section" exact element={ <SectionPage/> } />
              <Route path="/test" exact element={ <TestPage/> } />
            </Routes>
          </div>
        </div>
      </body>
        
      </BrowserRouter>
  );
}

export default App;
