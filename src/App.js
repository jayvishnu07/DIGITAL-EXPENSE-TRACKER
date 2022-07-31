import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages.......
import Navbar from "./Components/Navbar/Navbar";
import Home from './Pages/Home/Home'
import Extra from './Pages/Extra/Extra'
import Contact from './Pages/Contact/Contact'
import Form from './Pages/Form/Form'

//Components..........
import PrivateRoute from "./Components/Route/PrivateRoute";
import PublicRoute from "./Components/Route/PublicRoute";
import { ProfileProvider } from "./ContextApi/profile.context";

function App() {
  return (
    <div >
      <Router>
      <ProfileProvider>        
        <Routes>
        <Route exact element={<PrivateRoute/>} >
          <Route path='/' element={<><Navbar /><Home /></>} />
          </Route>
          <Route path='*' element={<><Navbar /><Home /></>} />
          <Route path='/extra' element={<><Navbar /><Extra /></>} />
          <Route path='/contact' element={<><Navbar /><Contact /></>} />
          <Route exact element={<PublicRoute/>} >          
            <Route path="/login" exact element={<Form  />} />
          </Route>
        </Routes>
      </ProfileProvider>
      </Router>
    </div>
  );
}

export default App;
