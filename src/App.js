import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Filemap from './components/Filemap';
import FileState from './context/filestate';
import Verify from './components/Verify';


import {
  BrowserRouter,
  Route,  
  Routes
} from "react-router-dom";
import View from './components/View';

function App() {

  const [permit, setpermit] = useState(false);

  function handler (event) {
    setpermit(false);
  }

  document.addEventListener('click', handler);
  return (
    <>

    <FileState>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Filemap key="account" permit={permit} setpermit={setpermit}/>}></Route>
          <Route exact path='/login' element={<Verify go="login" key="login"/>}></Route>
          <Route exact path='/sign' element={<Verify go="sign" key="signup"/>}></Route>
          <Route exact path='/view' element={<View key="pdfView"/>}></Route>
        </Routes>
      </BrowserRouter>
    </FileState>
    </>
  );
}

export default App;
