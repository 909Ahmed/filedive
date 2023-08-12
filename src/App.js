import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Filemap from './components/Filemap';
import FileState from './context/filestate';
import Verify from './components/Verify';

import {
  BrowserRouter,
  Route,  
  Routes
} from "react-router-dom";

function App() {
  return (
    <>

    <FileState>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Filemap key="account"/>}></Route>
          <Route exact path='/login' element={<Verify go="login" key="login"/>}></Route>
          <Route exact path='/sign' element={<Verify go="sign" key="signup"/>}></Route>
        </Routes>
      </BrowserRouter>
    </FileState>
    </>
  );
}

export default App;
