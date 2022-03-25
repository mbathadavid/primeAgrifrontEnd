import React, { useState,useEffect,useContext, useRef } from 'react';
import { Button, Divider,CircularProgress } from '@material-ui/core';
import BgImage from '../../images/weather3.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter,  Routes,  Route, Link, useParams, useNavigate} from "react-router-dom";
//import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect } from 'react-router-dom';
import { FaLeaf,FaAlignJustify,FaBars,FaUser,FaBeer,FaHome,FaPhone,FaTimes,FaShoppingCart } from 'react-icons/fa';
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
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function WeatherPage() {
const isMounted = useRef(false);
const [latitude,setLatitude] = useState(2);
const [longitude,setLongitude] = useState(4);
const API_KEY = "2484b95ca27dc50cc1bca7fd18ec9271";
const [dailyweather,setDailyWeather] = useState([]);
const [currentweather,setCurrentWeather] = useState([]);
const [clouds,setClouds] = useState(null);
const [timezone,setTimezone] = useState('');
const [hours,setHour] = useState('');
const [minute,setMinute] = useState('');
const [seconds,setSecond] = useState('');
const [ampm,setAmPm] = useState('');
const [hourformat,setHourFormat] = useState('');
const [day,setDay] = useState('');
const [date,setDate] = useState('');
const [month,setMonth] = useState('');

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

//function to calculate the positions
const showPosition = (position) => {
  setLatitude(position.coords.latitude);
  setLongitude(position.coords.longitude);
}
//function to get geolocation
const getGeolocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
}
//ask for geolocation on page render
useEffect(() => {
  getGeolocation();
},[])
//fetch weather data
useEffect(() =>{
  if (isMounted.current) {
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&exclude=hourly,minutely&units=metric`,
      headers: {
            'Content-Type': 'application/json',
          },
    })
    .then((res) => {
      console.log(res.data);
      setDailyWeather(res.data.daily)
      setTimezone(res.data.timezone);
      setCurrentWeather(res.data.current);
      setClouds(res.data.current.weather);
     })
    .catch((err) => {
      console.log(err);
    })
  } else {
    isMounted.current = true;
  }
},[latitude,longitude])
//
useEffect(() => {
  if(isMounted.current) {
    console.log(clouds)
  } else {
    isMounted.current = true;
  }
  
},[clouds])
//get current time
const days = ['Sunday','Monday','Teausday','Wednesday','Thursday','Friday','Sartuday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const getcurrenttime = setInterval(() => {
  const date = new Date();
  const month = date.getMonth();
  const d = date.getDate();
  const day = date.getDay();
  const hour = ("0"+date.getHours()).slice(-2);
  const hourformat = hour >= 13 ? hour %12: hour;
  const minute = ("0"+date.getMinutes()).slice(-2);
  const seconds = ("0"+date.getSeconds()).slice(-2);
  const ampm = hour >= 12 ? 'PM' : 'AM';

  setMonth(month)
  setDate(d)
  setDay(day)
  setHourFormat(hourformat)
  setMinute(minute)
  setSecond(seconds)
  setAmPm(ampm)
},1000)
//start timer
useEffect(() =>{
  setInterval(getcurrenttime,1000)
},[])

  return teststatus === 'false' && sessionStorage.length <= 1 ? (navigate("/SignIn")) : 
  (<div>
    <Navigation image={profile} fname={fname} lname={lname}/>
    <div className= {loggedinuserdetails.sidenavvis ? "mainaccountcontent" : "hiddenmainaccountcontent" }>
    <div className="weatherpage" style={{ backgroundImage: `url(${BgImage})`,backgroundAttachment: 'fixed' }}>
      <div className="time">
        <h5 className="text-center">TimeZone : <br/><span style={{ fontWeight: 'bold',color: '#cc0066' }}>{timezone}</span></h5>
        <h4 className="text-center">{days[day]} {date}, {months[month]}</h4>
        <h5 className="text-center"><span className="hour" style={{ fontSize: '35px',fontWeight: 'bold' }}>{hourformat}</span> : <span className="min" style={{ fontSize: '35px',fontWeight: 'bold' }}>{minute}</span> : <span className="sec" style={{ fontSize: '35px',fontWeight: 'bold' }}>{seconds}</span> <span style={{ fontSize: '30px',fontWeight: 'bold' }}>{ampm}</span></h5> 
      </div>

    <div className="weathertoday">
      <div className="actualtodayweather">
      <h5>Current Weather</h5>
      {
        clouds == null ? '' :
        
        clouds.map(cloud =>(
          <>
          <img  src={`http://openweathermap.org/img/wn/${cloud.icon}@2x.png`}/>
          <h6 className="text-danger">{cloud.description}</h6>
          </>
        ))
      
      }
      <hr/>
      <h6>Humidty : {currentweather.humidity}%</h6>
      <h6>Pressure : {currentweather.pressure}</h6>
      <h6>Temperature : {currentweather.temp} &#176;C</h6>
      <h6>Dew Point : {currentweather.dew_point}</h6>
      <h6>Sunrise : {moment(currentweather.sunrise * 1000).format('HH:mm a')}</h6>
      <h6>Sunset : {moment(currentweather.sunset * 1000).format('HH:mm a')}</h6>
    </div>
    </div>
    <h5 className="text-center">Weather in the next 7 Days</h5>
    <div className="weathernext7days">
      {
      dailyweather.length == 0 ? '' :
        dailyweather.map((day,index) => (
          <div className="oneday" key={index}>
          <h6 className="text-center text-danger">{moment(day.dt * 1000).format('ddd')}</h6>
          <hr/>
          <h6 className="text-center text-success">Weather</h6>
          {
            day.weather.length == 0 ? '' :
            day.weather.map(wea => (
              <div>
                <img src={`http://openweathermap.org/img/wn/${wea.icon}@2x.png`}/>
                <h6>{wea.description}</h6>
              </div>
            )) 
          }
          <hr/>
        <h6 className="text-center text-danger">Temperatures</h6>
        <p>Morning : <b style={{ color: '#ff3399' }}>{day.temp.morn}&#176;C</b></p>
        <p>Daytime : <b style={{ color: '#ff3399' }}>{day.temp.day}&#176;C</b></p>
        <p>Evening : <b style={{ color: '#ff3399' }}>{day.temp.eve}&#176;C</b></p>
        <p>Night : <b style={{ color: '#ff3399' }}>{day.temp.night}&#176;C</b></p>
        <p>Minimum : <b style={{ color: '#ff3399' }}>{day.temp.min}&#176;C</b></p>
        <p>Maxmum : <b style={{ color: '#ff3399' }}>{day.temp.max}&#176;C</b></p>
      </div>
        ))
      }
      
      
    </div>

    </div>
    </div>
    </div>
  )
} 

export default WeatherPage;
