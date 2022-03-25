import React, { useState, useEffect, useContext } from "react";
//import { Button, Divider } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {  BrowserRouter,  Routes,  Route, Link} from "react-router-dom";
import NavBar from "./navbar";
import NavBar2 from "./navbar2";
import Footer from "./footer";
import "./landing.css";
import p1 from "../images/p1.jpg";
import p5 from "../images/p5.jpg";
import p4 from "../images/p4.jpg";
import p3 from "../images/p3.jpg";

function LandingPage2() {
  return (
    <div>
      <NavBar2 />

      <div className="maincontent">
        <div className="row">
          <div className="col-3">
            <ul className="sidelist">
              <li>
                <h3>The Community</h3>
                <i class="fa fa-users" aria-hidden="true"></i>
              </li>
              <li>
                <h3>The Market</h3>
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              </li>
              <li>
                <h3>Weather forecast</h3>
                <i class="fa fa-cloud" aria-hidden="true"></i>
              </li>
            </ul>
          </div>
          <div className=" col-9 calo">
            <div id="slides" class="carousel slide" data-ride="carousel">
              <ul class="carousel-indicators">
                <li data-target="#slides" data-slide-to="0" class="active"></li>
                <li data-target="#slides" data-slide-to="1"></li>
                <li data-target="#slides" data-slide-to="2"></li>
                <li data-target="#slides" data-slide-to="3"></li>
              </ul>
              <div class="carousel-inner" role="listbox">
                <div class="carousel-item active">
                  <img
                    src={p1}
                    alt="sxadadxad"
                    style={{ width: "1150px", height: "500px" }}
                  />

                  <div class="carousel-caption">
                    <h1 class="display-3">Prime Agriculture</h1>
                    <h3>
                      Taking Agriculture to the neext level with technology
                    </h3>
                    <h5>
                      Prime Agriculture creates the best environment to make
                      agriculture thrive in countries which depend on
                      agriculture as an economic activity
                    </h5>
                    <button type="button" class="btn btn-outline-light btn-lg">
                      Case Studies
                    </button>
                    <button type="button" class="btn btn-success btn-lg">
                      Technology Stack
                    </button>
                  </div>
                </div>
                <div class="carousel-item">
                  <img
                    src={p5}
                    alt="sxadadxad"
                    style={{ width: "1150px", height: "500px" }}
                  />
                  <div class="carousel-caption">
                    <h1 class="display-3">Prime Agriculture</h1>
                    <h3>
                      Taking Agriculture to the neext level with technology
                    </h3>
                    <h5>
                      Prime Agriculture creates the best environment to make
                      agriculture thrive in countries which depend on
                      agriculture as an economic activity
                    </h5>
                    <button type="button" class="btn btn-outline-light btn-lg">
                      Case Studies
                    </button>
                    <button type="button" class="btn btn-success btn-lg">
                      Technology Stack
                    </button>
                  </div>
                </div>

                <div class="carousel-item">
                  <img
                    src={p4}
                    alt="sxadadxad"
                    style={{ width: "1150px", height: "500px" }}
                  />
                  <div class="carousel-caption">
                    <h1 class="display-3">Prime Agriculture</h1>
                    <h3>
                      Taking Agriculture to the neext level with technology
                    </h3>
                    <h5>
                      Prime Agriculture creates the best environment to make
                      agriculture thrive in countries which depend on
                      agriculture as an economic activity
                    </h5>
                    <button type="button" class="btn btn-outline-light btn-lg">
                      Case Studies
                    </button>
                    <button type="button" class="btn btn-success btn-lg">
                      Technology Stack
                    </button>
                  </div>
                </div>

                <div class="carousel-item">
                  <img
                    src={p3}
                    alt="sxadadxad"
                    style={{ width: "1150px", height: "500px" }}
                  />
                  <div class="carousel-caption">
                    <h1 class="display-3">Prime Agriculture</h1>
                    <h3>
                      Taking Agriculture to the neext level with technology
                    </h3>
                    <h5>
                      Prime Agriculture creates the best environment to make
                      agriculture thrive in countries which depend on
                      agriculture as an economic activity
                    </h5>
                    <button type="button" class="btn btn-outline-light btn-lg">
                      Case Studies
                    </button>
                    <button type="button" class="btn btn-success btn-lg">
                      Technology Stack
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="savos">
          <div className="container services1">
            <h5 className="text-center">Services offered</h5>
            <div
              id="services"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div className="service">
                <h6 className="text-center">
                  {" "}
                  <i class="fa fa-users" aria-hidden="true"></i>Farmers' Social
                  Media
                </h6>
                <p>
                  Prime Agriculture brings to you a special platform where you
                  can connect with your fellow farmers from anywhere in the
                  world and get to discuss issues concerning agriculture. This
                  is a discusssion forum where you can ask questions and get
                  answers from people who may know the answer. You can find
                  solutions for problems you have been experienced such pest and
                  disease investation. You can ask for advice of the kind
                  fertilizer you to apply in your farm. Any discussion that
                  apertains to agriculture is welcomed in this platform. Now you
                  don't have to get stuck again trying to puzzle a problem by
                  yourself. Join Us today ny creating an account and enjoy this
                  service.
                </p>
              </div>

              <div className="service">
                <h6 className="text-center ">
                  <i class="fa fa-shopping-cart" aria-hidden="true"></i>Market
                  Place
                </h6>
                <p>
                  Farming would not be beneficial at all if those involved in it
                  do not have access to a market place where they can sell their
                  products. Prime brings to you smart market in two dimensions.
                  <br /> <b>1. To the Farm</b> <br />
                  In this case the farmer is provided with a market where they
                  can source farm inputs of any kind ,i.e Fertilzers, Fram tools
                  and Machinery, Agrochemicals etc from trusted dealers.
                  <br />
                  <b>2. From the Farm</b>
                  <br />
                  Here the farmer is given access to a wide market of consumers
                  who are in need of youe products.
                  <br />
                  <b>
                    <Link to="/SignUp">Create an Account</Link>
                  </b>{" "}
                  abd see the magic.
                </p>
              </div>
              <div className="service">
                <h6 className="text-center ">
                  <i class="fa fa-cloud" aria-hidden="true"></i>Weather
                  Forecasting
                </h6>
                <p>
                  Timely farm Planning depends heavily on the state of weather.
                  As a result it is very necessary for the farmers to keep
                  themselves iupdated with the current and future information
                  about weather. As a farmer you don't have to worry anymore on
                  where to get this information, we at prime agriculture will
                  provide you with 7 days weather forecast. Isn't this enough
                  for you to help you plan your farm activities well? All you
                  need is to <Link to="/SignUp">create an account</Link> with us
                  and start enjoying the service.
                </p>
              </div>
              <div className="service">
                <h6 className="text-center ">
                  <i class="fas fa-hand-holding-usd"></i>Farm Credit Facilities
                </h6>
                <p>
                  We understand that sometimes farmers need access to credit
                  facilities and loans to facilitate there agricultural
                  activities. Prime Agriculture is committed to give you a
                  seemless connection to top credit providers and loaners. You
                  can easily get find them in our website and follow them up for
                  a deal. They may be banks, SACCOS, Government agencies or even
                  individuals.
                </p>
              </div>
            </div>
          </div>

          <div className="container-fluid services2">
            <h5 className="text-center text-success">Services offered</h5>
            <div id="services" className="row" style={{}}>
              <div className="col-md-3 service2">
                <h6 className="text-center text-info">Farmers' Social Media</h6>
                <p>
                  Prime Agriculture brings to you a special platform where you
                  can connect with your fellow farmers from anywhere in the
                  world and get to discuss issues concerning agriculture. This
                  is a discusssion forum where you can ask questions and get
                  answers from people who may know the answer. You can find
                  solutions for problems you have been experienced such pest and
                  disease investation. You can ask for advice of the kind
                  fertilizer you to apply in your farm. Any discussion that
                  apertains to agriculture is welcomed in this platform. Now you
                  don't have to get stuck again trying to puzzle a problem by
                  yourself. Join Us today ny creating an account and enjoy this
                  service.
                </p>
              </div>

              <div className="col-md-3 service2">
                <h6 className="text-center text-info">Market Place</h6>
                <p>
                  Farming would not be beneficial at all if those involved in it
                  do not have access to a market place where they can sell their
                  products. Prime brings to you smart market in two dimensions.
                  <br /> <b>1. To the Farm</b> <br />
                  In this case the farmer is provided with a market where they
                  can source farm inputs of any kind ,i.e Fertilzers, Fram tools
                  and Machinery, Agrochemicals etc from trusted dealers.
                  <br />
                  <b>2. From the Farm</b>
                  <br />
                  Here the farmer is given access to a wide market of consumers
                  who are in need of youe products.
                  <br />
                  <b>
                    <Link to="/SignUp">Create an Account</Link>
                  </b>{" "}
                  abd see the magic.
                </p>
              </div>
              <div className="col-md-3 service2">
                <h6 className="text-center text-info">Weather Forecasting</h6>
                <p>
                  Timely farm Planning depends heavily on the state of weather.
                  As a result it is very necessary for the farmers to keep
                  themselves iupdated with the current and future information
                  about weather. As a farmer you don't have to worry anymore on
                  where to get this information, we at prime agriculture will
                  provide you with 7 days weather forecast. Isn't this enough
                  for you to help you plan your farm activities well? All you
                  need is to <Link to="/SignUp">create an account</Link> with us
                  and start enjoying the service.
                </p>
              </div>
              <div className="col-md-3 service2">
                <h6 className="text-center text-info">
                  Farm Credit Facilities
                </h6>
                <p>
                  We understand that sometimes farmers need access to credit
                  facilities and loans to facilitate there agricultural
                  activities. Prime Agriculture is committed to give you a
                  seemless connection to top credit providers and loaners. You
                  can easily get find them in our website and follow them up for
                  a deal. They may be banks, SACCOS, Government agencies or even
                  individuals.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage2;
