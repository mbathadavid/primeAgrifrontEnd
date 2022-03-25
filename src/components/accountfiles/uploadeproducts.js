import React, { useState,useEffect,useContext, useRef } from 'react';
import { Button, Divider,CircularProgress } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal,Spinner } from 'react-bootstrap';
//import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect } from 'react-router-dom';
import { FaLeaf,FaAlignJustify,FaBars,FaUser,FaBeer,FaHome,FaPhone,FaTimes,FaShoppingCart,FaEdit,FaDelete,FaInfo,FaTrash } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {PhotoCamera,AddCircle} from '@material-ui/icons';
import { userContext } from '../../userContext';
import AccountsideNav from './sidenav';
import Navigation from './navigation';
import TopNav from './topnav';
import './accountfiles.css';
import '../navbar.css';
import UploadProductsForm from './uploadproductfrom';
import axios from 'axios';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function UploadedProductsPage() {
const loggedinuserdetails = useContext(userContext);
const isMounted = useRef(false);
const [userid,setUserid] = useState("");
const [fname,setFname] = useState("");
const [lname,setLname] = useState("");
const [email,setEmail] = useState("");
const [phone,setPhone] = useState("");
const [county,setCounty] = useState("");
const [profile,setProfile] = useState("");
const [verified,setVerfied] = useState("");
const [products,setProducts] = useState([]);
const navigate = useNavigate();
const [numberofproducts,setNumberofProducts] = useState();
const teststatus = JSON.stringify(loggedinuserdetails.loggeduserdetails.loggedstatus);

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

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

//Get products count
const productsnumber = () => {
  axios({
    method: 'POST',
      url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/productsnumber.php',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id: userid
      }
  })
  .then((response) => {
    console.log(response.data)
    setNumberofProducts(response.data)
  })
  .catch((error) => {
     console.log(error) 
  })
}
//fetchshops
const [shops,setShops] = useState([]);
useEffect(() => {
  if (isMounted.current) {
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
  .then((res) => {
    console.log(res.data)
    setShops(res.data);
  })
  .catch((err) => {
  
  })
  } else {
    isMounted.current = true;
  }
},[userid])
//show selected update category
const handleshopchange = (e) => {
  if(e.target.value){
    const selectarray = e.target.value.split(',');
    setUcategory(selectarray[2]);
    setUaccount(selectarray[1]);
    setUsn(selectarray[0]);
  }
}

//fetch uploaded products
useEffect(() => {
  if (isMounted.current) {
    axios({
      method: 'POST',
      url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/fetchproducts.php',
      headers : {
        'Content-Type': 'application/json',
      },
      data: {
        id: userid
      }
    })
    .then((response)=>{
      console.log(response.data);
      if (response.data === "NoData") {
        
      } else {
        console.log(response.data);
        setProducts(response.data);
      }
    })
    .catch((error) => {

    })
  } else {
    isMounted.current = true;
  }
},[userid,numberofproducts]);

//Handle product detail viewing
const [showproductdetails, setShowProductDetails] = useState(false);
const handleCloseProductDetails = () => setShowProductDetails(false);
const handleShowProductDetails = () => setShowProductDetails(true);
const [prodcategory,setProdCategory] = useState("This is the category");
const [images,setImages] = useState(null);
const [proddetails,setProdDetails] = useState(null);
const handleproductview = (id,category) => {
  console.log(id);
  setProdCategory(category);
  axios({
    method: 'POST',
      url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/fetchoneproductdetails.php',
      headers : {
        'Content-Type': 'application/json',
      },
      data: {
        pid: id
      }
  })
  .then((res) => {
    const images = res.data.moreimages;
    const arrayimages = images.split(',');
    const length = arrayimages.length;
    console.log(res.data);
    setProdDetails([res.data]);
    setImages(arrayimages);
    
  })
  .catch((error) => {

  })
  handleShowProductDetails();
}
//handle product delete
const [deleteconfirmation,setDeleteConfirmation] = useState(false);
const [deleteid,setDeleteId] = useState();
const handledelete = (id) => {
  setDeleteConfirmation(true);
  setDeleteId(id);
}
//hide delete 
const hidedeletehide = (e) => {
  e.preventDefault();
  setDeleteConfirmation(false)
}
//Hide response text
const hideresponsetext = (e) => {
  e.preventDefault();
  setResponseVisibility(false);

}
//Finalize delete
const [resdivvis,setResponseVisibility] = useState(false);
const [regresponse,setRegResponse] = useState("");
const proceedwithdelete = (e) => {
  e.preventDefault();
  axios({
    method: 'POST',
    url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/deleteproduct.php',
    headers : {
        'Content-Type': 'application/json',
      },
    data: {
        pid: deleteid
    }
  })
  .then((res) => {
    if (res.data.status === 'success') {
        setDeleteConfirmation(false);
        setResponseVisibility(true)
        setRegResponse(res.data.message);
        setDeleteId("");
        productsnumber();
    } else {
      setDeleteConfirmation(false);
      setResponseVisibility(true)
      setRegResponse(res.data.message);
    }
  })
  .catch((error) => {
    setDeleteConfirmation(false);
    setRegResponse("Sorry! Server is unreachable, Please try again Later");
    setResponseVisibility(true);
  })
}
//handle update images
const handleupdateimages = (e) => {
  const urls = [];
  setNewimages(e.target.files);
  for (let i = 0; i < e.target.files.length; i++) {
    urls.push(URL.createObjectURL(e.target.files[i])); 
  }
  setUrls(urls);
}
//handle update
const [showproductupdate, setShowProductUpdate] = useState(false);
const handleCloseProductUpdate = () => setShowProductUpdate(false);
const handleShowProductUpdate = () => setShowProductUpdate(true);
const [pSN,setPSN] = useState();
const [ucategory,setUcategory] = useState('');
const [usn,setUsn] = useState();
const [uaccount,setUaccount] = useState('');
const [uprodname,setUprodname] = useState('');
const [uprodtype,setUprodtype] = useState('');
const [uactualfarmprod,setUactualfarmprod] = useState('');
const [ufarminputtype,setUfarminputtype] = useState('');
const [uactualfarminput,setUactualfarminput] = useState('');
const [uservice,setUservice] = useState('');
const [ubrand,setUbrand] = useState('');
const [umodel,setUmodel] = useState('');
const [ustatus,setUstatus] = useState('');
const [uprice,setUprice] = useState('');
const [udescription,setUdescription] = useState('');
const [newimages,setNewimages] = useState('');
const [ucoverphoto,setUcoverphoto] = useState('');
const [uimages,setUimages] = useState([]);
const [uurls,setUrls] = useState([]);
const handleupdate = (SN,aid,psn,category,account,productname,producttype,actualfarmprod
  ,farminputtype,actualfarminput,service,brand,model,status,price,description,coverphoto,moreimages) => {
    handleShowProductUpdate();
    setNumberofProducts(0);
    setPSN(SN);
    setUcategory(category);
    setUsn(psn);
    setUaccount(account);
    setUprodname(productname);
    setUprodtype(producttype);
    setUactualfarmprod(actualfarmprod);
    setUfarminputtype(farminputtype);
    setUactualfarminput(actualfarminput);
    setUservice(service);
    setUbrand(brand);
    setUmodel(model);
    setUstatus(status);
    setUprice(price);
    setUdescription(description);
    setUcoverphoto(coverphoto);
    const arrayimages = moreimages.split(',');
    setUimages(arrayimages);
  }
//Jvascript timed function


//handle update form submission
const submitupdate = (e) => {
  e.preventDefault();
  const formdata = new FormData();
  formdata.append('PSN',pSN);
  formdata.append('category',ucategory);
  formdata.append('usn',usn);
  formdata.append('account',uaccount);
  formdata.append('prodname',uprodname);
  formdata.append('prodtype',uprodtype);
  formdata.append('actualfarmprod',uactualfarmprod);
  formdata.append('farminputtype',ufarminputtype);
  formdata.append('actualfarminput',uactualfarminput);
  formdata.append('service',uservice);
  formdata.append('brand',ubrand);
  formdata.append('model',umodel);
  formdata.append('status',ustatus);
  formdata.append('price',uprice);
  formdata.append('description',udescription);
  formdata.append('coverphoto',ucoverphoto);

  if (newimages.length > 0) {
    for (let i = 0; i < newimages.length; i++) {
      formdata.append('images[]',newimages[i])
    }   
  } else {
      formdata.append('images[]',uimages);
  }

  axios({
      method: 'POST',
      url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/updateproduct.php',
      headers : {
          'Content-Type': 'application/json',
        },
      data: formdata
  })
  .then((res) => {
    if (res.data.status === "success") {
      setRegResponse(res.data.message);
      setResponseVisibility(true);
      handleCloseProductUpdate();
      setPSN('');
      setUcategory('');
      setUsn('');
      setUaccount('');
      setUprodname('');
      setUprodtype('');
      setUactualfarmprod('');
      setUfarminputtype('');
      setUactualfarminput('');
      setUservice('');
      setUbrand('');
      setUmodel();
      setUstatus('');
      setUprice('');
      setUdescription('');
      setUcoverphoto('');
      setNewimages('');
      setUimages([]);
      setUrls([]);
      productsnumber();
    } else {
      setRegResponse(res.data.message);
      setResponseVisibility(true);
      handleCloseProductUpdate();
      productsnumber();
    }
  })
  .catch((error) => {
    setRegResponse("Sorry! Server is unreachable, Please try again Later");
    setResponseVisibility(true);
    handleCloseProductUpdate();
  })

}

// const displayproducts = (products) => {
  const displayproducts = (products) => {
  return products.length == 0 ? "" :
  products.map((product,index) => (
    <tr key={index}>
    <td><div style={{ width: '80px',height: '65px' }}><img 
    className="img-fluid" src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${product.coverphoto}`}/></div></td>
    <td>{product.productname}</td>
    <td>{product.category}</td>
    <td>{product.account}</td>
    <td>{product.price}</td>
    <td>{product.description}</td>
    <td>
      <a href="#" title="Edit" onClick={() => handleupdate(product.SN,product.aid,product.psn,product.category,product.account,
        product.productname,product.producttype,product.actualfarmprod,product.farminputtype,product.actualfarminput,
        product.service,product.brand,product.model,product.status,product.price,product.description,product.coverphoto,product.moreimages)}><FaEdit className="text-success"/></a>
      <a href="#" title="Details" onClick={() => handleproductview(product.SN,product.category)}><FaInfo className="text-info"/></a>
      <a href="#" title="Delete" onClick={()  =>handledelete(product.SN)}><FaTrash className="text-danger"/></a>
      </td>
    </tr>
  )
  )
} 


  return teststatus === 'false' && sessionStorage.length <= 1 ? (navigate("/SignIn")) : 
  (<div>
    <Navigation image={profile} fname={fname} lname={lname}/>
    <div className= {loggedinuserdetails.sidenavvis ? "mainaccountcontent" : "hiddenmainaccountcontent" }>
    <div className="container">
      <UploadProductsForm numberofproducts={numberofproducts} setNumberofProducts={setNumberofProducts} userid={userid}/>
      <div className="container">
    {
      products.length == 0 ?  <table class="table table-responsive">
      <thead>
        <tr>
          <th scope="col">Photo</th>
          <th scope="col">Name</th>
          <th scope="col">Category</th>
          <th scope="col">Account</th>
          <th scope="col">Price</th>
          <th scope="col">Description</th> 
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        
    </tbody>
  </table>:
      <table style={{ width: '100%',overflowX: 'auto' }} class="table table-responsive">
      <thead>
        <tr>
          <th scope="col">Photo</th>
          <th scope="col">Name</th>
          <th scope="col">Category</th>
          <th scope="col">Account</th>
          <th scope="col">Price</th>
          <th scope="col">Description</th> 
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
       {
         displayproducts(products)
       } 
    </tbody>
  </table>
    }
    
 
      </div>
    </div>
    </div>

    <div className={ deleteconfirmation ? 'onview' : 'hiddendelalert' }>
      <a href="#" style={{ float: 'right' }} onClick={hidedeletehide}><FaTimes/></a>
      <h6 className="mb-5 text-center">Are you sure to delete this product?</h6>
      <a href="#" onClick={hidedeletehide} className="btn btn-primary">No</a>
      <a href="#" onClick={proceedwithdelete} style={{ float: 'right' }} className="btn btn-primary">
        Yes</a>
    </div>

    <Modal size="md" show={showproductdetails} onHide={handleCloseProductDetails}>
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
          <div>
            {
              proddetails == null ? '' :
              proddetails.map(proddetail =>
                <div>
                  { proddetail.category === '' ? '' : <h6 className="text-center">Category : <span className="text-danger">{proddetail.category}</span></h6> }
                  { proddetail.productname === '' ? '' : <h6 className="text-center">Name: <span className="text-danger">{proddetail.productname}</span></h6> }
                  { proddetail.account === '' ? '' : <h6 className="text-center">Account : <span className="text-danger">{proddetail.account}</span></h6> }
                  { proddetail.service === '' ? '' : <h6 className="text-center">Service : <span className="text-danger">{proddetail.service}</span></h6> }
                  { proddetail.actualfarmprod === '' ? '' : <h6 className="text-center">Actual Farm Product : <span className="text-danger">{proddetail.actualfarmprod}</span></h6> }
                  { proddetail.brand === '' ? '' : <h6 className="text-center">Brand : <span className="text-danger">{proddetail.brand}</span></h6> }
                  { proddetail.model === '' ? '' : <h6 className="text-center">Model : <span className="text-danger">{proddetail.model}</span></h6> }
                  { proddetail.status === '' ? '' : <h6 className="text-center">Condition : <span className="text-danger">{proddetail.status}</span></h6> }
                  { proddetail.price === '' ? '' : <h6 className="text-center">Price : <span className="text-danger">{proddetail.price}</span></h6> }
                  { proddetail.description === '' ? '' : <div>Description : <span className="text-success">{proddetail.description}</span></div> }
                </div>
                )
            }
          </div>
          <div style={{ display: 'flex',overflowX: 'auto',height: '100px' }}>
          {
            images == null ? 'There are no items to print' :
            images.map(image => 
              <img className="img-fluid" style={{ padding: '10px' }} src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${image}`}/>
            )
          }
          </div>
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>


      <Modal size="md" show={showproductupdate} onHide={handleCloseProductUpdate}>
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          
          <div className="form-group mb-1" style={{ width: '100%' }}>
            <label><h6 className="text-danger">Select Account</h6></label>
            <select className="form-control" onChange={handleshopchange}>
            <option value={[usn,uaccount,ucategory]}>{uaccount}</option>
            
            </select>
          </div>
          {
            ucategory === "Agricultural services" ? "" :
            <>
          <div className="form-group mb-1" style={{ width: '100%' }}>
            <label><h6 className="text-danger">Product Name</h6></label>
            <input type="text" onChange={(e) => setUprodname(e.target.value)} value={uprodname} className="form-control"/>
          </div>
          <div className="form-group mb-1" style={{ width: '100%' }}>
            <label>
              <h6 className="text-danger">{ uprodtype === "cropproduce" || uprodtype === "animal" ? "Select Farm Produce Type" : "Farm Supply Type" }</h6>
              </label>
            <select className="form-control" onChange={(e) => setUprodtype(e.target.value)}>
            <option value={uprodtype}>{uprodtype}</option>
            {
              uprodtype === "cropproduce" || uprodtype === "animal" ? 
              <>
              <option value="animal">Animals and Animal Produce</option>
              <option value="cropproduce">Crop Produce</option>
              </>
              :
              <>
            <option value="Farm Tools">Farm Tools</option>
            <option value="Farm Machinery">Farm Machinery</option>
            <option value="AgroChemicals">AgroChemicals</option>
            <option value="Fertilizers">Fertilizers</option>
            <option value="Animal Feeds">Animal Feeds</option>
            <option value="Piece of Land">FarmLand</option>
            </>
            }
            </select>
          </div>
          </>
          }

          {
            ucategory === "Agricultural services" || ucategory === "Farm Inputs" ? "" :
          <div className="form-group mb-2" style={{ width: '100%' }}>
            <label><h6 className="text-danger">Actual Farm Product</h6></label>
            <input value={uactualfarmprod} onChange={(e) => setUactualfarmprod(e.target.value)} list="farmproducetype" name="farmproducetype" id="farmproduce" class="form-control"/>
              <datalist id="farmproducetype">
                <option value="Poultry"/>
                <option value="Cattle"/>
                <option value="Goats"/>
                <option value="Tea"/>
                <option value="Coffee"/>
                <option value="Maize"/>
                <option value="Beans"/>
                <option value="Tomatoes"/>
                <option value="Pyrethrum"/>
                <option value="Kales"/>
                <option value="onion"/>
              </datalist>
          </div>
          }

          {
           ucategory === "Agricultural services" || ucategory === "Farm Produce" ? "" :
           <> 
          <div className="form-group mb-1" style={{ width: '100%' }}>
            <label><h6 className="text-danger">Brand (Where applicable)</h6></label>
              <input onChange={(e) => setUbrand(e.target.value)} type="text" value={ubrand} className="form-control"/>
          </div>
          <div className="form-group mb-1" style={{ width: '100%' }}>
            <label><h6 className="text-danger">Model (Where applicable)</h6></label>
              <input onChange={(e) => setUmodel(e.target.value)} type="text" value={umodel} className="form-control"/>
          </div>
          <div className="form-group mb-1" style={{ width: '100%' }}>
            <label><h6 className="text-danger">Select Condition</h6></label>
            <select className="form-control" onChange={(e) => setUstatus(e.target.value)}>
              <option value={ustatus}>{ustatus}</option>
              <option value="Brand New">Brand New</option>
              <option value="Fairly Used">Fairly Used</option>
              <option value="Refurbished">Refurbished</option>
              <option value="Old">Old</option>
            </select>
          </div>
          </>
          }

          {
          ucategory === "Farm Inputs" || ucategory === "Farm Produce" ? "" :
          <div className="form-group mb-1" style={{ width: '100%' }}>
            <label><h6 className="text-danger">Service</h6></label>
            <input className="form-control" type="text" value={uservice} onChange={(e) => setUservice(e.target.value)}/>
          </div>
          }
        <div className="form-group mb-1" style={{ width: '100%' }}>
          <label><h6 className="text-danger">Description</h6></label>
          <textarea className="form-control" rows="6" cols="6" onChange={(e) => setUdescription(e.target.value)}>
            {udescription}
          </textarea>
        </div>
        <div className="form-group mb-1" style={{ width: '100%' }}>
          <label><h6 className="text-danger">Price</h6></label>
          <input className="form-control" type="number" value={uprice} onChange={(e) => setUprice(e.target.value)}/>
        </div>
        <div className="form-group mb-1" style={{ width: '100%' }}>
          <label className="bg-success" htmlFor="files" style={{ display: 'flex',justifyContent: 'center',alignItems: 'center',padding: '10px',borderRadius: '25px',cursor: 'pointer' }}>
            <h6 className="text-center text-info">
            Click to Select Product Images
            </h6></label>
          <input multiple hidden onChange={handleupdateimages} id="files" type="file" className="form-control"/>
        </div>

          <div style={{ display: 'flex',overflowX: 'auto',height: '100px' }}>
        {
            uurls.length > 0 ?  
            uurls.map(url => (
              <img className="img-fluid" style={{ padding: '10px' }} src={url}/>
            ))
            :
            uimages.map(image => 
              <img className="img-fluid" style={{ padding: '10px' }} src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${image}`}/>
            )
          }
          </div>
          <div className="form-group mt-3 mb-2" style={{ width: '100%' }}>
          <button onClick={submitupdate} className="btn btn-primary btn-block form-control" type="submit">Update</button>
          </div>
        </Modal.Footer>
      </Modal>

      <div className={ resdivvis ? 'responsetext1' : 'hiddendiv' }>
            <p className="text-center" style={{ backgroundColor: '#ff8080',
        padding: '10px' }}>{regresponse}<span><a style={{ marginLeft: '10px' }} href="#" onClick={hideresponsetext}><FaTimes/></a></span></p>
        </div>
    </div>
  )
} 

export default UploadedProductsPage;
