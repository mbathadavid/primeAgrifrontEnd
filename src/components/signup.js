import React, { useState,useEffect,useContext } from 'react';
import { Button, Divider, CircularProgress } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavBar from './navbar';
import NavBar2 from './navbar2';
import { FaLeaf,FaAlignJustify,FaBars,FaUser,FaBeer,FaHome,FaPhone,FaTimes,FaShoppingCart } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {PhotoCamera} from '@material-ui/icons';
import avatar  from '../images/avatar.png';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function SignUpPage() {
  const classes = useStyles();
  const counties = ['Nairobi','Machakos','Kiambu','Kisumu','Meru','Makueni'
                     ,'Mombasa','Kitale','Busia','Malindi','Taita-Taveta',
                     'Machakos','Kwale','Kilifi','Nyeri','Meru','Kakamega','Bungoma'
                      ,'Garisa','Wajir','Migori'];
  const [passcheckmsg,setPassCheckMessage] = useState("");
  const [activestatus,setActiveStatus] = useState("");
  const [fname,setFname] = useState("");
  const [lname,setLname] = useState("");
  const [email,setEmail] = useState("");
  const [number,setNumber] = useState("");
  const [county,setCounty] = useState("");
  const [password,setPassword] = useState("");
  const [registred,setRegistred] = useState(false);
  const [emailcheckmsg,setEmailCheckMessage] = useState("");
  const [resdivvis,setResponseVisibility] = useState(false);
  const [cpassword,setConfirmPassword] = useState("");
  const [regresponse,setRegResponse] = useState("");
  const [{file,src},setFile] = useState({
          file: '',
          src: avatar,
  });

  //Handle image preview
  const handleImg = (e) => {
    if(e.target.files[0]) {
      setFile({
        file: e.target.files[0],
        src: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  //Handle password matching checking
  const checkpasswords = () => {
      if(password !== cpassword) {
        setPassCheckMessage("Passwords did not Match");
        setActiveStatus("disabled");
      }
      else {
        setPassCheckMessage("");
        setActiveStatus("");
      }
  }
  //check for email availability
  const checkEmailavailability = (e) => {
    const emailtocheck = {
      'sendemail': email
    }
    e.preventDefault();
    axios({
      method: 'POST',
        url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/checkemail.php',
        headers: {
          'Content-Type': 'application/json',
        },
      data: emailtocheck
    })
    .then((response) => {
      if(response.data === "Available") {
        setEmailCheckMessage("");
        setActiveStatus('');
      }else {
        setEmailCheckMessage("Email is already registered! Please Use another Email To Continue");
        setActiveStatus('disabled');
      }
      ;
    })
    .catch((error) => {
        setEmailCheckMessage("Sorry!Server is unreachable,  please try again later");
    })
  }
  //Hide response text
  const hideresponsetext = (e) => {
    e.preventDefault();
    setResponseVisibility(false);
  }

  //Submit Registartion Details
  const handleSubmit = (e) =>{
    e.preventDefault();
    setRegistred(true);
    var timezone_offset_minutes = new Date().getTimezoneOffset();
    timezone_offset_minutes = timezone_offset_minutes == 0 ? 0 : -timezone_offset_minutes;
    const formdata = new FormData();
    formdata.append('timezone',timezone_offset_minutes);
    formdata.append('firstname',fname);
    formdata.append('lastname',lname);
    formdata.append('email',email);
    formdata.append('password',password);
    formdata.append('phone',number);
    formdata.append('county',county);
    formdata.append('file',file);

    axios({
      method: 'POST',
        url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/register.php',
        headers: {
          'Content-Type': 'application/json',
        },
      data: formdata
    })
    .then((response) => {
      console.log(response)
      if(response.data.status === 'success'){
        setRegResponse(response.data.message);
        setResponseVisibility(true);
        setRegistred(false);
        setFname("");
        setLname("");
        setNumber("");
        setPassword("");
        setConfirmPassword("");
        setCounty("");
        setFile({
          file: avatar,
          src: avatar
        });
        setEmail("");
      }
      else {
        setRegResponse(response.data.message);
        setResponseVisibility(true);
        setRegistred(false)
      } 
    })
    .catch((error) => {
      setRegResponse("Sorry! Server is Unreachable Please try again Later");
      setResponseVisibility(true);
      setRegistred(false)
    }) 
  }

  return (
    <div>
   <NavBar2/>
   <div className="maincontent">
     <div className="container">
       <div className="row d-flex justify-content-center align-items-center">
        <div className="col-lg-10">
          <div className="card shadow">
            <div className="card-header bg-success">
            <h3 style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
            <span style={{fontSize: "30px",border: '2px solid green',
          background: 'white',borderRadius: '50%',display: 'flex',
          alignItems: 'center',justifyContent: 'center',width: '50px',height: '50px'}}><FaLeaf className="logoicon"/></span></h3>
            </div>
            <div className="card-body">
          <form action="#" encType="multipart/form-data" className={classes.root} method="POST">
          <div className={ resdivvis ? 'responsetext' : 'hiddendiv' }>
            <p className="text-center" style={{ backgroundColor: '#ff8080',
        padding: '10px' }}>{regresponse}<span><a style={{ marginLeft: '10px' }} href="#" onClick={hideresponsetext}><FaTimes/></a></span></p>
        </div>
          <div className="row">
          <div className="col-md-6">  
            <FormControl className="mb-2" style={{ width: '97%' }}>
              <InputLabel className="text-info" htmlFor="component-simple">First Name</InputLabel>
              <FilledInput value={fname} onChange={(e) => setFname(e.target.value)} type="text" />
            </FormControl>
            <FormControl className="mb-2" style={{ width: '97%' }}>
              <InputLabel className="text-info" htmlFor="component-simple">Last Name</InputLabel>
              <FilledInput value={lname} onChange={(e) => setLname(e.target.value)} type="text" />
            </FormControl>
            <FormControl className="mb-2" style={{ width: '97%' }}>
              <InputLabel className="text-info" htmlFor="component-simple">Email Address</InputLabel>
              <FilledInput value={email} onBlur={checkEmailavailability} onChange={(e) =>setEmail(e.target.value)} type="email" />
              <span style={{ color: 'red' }}>{emailcheckmsg}</span>
            </FormControl>
            <FormControl className="mb-2" style={{ width: '97%' }}>
              <InputLabel className="text-info" htmlFor="component-simple">Phone Number</InputLabel>
              <FilledInput value={number} onChange={(e) =>setNumber(e.target.value)} type="number" />
            </FormControl>
            <FormControl className="mb-2" style={{ width: '97%' }}>
              <InputLabel className="text-info" htmlFor="component-simple">Select County</InputLabel>
              <NativeSelect onChange={(e) => setCounty(e.target.value)}>
              <option aria-label="None" value="" />
              {
              counties.map(county =>{  
                return <option key={county} value={county}>{county}</option>
              })
             } 
              </NativeSelect>
            </FormControl>
            </div>
            <div className="col-md-6">
            <FormControl className="mb-2" style={{ width: '97%' }}>
              <InputLabel className="text-info" htmlFor="component-simple">Password</InputLabel>
              <FilledInput value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            </FormControl>
            <FormControl className="mb-2" style={{ width: '97%' }}>
              <InputLabel className="text-info" htmlFor="component-simple">Confirm Password</InputLabel>
              <FilledInput value={cpassword} onBlur={checkpasswords} onChange={(e) => setConfirmPassword(e.target.value)} type="password" />
              <span style={{ color: 'red' }}>{passcheckmsg}</span>
            </FormControl>
            <div className="form-group mb-1">
              <label htmlFor="file" className="text-bold" style={{ width: '100%', cursor: 'pointer' }}><h6 href="#" style={{ display: 'flex', justifyContent: 
              'center', alignItems: 'center',background: 'green', borderRadius: '25px',
              padding: '10px',width: '100%',fontWeight: 'bold' }}>Select Profile</h6></label>
              <input hidden onChange={handleImg} id="file" type="file"/>
            </div>
            <div className="mb-2 d-flex align-items-center justify-content-center">
              <img style={{ height: "180px", width: '180px', borderRadius: '50%' }} className="img-thumbnail img-fluid" src={src} />
            </div>
            </div>
            </div>
            <FormControl className="mb-2" style={{ width: '97%' }}>
              <Button type="submit" onClick={handleSubmit} variant="contained" color="primary" disabled={activestatus}>
                { registred ? <CircularProgress color="secondary"/>  : 'REGISTER'  }</Button>
            </FormControl>
          
          </form>
          </div>
          <div className="card-footer p-2">
            <h6 className="text-center">Already have an account?<span><Link to="/SignIn">LOGIN</Link></span></h6>
          </div>
   </div>
   </div>
   </div>
   </div>
   </div>
   </div>
  );
} 

export default SignUpPage;
