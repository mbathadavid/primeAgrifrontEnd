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

function AccountHomePage() {
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

const [otheruseropen,setOtherUsersOpen] = useState(false);
const [posting,setPosting] = useState(false);
const togglecloseopen = () => {
  setOtherUsersOpen(!otheruseropen);
}
//handle post product show
const handlepostuploadshow = () => {
  setPosting(true);
  setIsplaying(false);
}
//hidepostform
const closepostform = () => {
  setPosting(false);
  setIsplaying(false);
}
//form fields
const [post,setPost] = useState('');
const [files,setFiles] = useState('');
const [urls,setUrls] = useState([]);

const handlefiles = (e) => {
  const urlsarray = [];
  setFiles(e.target.files);

  for (let i = 0; i < e.target.files.length; i++) {
    urlsarray.push(URL.createObjectURL(e.target.files[i]));
  }
  setUrls(urlsarray);

}
//submit form
const makepost = (e) => {
  e.preventDefault();
  setPostUploading(true);
  var timezonediff = new Date().getTimezoneOffset();
  timezonediff = timezonediff == 0 ? 0 : -timezonediff;
  const formdata = new FormData();
  formdata.append('timezone',timezonediff);
  formdata.append('parentpost','');
  formdata.append('userid',userid);
  formdata.append('type','mainpost');
  formdata.append('post',post);

  if (urls.length > 0) {
    for (let i = 0; i < files.length; i++) {
      formdata.append('images[]',files[i]); 
    }
}
//send post to the server
axios({
  method: 'POST',
  url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/makepost.php',
  headers: {
        'Content-Type': 'application/json',
      },
  data: formdata
})
.then((res) => {
  if (res.data.status === "success") {
      setPost('');
      setFiles('');
      setUrls([]);
      setPosting(false);
      setIsplaying(true);
      setPostUploading(false)
      setPosRes('Posted Successfully')
      setPosShow(true)
  } else {
    setPost('');
    setFiles('');
    setUrls([]);
    setPosting(false);
    setPostUploading(false)
    setPosRes('Error while posting')
    setPosShow(true)
  }
})
.catch((error) => {
  setPostUploading(false)
  setPosRes('Network Error')
  setPosShow(true)
})

}
//make a sound
useEffect(() => {
  if(isMounted.current){
  isPlaying ? audio.play() : audio.pause()
  }
  else {
    isMounted.current = true;
  }
},[isPlaying])
//hide other response
const hidepostres = () => {
  setPosShow(false);
}
useEffect(() => {
if (isMounted.current) {
  setInterval(hidepostres,20000)
} else {
  isMounted.current = true;
}
},[postres])

//function to fetch other system users
const updateuserlogintime = () => {
  console.log(userid)
  var timezone_offset_minutes = new Date().getTimezoneOffset();
  timezone_offset_minutes = timezone_offset_minutes == 0 ? 0 : -timezone_offset_minutes;
   
  const updatedata = {
    cuser: userid,
    timezone: timezone_offset_minutes
  }
  axios({
  method: 'POST', 
  url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/updatelogintime.php',
  headers: {
        'Content-Type': 'application/json',
      },
  data: updatedata
  })
  .then((res) => {
    
  })
  .catch((error) => {

  })
}
//time userlogintimeupdate
/* useEffect(() =>{
  if (isMounted.current) {
    setInterval(updateuserlogintime,1000);
  } else {
    isMounted.current = true;
  }
},[userid]) */



  return teststatus === 'false' && sessionStorage.length <= 1 ? (navigate("/SignIn")) : 
  (<div>
    <Navigation image={profile} fname={fname} lname={lname}/>
    <div className= {loggedinuserdetails.sidenavvis ? "mainaccountcontent" : "hiddenmainaccountcontent" }>
    <div className="forumpage">
      <div className="chats">
        <a href="#" className="openotherusers" onClick={togglecloseopen}><FaBars/></a>
        <Posts userid={userid}/> 
        <div className="mypost">
        <input className="form-control" disabled={ posting ? "disabled" : '' } onFocus={handlepostuploadshow} className="postfield" placeholder="Make a Post" type="text"/>
        </div>
      </div>
      <div className={ otheruseropen ? 'otherusershidden' : "otherusers" }>
        <OtherUsers userid={userid}/>
      </div>
    </div>
    { posresshow ? <div className="postres"><h6 className="text-center">{postres}</h6></div> : '' }
    

    <div className={ posting ? "postform" : 'hiddenpostform'}>
      
      <form action="#" method="POST" encType="multipart/form-data">
        <a style={{ float: 'right' }} href="#" onClick={closepostform}><FaTimes/></a>
        <input hidden type="number" value={userid}/>
        <div className="form-group">
        <textarea rows="8" onChange={(e) => setPost(e.target.value)} placeholder="Type your post or question here..." className="form-control">

        </textarea>
        </div>
        <div className={ urls.length == 0 ? '' : "hasimages" } >
          {
            urls.length == 0 ? '' :
            urls.map((url) => (
              <img style={{ padding: '10px' }} className="img-fluid" src={url}/>
            ))
          }
        </div>
        <label htmlFor="files" style={{ background: 'green',marginTop: '10px',padding: '5px',borderRadius: '25px' }}><PhotoCamera/>&nbsp;Attach Files</label>
        <input onChange={handlefiles} hidden id="files" type="file" multiple/>
        <button onClick={makepost} style={{ float: 'right',outline: 'none',border: 'none',marginTop: '10px' }} type="submit"><Send/></button>
        <div className="form-group" style={{ textAlign: 'center',marginTop: '5px' }}>
        { postuploading ? <CircularProgress color="secondary"/> : '' } 
        </div>
      </form>
    </div>

    </div>
    </div>
  )
} 

export default AccountHomePage;
