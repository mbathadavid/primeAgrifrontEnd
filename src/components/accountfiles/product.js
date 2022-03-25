import React, { useState,useEffect,useContext, useRef } from 'react';
import { Button, Divider,CircularProgress } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter,  Routes,  Route, Link, useParams, useNavigate} from "react-router-dom";
//import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect,useParams } from 'react-router-dom';
import { FaLeaf,FaAlignJustify,FaBars,FaUser,FaBeer,FaHome,FaPhone,FaTimes,FaShoppingCart,FaWhatsapp } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {PhotoCamera,Send,FileCopy,Phone} from '@material-ui/icons';
import { userContext } from '../../userContext';
import AccountsideNav from './sidenav';
import Navigation from './navigation';
import TopNav from './topnav';
import Snappy from '../../Sounds/Piggyback.ogg';
import './accountfiles.css';
import Posts from './posts';
import OtherUsers from './otherusers';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const OneProduct = ({ match }) =>{
const [psn,setPsn] = useState(0);
const [category,setCategory] = useState('');
const [oneproddetails,setProdDetails] = useState([]);
const isMounted = useRef(false);
const loggedinuserdetails = useContext(userContext);
const [userid,setUserid] = useState("");
const [fname,setFname] = useState("");
const [lname,setLname] = useState("");
const [email,setEmail] = useState("");
const [phone,setPhone] = useState("");
const [county,setCounty] = useState("");
const [profile,setProfile] = useState("");
const [verified,setVerfied] = useState("");
const [postres,setPosRes] = useState('');
const [posresshow,setPosShow] = useState(false);
const [postuploading,setPostUploading] = useState(false);
const [users,setUsers] = useState([]);
const [audio] = useState(new Audio(Snappy));
const [isPlaying,setIsplaying] = useState(false);
const navigate = useNavigate();
const teststatus = JSON.stringify(loggedinuserdetails.loggeduserdetails.loggedstatus);
//get details of fetched products
const proddetails = useParams();
useEffect(() => { 
  setPsn(proddetails.psn);
  setCategory(proddetails.category);
},[])

//update local status on page load
useEffect(() => {
    setUserid(sessionStorage.getItem('userid'));
    setFname(sessionStorage.getItem('fname'));
    setLname(sessionStorage.getItem('lname'));
    setEmail(sessionStorage.getItem('email'));
    setPhone(sessionStorage.getItem('phone'));
    setCounty(sessionStorage.getItem('county'));
    setProfile(sessionStorage.getItem('profile'));
    setVerfied(sessionStorage.getItem('verified'));
},[])
//send ajax request to the server to get product details
useEffect(() => {
  if (isMounted.current) {
      axios({
        method: 'POST',
          url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/fetchoneproduct.php',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            pid: psn,
          }
      })
      .then((res) => {
        console.log(res.data);
        setProdDetails(res.data);
      })
      .catch((err) => {

      })
  } else {
    isMounted.current = true;
  }
},[psn,category])



  return teststatus === 'false' && sessionStorage.length <= 1 ? (navigate("/SignIn")) : 
  (<div>
    <Navigation image={profile} fname={fname} lname={lname}/>
    <div className= {loggedinuserdetails.sidenavvis ? "mainaccountcontent container" : "hiddenmainaccountcontent container" }>
    <div className="row">
      <hr/>
      <div className="col-md-4">
        {
          oneproddetails.map(oneprod =>(
            <div>
            {
              oneprod.category == "Agricultural services" ? '' :
              <h6 className="text-center text-info">{oneprod.productname}</h6>
            }
            {
              oneprod.service == "" ? '' :
              <h6 className="text-center text-info">{oneprod.service}</h6>
            }
            <img className="img-fluid" src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${oneprod.coverphoto}`}/>
            <h4 className="text-center text-success">{oneprod.price}/=</h4>
            {
              oneprod.brand == "" ? '' :
              <h5 className="text-center text-danger">Brand : {oneprod.brand}</h5>
            }
            {
              oneprod.model == "" ? '' :
              <h5 className="text-center text-danger">Model : {oneprod.model}</h5>
            }
            {
              oneprod.condition == "" ? '' :
              <h5 className="text-center text-danger">Condition : {oneprod.status}</h5>
            }
            <p className="text-center text-success">{oneprod.description}</p>
            </div>
          ))
        }
      </div>
      <div className="col-md-4">
        
          {
            oneproddetails.map((oneprod,index) => (
              <div style={{ display: 'block',maxHeight: '350px',overflowY: 'auto' }}>
              {
                oneprod.moreimages.split(',').map(image => (
                  <img style={{ padding: '10px' }} className="img-fluid" src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${image}`}/>   
                ))
              }
              </div>
            ))
          }
          
        
        
      </div>
      <div className="col-md-4">
        <h5 className="text-center text-danger">Seller Details</h5>
        {
          oneproddetails.map(oneprod => (
            <div>
            <h5 className="text-center"><img style={{ width: '40px',height: '40px',borderRadius:'50%' }} src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${oneprod.profilephoto}`}/>&nbsp;
            {oneprod.Fname} {oneprod.Lname}  </h5>
            <h6>Contact Seller : </h6>
              <a href={`https://wa.me/+254${oneprod.Phone}?text=Hello ${oneprod.Fname}, Am interested with your ${oneprod.productname} which you posted in PrimeAgriculture`} className="btn btn-block btn-success" style={{ borderRadius: '25px' }}><FaWhatsapp/>&nbsp; WhatsApp</a><br/><br/>
              <a href={`tel:+254${oneprod.Phone}`} className="btn btn-block btn-primary" style={{ borderRadius: '25px' }}><Phone/>&nbsp; Phone Call</a>
            </div>
          ))
        }
      </div>
    </div>
    </div>
    </div>
  )
} 

export default OneProduct;
