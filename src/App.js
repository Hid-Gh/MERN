
import './App.css';
import HomePage from './components/homePage.component';
import Destinations from './components/destinations.component'
import {  BrowserRouter, Routes,Route} from "react-router-dom";
import MyPage from './components/myPage.component'
import Login from './components/login.component'
import Register from './components/register.component'
 import MyFlights from './components/myFlights.component'
 import PrivateRoutes from './components/PrivateRoutes';
import Payment from './components/Payment'
 import React from 'react';
function App() {

  return (
    <BrowserRouter>
    <Routes>
    
       <Route exact path="/" element={<HomePage />} />
       <Route path="/api/v1/destination" element={<Destinations />} />
       <Route path="/register" element={<Register />} />
       <Route path="/login" element={<Login />} />
       <Route element={<PrivateRoutes/>}>
          <Route path="/api/v1/destination/:id/user/:userId" element={<MyPage />} /> 
        </Route>
       <Route path="/myFlights/:id" element={<MyFlights />} />
       <Route path="/payment" element={<Payment />} />
    </Routes>
  </BrowserRouter>
  
  );
}

export default App;
