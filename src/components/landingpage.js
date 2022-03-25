import React, { useState,useEffect,useContext } from 'react';
import { Button, Divider } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavBar from './navbar';
import NavBar2 from './navbar2';
import Footer from './footer';


function LandingPage() {
  return (
    <div>
   <NavBar2/>
   <div className="maincontent">
   <div className="container" style={{marginTop: '600px;'}}>
   <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={require('../images/images (5).jpg').default} class="d-block w-100" alt="An image was expected here"/>
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src={require('../images/images (5).jpg').default} class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src={require('../images/images (3).jpg').default} class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</div>

<div className="container services1">
  <h5 className="text-center text-success">Services offered</h5>
  <div id="services" style={{marginTop: "10px",marginBottom: "10px"}}>
  <div className="service">
    <h6 className="text-center text-info">Farmers' Social Media</h6>
    <p>Prime Agriculture brings to you a special platform where you can connect with your fellow farmers from anywhere in the 
      world and get to discuss issues concerning agriculture. This is a discusssion forum where you can ask questions and get 
      answers  from people who may know the answer. You can find solutions for problems you have been experienced such pest and 
      disease investation. You can ask for advice of the kind fertilizer you to apply in your farm. Any discussion that apertains
      to agriculture is welcomed in this platform. Now you don't have to get stuck again trying to puzzle a problem by yourself.
      Join Us today ny creating an account and enjoy this service.   
    </p>
  </div>

  <div className="service">
    <h6 className="text-center text-info">Market Place</h6>
    <p>Farming would not be beneficial at all if those involved in it do not have access to a market place where they can 
      sell their products. Prime brings to you smart market in two dimensions.<br/> <b>1. To the Farm</b> <br/>
      In this case the farmer is provided with a market where they can source farm inputs of any kind ,i.e Fertilzers, Fram tools
      and Machinery, Agrochemicals etc from trusted dealers.<br/>
      <b>2. From the Farm</b><br/>
      Here the farmer is given access to a wide market of consumers who are in need of youe products.<br/>
      <b><Link to="/SignUp">Create an Account</Link></b> abd see the magic. 
    </p>
  </div>
  <div className="service">
    <h6 className="text-center text-info">Weather Forecasting</h6>
    <p>Timely farm Planning depends heavily on the state of weather. As a result it is very necessary for the farmers to 
      keep themselves iupdated with the current and future information about weather. As a farmer you don't have to worry 
      anymore on where to get this information, we at prime agriculture will provide you with 7 days weather forecast. Isn't 
      this enough for you to help you plan your farm activities well? All you need is to <Link to="/SignUp">create an account</Link> with us and start 
      enjoying the service.
    </p>
  </div>
  <div className="service">
    <h6 className="text-center text-info">Farm Credit Facilities</h6>
    <p>We understand that sometimes farmers need access to credit facilities and loans to facilitate there agricultural activities.
      Prime Agriculture is committed to give you a seemless connection to top credit providers and loaners. You can easily get 
      find them in our website and follow them up for a deal. They may be banks, SACCOS, Government agencies or even individuals.
    </p>
  </div>
  </div>
</div>

<div className="container-fluid services2">
  <h5 className="text-center text-success">Services offered</h5>
  <div id="services" className="row" style={{marginTop: "10px",marginBottom: "10px"}}>
  <div className="col-md-3 service2">
    <h6 className="text-center text-info">Farmers' Social Media</h6>
    <p>Prime Agriculture brings to you a special platform where you can connect with your fellow farmers from anywhere in the 
      world and get to discuss issues concerning agriculture. This is a discusssion forum where you can ask questions and get 
      answers  from people who may know the answer. You can find solutions for problems you have been experienced such pest and 
      disease investation. You can ask for advice of the kind fertilizer you to apply in your farm. Any discussion that apertains
      to agriculture is welcomed in this platform. Now you don't have to get stuck again trying to puzzle a problem by yourself.
      Join Us today ny creating an account and enjoy this service.   
    </p>
  </div>

  <div className="col-md-3 service2">
    <h6 className="text-center text-info">Market Place</h6>
    <p>Farming would not be beneficial at all if those involved in it do not have access to a market place where they can 
      sell their products. Prime brings to you smart market in two dimensions.<br/> <b>1. To the Farm</b> <br/>
      In this case the farmer is provided with a market where they can source farm inputs of any kind ,i.e Fertilzers, Fram tools
      and Machinery, Agrochemicals etc from trusted dealers.<br/>
      <b>2. From the Farm</b><br/>
      Here the farmer is given access to a wide market of consumers who are in need of youe products.<br/>
      <b><Link to="/SignUp">Create an Account</Link></b> abd see the magic. 
    </p>
  </div>
  <div className="col-md-3 service2">
    <h6 className="text-center text-info">Weather Forecasting</h6>
    <p>Timely farm Planning depends heavily on the state of weather. As a result it is very necessary for the farmers to 
      keep themselves iupdated with the current and future information about weather. As a farmer you don't have to worry 
      anymore on where to get this information, we at prime agriculture will provide you with 7 days weather forecast. Isn't 
      this enough for you to help you plan your farm activities well? All you need is to <Link to="/SignUp">create an account</Link> with us and start 
      enjoying the service.
    </p>
  </div>
  <div className="col-md-3 service2">
    <h6 className="text-center text-info">Farm Credit Facilities</h6>
    <p>We understand that sometimes farmers need access to credit facilities and loans to facilitate there agricultural activities.
      Prime Agriculture is committed to give you a seemless connection to top credit providers and loaners. You can easily get 
      find them in our website and follow them up for a deal. They may be banks, SACCOS, Government agencies or even individuals.
    </p>
  </div>
  </div>
</div>

<Footer/>
</div>
</div>  
    
  );
} 

export default LandingPage;
