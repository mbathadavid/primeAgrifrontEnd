import React, { useState,useEffect,useContext } from 'react';
//import { Button, Divider } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import {  BrowserRouter,  Routes, Route} from "react-router-dom";
//import LandingPage from './components/landingpage';
import AboutPage from './components/about';
import LandingPage2 from './components/land';
/* import AboutPage from './components/about';
import SignUpPage from './components/signup';
import SignInPage from './components/signin';
import MarketPage from './components/market';
import AccountHomePage from './components/accountfiles/accounthome';
import ProfilePage from './components/accountfiles/profile';
import UploadedProductsPage from './components/accountfiles/uploadeproducts';
import WeatherPage from './components/accountfiles/weatherforecast';
import MessagesPage from './components/accountfiles/inbox';
import AccountShopsPage from './components/accountfiles/accountshops';
import LandingPage2 from './components/land';
import AccountFarmSupplies from './components/accountfiles/accountfarmsupplies';
import AccountFarmProducts from './components/accountfiles/accountfarmproducts';
import AccountAgriServices from './components/accountfiles/accountagriservices';
import OneProduct from './components/accountfiles/product';
import AdminPage from './components/Admin';
import Users from './components/Users';
import Logs from './components/Logs'; */

function App() {
  return (
  /*  <BrowserRouter basename="/agri">
   <Router>
  <Route path="/" exact strict>
   <LandingPage2/>
   </Route>
   <Route path="/about" exact strict>
   <AboutPage/>
   </Route>
   <Route path="/SignUp" exact>
   <SignUpPage/>
   </Route>
   <Route path="/SignIn" exact>
   <SignInPage/>
   </Route>
   <Route path="/market" exact>
   <MarketPage/>
   </Route>
   <Route path="/accounthome" exact>
   <AccountHomePage/>
   </Route>
   <Route path="/profile" exact>
   <ProfilePage/>
   </Route>
   <Route path="/weather" exact>
   <WeatherPage/>
   </Route>
   <Route path="/uploadedproducts" exact>
   <UploadedProductsPage/>
   </Route>
   <Route path="/messages" exact>
   <MessagesPage/>
   </Route>
   <Route path="/accountshops" exact>
   <AccountShopsPage/>
   </Route>
   <Route path="/accountfarmsupplies" exact>
   <AccountFarmSupplies/>
   </Route>
   <Route path="/accountfarmproduce" exact>
   <AccountFarmProducts/>
   </Route>
   <Route path="/accountagriservices" exact>
   <AccountAgriServices/>
   </Route>
   <Route path="/Admin" exact>
   <AdminPage/>
   </Route>
   <Route path="/Users" exact>
   <Users/>
   </Route>
   <Route path="/Logs" exact>
   <Logs/>
   </Route>
   <Route path="/oneproduct/:psn/:category" exact>
   <OneProduct/>
   </Route>
   </Router>

<Route path="/SignUp" element={<SignUpPage/>}/>
      <Route path="/SignIn" element={<SignInPage/>}/>
      <Route path="/market" element={<MarketPage/>}/>
      <Route path="/accounthome" element={<AccountHomePage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/weather" element={<WeatherPage/>}/>
      <Route path="/uploadedproducts" element={<UploadedProductsPage/>}/>
      <Route path="/messages" element={<MessagesPage/>}/>
      <Route path="/accountshops" element={<AccountShopsPage/>}/>
      <Route path="/accountfarmsupplies" element={<AccountFarmSupplies/>}/>
      <Route path="/accountfarmproduce" element={<AccountFarmProducts/>}/>
      <Route path="/accountagriservices" element={<AccountAgriServices/>}/>
      <Route path="/Admin" element={<AdminPage/>}/>
      <Route path="/Users" element={<Users/>}/>
      <Route path="/Logs" element={<Logs/>}/>
      <Route path="/oneproduct/:psn/:category" element={<OneProduct/>}/>

    </BrowserRouter> */

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage2/>}/>
      <Route path="/about" element={<AboutPage/>}/>
    </Routes>
    </BrowserRouter>

  );
} 

export default App;
