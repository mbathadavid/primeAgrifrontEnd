import React, { useState,useEffect,useContext, useRef } from 'react';
import { Button, Divider,CircularProgress } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect } from 'react-router-dom';
import { FaLeaf,FaAlignJustify,FaBars,FaUser,FaBeer,FaHome,FaPhone,FaTimes,FaShoppingCart } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {PhotoCamera,Send,FileCopy,Comment,Profile} from '@material-ui/icons';
import { userContext } from '../../userContext';
import AccountsideNav from './sidenav';
import InputEmoji from 'react-input-emoji'
import Navigation from './navigation';
import TopNav from './topnav';
import Snappy from '../../Sounds/Sweet.ogg';
import './accountfiles.css';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Posts(props) {
//fetch posts
const isMounted = useRef(false);
const [posts,setPosts] = useState([]);
const [replies,setReplies] = useState([]);
const [replytoreply,setReplyToReply] = useState([]);
const [audio] = useState(new Audio(Snappy));
const [isPlaying,setIsplaying] = useState(false);
const [postid,setPostId] = useState('7');
const [post,setReply] = useState('');
const [replytype,setReplyType] = useState('');
const [replyres,setReplyRes] = useState('');
const [resdisplay,setResDisplay] = useState(false);
const [description,setDescription] = useState('');
const [replyfoemshow,setReplyFormShow] = useState(false);
const [postuploading,setPostUploading] = useState(false);

//set subcommet reply details
const [rdescription,setRdescription] = useState('')
const setSubCommentDetails = (rdescription,rsn) => {
  setPostId(rsn)
  setDescription(rdescription)
  setReplyType('replyreply');
  setReplyFormShow(true);
}

//update updatepost id
const updatereplyid = (pid,description) => {
  setPostId(pid)
  setDescription(description)
  setReplyType('reply');
  setReplyFormShow(true);
}
//hide replydic
const hidereplydiv = (e) => {
  e.preventDefault();
  setReplyFormShow(false);
  setPostId('')
  setDescription('')
}
//Function to fetch reply to reply
const fetchreplytoreply = () => {
  if(isMounted.current) {
    axios({
    method: 'POST',
    url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/fetchreplies.php',
    headers: {
        'Content-Type': 'application/json',
        },
    data : {
            cuser: props.userid
        }
    })
    .then((res) => {
      if (res.data === "NoPosts") {
        
      } else {
        setReplyToReply(res.data);
        setIsplaying(true);
      }
      
    })
    .catch((err) => {

    })
  } else {
    isMounted.current = true;
  }
}

//function to fetch posts
const fetchposts = () => {
  if(isMounted.current) {
    axios({
    method: 'POST',
    url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/fetchposts.php',
    headers: {
        'Content-Type': 'application/json',
        },
    data : {
            cuser: props.userid
        }
    })
    .then((res) => {
      if (res.data === "NoPosts") {
        
      } else {
        setPosts(res.data);
        setIsplaying(true);
      }
      
    })
    .catch((err) => {

    })
  } else {
    isMounted.current = true;
  }
}
//fetch replies
const fetchreplies = () => {
  if(isMounted.current) {
    axios({
    method: 'POST',
    url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/fetchreplies.php',
    headers: {
        'Content-Type': 'application/json',
        },
    data : {
            cuser: props.userid
        }
    })
    .then((res) => {
      if (res.data === "NoPosts") {
        
      } else {
        setReplies(res.data);
      }
      
    })
    .catch((err) => {

    })
  } else {
    isMounted.current = true;
  }
}


//Play sound when posts get updated
useEffect(() => {
  if(isMounted.current){
    isPlaying ? audio.play() : audio.pause()
  }
  else {
    isMounted.current = true;
  }
},[isPlaying])


//
useEffect(() => {
  setInterval(fetchposts,1000);
  setInterval(fetchreplies,1000);
  setInterval(fetchreplytoreply,1000);
},[props.userid])

//send reply
const sendreply = (e) => {
  e.preventDefault();
  setPostUploading(true)
  var timezonediff = new Date().getTimezoneOffset();
  timezonediff = timezonediff == 0 ? 0 : -timezonediff;
  const formdata = new FormData();
  formdata.append('timezone',timezonediff);
  formdata.append('userid',props.userid);
  formdata.append('type',replytype);
  formdata.append('post',post);
  formdata.append('parentpost',postid);

  formdata.append('images[]',''); 
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
      setReplyRes('Reply Send Successfully');
      setResDisplay(true);
      setPostUploading(false)
      setPostId('')
      setDescription('')
      setReplyFormShow(false);
  } else {
      setReplyRes('Error while replying');
      setResDisplay(true);
      setPostUploading(false)
      setPostId('')
      setDescription('')
      setReplyFormShow(false);
  }
})
.catch((error) => {
      setPostUploading(false)
      setReplyRes('Network Error');
      setResDisplay(true);
      setPostUploading(false)
      setPostId('')
      setDescription('')
      setReplyFormShow(false);
})

}
//hide reply res
const hidepostres = () => {
  setResDisplay(false);
  setReplyRes('');
}
useEffect(() => {
  if(isMounted.current) {
    setInterval(hidepostres,10000);
  } else {
    isMounted.current = true;
  }
},[props.userid])



  return  (
    <>
    {
      posts.length == 0 ? '' :
      posts.map((post,index) => (
        <div key={index} style={{ marginBottom: '10px',borderBottom: '15px solid #f2f2f2',maxWidth:'600px' }}>
          <div>
            <h6>
              <img style={{ height: '40px',width:'40px',borderRadius: '50%' }}
              className="img-fluid img-thumbnail" src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${post.profilephoto}`}/>
              &nbsp; <span style={{ fontSize: '12px' }}>{post.Fname} {post.Lname}<br/><sup>{post.dateuploaded}</sup></span>
              </h6>
              <div style={{ display: 'flex',alignItems: 'center',justifyContent: 'center' }}>
                {post.Description}
              </div>
              <div className="postimageswrap">
              {
                post.images == null ? '' :
                post.images.split(',').map(image => 
                  <img 
              className={post.images.split(',').length > 1 ? "img-fluid img-thumbnail postimages" : "postimage img-fluid img-thumbnail"} src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${image}`}/>
                )
                
              }
    
              </div>
              {
                replies.length == 0 ? '' :
                <div className="replies">
                  {
                replies.map((reply,index) => (
                     reply.parentcomment == post.SN ? 
                     <div style={{ background: '#f2f2f2',marginLeft: '20%',marginRight: '10%',borderRadius: '15px',padding: '7px',marginBottom: '10px',height: 'auto' }} key={index}>
                       <h6>{reply.Fname} {reply.Lname} &nbsp;
                       <span><img style={{ width: '40px',height: '40px',borderRadius: '50%' }} src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${reply.profilephoto}`}/></span></h6>
                       <p>{reply.Description}</p>
                       <h6 style={{ color: 'red',fontSize: '15px' }}>Replied on :{reply.dateuploaded}</h6>
                       <hr/>
                       <div>
                         {
                           replytoreply.length == 0 ? '' :
                           replytoreply.map((replyreply,index) => (
                            replyreply.parentcomment == reply.SN ? 
                             <div key={index} className="replyreply">
                              <h6><img style={{ width: '30px',height: '30px',borderRadius: '50%' }} src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${replyreply.profilephoto}`}/>&nbsp;<span style={{ fontSize: '12px' }}>{replyreply.Fname} {replyreply.Lname}</span></h6>
                              <p>{replyreply.Description}</p>
                             </div> : ''
                           ))
                         }
                         </div>
                         <hr/>
                       <a onClick={() =>setSubCommentDetails(reply.Description,reply.SN)} href="#" style={{ marginRight: '0',textDecoration: 'none',color: '#cc0066',fontWeight: 'bold' }}>Reply</a>
                     </div> : '' 
                ))
                }     
                </div>
              }
              <hr/>
              <div className="postreslinks">
                <a href="#" style={{ float: 'left',color: 'purple' }}>&nbsp;Send Message</a>
                <a href="#">&nbsp;Follow Profile</a>
                <a href="#" style={{ float: 'right' }} onClick={() =>updatereplyid(post.SN,post.Description)}>
                  <Comment/>&nbsp;Reply</a>
              </div>
          </div>
        </div>
            
      )
      )
    }
    <div className={ replyfoemshow ? "replypostdiv" : 'hiddenresdiv' }>
                <p>{description}</p>
                <form action="#" method="POST">
                  <div className="form-group mb-2">
                    <textarea onChange={(e) =>setReply(e.target.value)} className="form-control" placeholder="Write your comment/Reply Here">

                    </textarea>
                  </div>
                  <div className="form-group mb-2">
                  <InputEmoji
                  className="form-control"
                  cleanOnEnter
                  placeholder="Type a message"
                />
                  </div>
                  <button style={{ float: 'left' }} onClick={hidereplydiv}>Cancel</button>
                  <button onClick={sendreply} style={{ float: 'right' }} type="submit">
                  { postuploading ? <CircularProgress color="secondary"/> : <Send/> }
                    </button>
                </form>
              </div>
        { resdisplay ? <div className="postres"><h6 className="text-center">{replyres}</h6></div> : '' }
    </>
  )
} 

export default Posts;
