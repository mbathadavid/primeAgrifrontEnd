import React, { useState,useEffect,useContext } from 'react';
import { Button, Divider } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaLeaf,FaAlignJustify,FaBars,FaUser,FaBeer,FaHome,FaPhone,
    FaTimes,FaShoppingCart,FaEnvelope,FaFacebook,FaTwitter,FaWhatsapp,FaAppStore,FaGooglePlay } from 'react-icons/fa';
import { BrowserRouter as Router, Switch, Route, NavLink,Link } from 'react-router-dom';
import './navbar.css';
import { yellow } from '@material-ui/core/colors';
import { Dropdown } from 'react-bootstrap';

function Footer() {
  return ( 
    <div className="container-fluid footercontainer">
        <div className="footercontent">
            <div className="footercontents">
                <h5 className="text-center text-success">Useful Links</h5>
                <ul>
                    <li><Link to="">Login</Link></li>
                    <li><Link to="">Register</Link></li>
                    <li><Link to="">Forum</Link></li>
                    <li><Link to="">Market</Link></li>
                </ul>
            </div>
            <div id="contacts" className="footercontents">
                <h5 className="text-center text-success">Contacts</h5>
                <ul>
                    <li><Link to=""><FaEnvelope/>&nbsp; info@primeagri.co.ke</Link></li>
                    <li><Link to=""><FaFacebook/>&nbsp; Facebook</Link></li>
                    <li><Link to=""><FaTwitter/>&nbsp; Twitter</Link></li>
                    <li><a href=""><FaWhatsapp/>&nbsp; 0748269865</a></li>
                    <li><a href=""><FaPhone/>&nbsp; 0748269865</a></li>
                </ul>
            </div>
            <div className="footercontents">
                <h5 className="text-center text-success">SiteMap</h5>
                <ul>
                    <li><Link to="">AgroShops</Link></li>
                    <li><Link to="">Forum Members</Link></li>
                    <li><Link to="">Agricultural Finances</Link></li>
                    <li><Link to="">Credit Facilities </Link></li>
                    <li><Link to="">Fresh Farm Produce </Link></li>
                </ul>
            </div>
            <div className="footercontents">
                <h5 className="text-center text-success">Download</h5>
                <ul>
                    <li><Link><FaGooglePlay/>&nbsp;PlayStore</Link></li>
                    <li><Link><FaAppStore/>&nbsp;AppStore</Link></li>
                </ul>
            </div>
        </div>
    </div>
  );
} 

export default Footer;
