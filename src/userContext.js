import React, { useState,useEffect,createContext } from 'react';

export const userContext = createContext();

const UserProvider = ({ children }) => {
    //const [userid,setuserid] = useState("");
    //const [username, setusername] = useState("");
    //const [password, setPassword] = useState("");
    //const [userprofile, setUserprofile] = useState("");
    //const [loginstatus, setLoginStatus] = useState(false);
    const [loggeduserdetails,setLoggedInuserDetails] = useState({
          userno: '',
          fname: '',
          lname: '',
          email: '',
          phone: '',
          county: '',
          profile: '',
          verified: 0,
          loggedstatus: false,
    });
    const [sidenavvis,setSideNavVisibility] = useState(true);

  return (
 <userContext.Provider value={{  
  loggeduserdetails,
  sidenavvis,
  setSideNavVisibility,
  setLoggedInuserDetails
 }}>
   {children}
 </userContext.Provider>
  );
} 

export default UserProvider;

