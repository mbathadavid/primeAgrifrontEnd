import React, { useState,useEffect,useContext, useRef } from 'react';
import { Button, Divider,CircularProgress } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate,Link } from "react-router-dom";
//import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect } from 'react-router-dom';
import { FaLeaf,FaAlignJustify,FaBars,FaUser,FaBeer,FaHome,FaPhone,FaTimes,FaShoppingCart,FaEdit,FaDelete,FaInfo,FaTrash } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {PhotoCamera} from '@material-ui/icons';
import { userContext } from '../../userContext';
import AccountsideNav from './sidenav';
import Navigation from './navigation';
import TopNav from './topnav';
import './accountfiles.css';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function AccountShopsPage() {
const [shops,setShops] = useState([]);
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
const navigate = useNavigate();
const teststatus = JSON.stringify(loggedinuserdetails.loggeduserdetails.loggedstatus);

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

//fetchshops
const fetchnumberofshops = () => {
    axios({
      method: 'POST',
        url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/fetchshops.php',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          id: userid
        }
    })
    .then((response) => {
      
      if (response.data === "NoData") {
        
      } else {
            setShops(response.data);
      }
      
    })
    .catch((error) => {
       console.log(error) 
    })
  }

  //updateshops
  useEffect(() => {
      if (isMounted.current) {
          fetchnumberofshops();
      } else {
        isMounted.current = true;  
      }
  },[userid])
  //show displayed products

  //display shops
  const displayshops = (shops) => {
      return shops.length == 0 ? <h6>You have not created any shops yet</h6> : 
      shops.map((shop,index) => (
        <tr key={index}>
        <td><div style={{ width: '80px',height: '65px' }}><img 
        className="img-fluid" src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${shop.profile}`}/></div></td>
        <td>{shop.Name}</td>
        <td>{shop.shoptype}</td>
        <td>{shop.Description}</td>
        <td>
          <a href="#"><FaEdit className="text-success"/></a>
          <a style={{ padding: '1px' }} href="#"><FaInfo className="text-info"/></a>
          <a href="#"><FaTrash className="text-danger"/></a>
          </td>
        </tr>
      )
      ) 
  }


  useEffect(() => {
        if (isMounted.current) {
            displayshops(shops)
        } else {
            isMounted.current = true;
        }
  },[shops])

  return teststatus === 'false' && sessionStorage.length <= 1 ? (navigate("/SignIn")) : 
  (<div>
    <Navigation image={profile} fname={fname} lname={lname}/>
    <div className= {loggedinuserdetails.sidenavvis ? "mainaccountcontent" : "hiddenmainaccountcontent" }>
    {
      shops.length == 0 ?  <table class="table table-responsive">
      <thead>
        <tr>
          <th scope="col">Profile</th>
          <th scope="col">Name</th>
          <th scope="col">Products Sold</th>
          <th scope="col">Description</th> 
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        
    </tbody>
  </table>:
      <table class="table table-responsive">
      <thead>
        <tr>
        <th scope="col">Profile</th>
          <th scope="col">Name</th>
          <th scope="col">Products Sold</th>
          <th scope="col">Description</th> 
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
       {
         displayshops(shops)
       } 
    </tbody>
  </table>
    }
    </div>
    </div>
  )
} 

export default AccountShopsPage;
