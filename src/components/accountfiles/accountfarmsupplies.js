import React, { useState,useEffect,useContext, useRef } from 'react';
import { Button, Divider,CircularProgress } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate,Link } from "react-router-dom";
//import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect } from 'react-router-dom';
import { FaLeaf,FaAlignJustify,FaBars,FaUser,FaBeer,FaHome,FaPhone,FaTimes,FaShoppingCart } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {PhotoCamera,Send,FileCopy} from '@material-ui/icons';
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

function AccountFarmSupplies() {
const [products,setProducts] = useState([]);
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
//fecth products
const fetchproducts = () => {
    axios({
        method: 'POST',
          url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/fetchotherproducts.php',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            id: userid,
            category: 'Farm Inputs'
          }
      })
      .then((response) => {
        if(response.data === "Noproducts") {

        } else {
            setProducts(response.data);
        }
      })
      .catch((error) => {
         console.log(error) 
      })
}
useEffect(() => {
    if (isMounted.current) {
        setInterval(fetchproducts,2000);
    } else {
      isMounted.current = true;  
    }
},[userid])

  return teststatus === 'false' && sessionStorage.length <= 1 ? (navigate("/SignIn")) : 
  (<div>
    <Navigation image={profile} fname={fname} lname={lname}/>
    <div className= {loggedinuserdetails.sidenavvis ? "mainaccountcontent container" : "hiddenmainaccountcontent container" }>
    <div className="productsdiv">
        {
            products.length == 0 ? <h6 className="text-center text-info">No products yet</h6> :
            products.map((product,index) => (
                <div key={index} className="oneproduct">
                    <h6 className="text-center text-danger">{product.productname}</h6>
                    <Link to={`/oneproduct/${product.SN}/${product.category}`}><img className="img-fluid" src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${product.coverphoto}`}/></Link>
                    <p style={{ fontWeight: 'bold' }} className="text-success text-center">{product.price}/=</p>
                </div>
            ))
        }
    </div>
    </div>
    </div>
  )
} 

export default AccountFarmSupplies;
