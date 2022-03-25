import React, { useState,useEffect,useContext } from 'react';
//import { Button, Divider } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {  BrowserRouter,  Routes,  Route, Link} from "react-router-dom";
import NavBar from './navbar';
import NavBar2 from './navbar2';
import Footer from './footer';

function AboutPage() {
  return (
      <div>
   <NavBar2/>
    <div className="maincontent">
      <h4 className="text-center text-success"><i>About Us</i></h4>
      <div className="container">
     <p>Prime Agriculture is an agritech company established in <b>2020</b> that is committed facilitate all that apertains to agriculture through various 
       services we offer. Our platform comes in four core dimensions which are:</p>
       <ol type="i">
         <li style={{fontWeight: 'bold',color: '#009900',margin: '10px'}}>Consistent weather forecast</li>
         <li style={{fontWeight: 'bold',color: '#009900',margin: '10px'}}>Online market place</li>
         <li style={{fontWeight: 'bold',color: '#009900',margin: '10px'}}>Farmers' Social Media</li>
         <li style={{fontWeight: 'bold',color: '#009900',margin: '10px'}}>Credit Facilities and Loans</li>
         </ol>
         <p>All you need to do is to <Link to="SignUp">register an account</Link> with us and gain access to all of these services.
         Prime Agriculture has proven to be effective in improving the status of agricluture in Kenya for those who have tried it.
         Join Us today and experience the best from us.</p> 
     </div>
     <div className="container">
       <h4 className="text-center text-success">FAQS</h4>
       <ol type="1">
       <li>
           <h6>Question : Who is this platform for?</h6>
           <p><b>Answer : </b>This platform is open for anyone from anywhere in the world. Iy can be used by anyone who participates
           in agriculture either directly or indirectly.</p>
         </li>
         <li>
           <h6>Question : Do I need to pay anything to start using this platform?</h6>
           <p><b>Answer : </b>NO. Joining Prime Agriculture does not require any payment. You only create a free account that does navigationbar
           attract any charges.</p>
         </li>
         <li>
           <h6>Question : How many accounts can I register?</h6>
           <p><b>Answer : </b> You can register as many accounts as you wish. Each account requires a unique email. If you own multiple 
           email accounts you can own multiple prime agriculture accounts too.</p>
         </li>
         <li>
           <h6>Question : Where is the Company Located?</h6>
           <p><b>Answer : </b> Prime Agriculture is located in western kenya in Kisumu County around Maseno University</p>
         </li>
       </ol>
     </div>
    <Footer/>
    </div>
    </div>
  );
} 

export default AboutPage;
