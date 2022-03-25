import React, { useState,useEffect,useContext, useRef } from 'react';
import { Button, Divider,CircularProgress } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal,Spinner } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect } from 'react-router-dom';
import { FaLeaf,FaAlignJustify,FaBars,FaUser,FaBeer,FaHome,FaPhone,FaTimes,FaShoppingCart } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {PhotoCamera,AddCircle} from '@material-ui/icons';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { userContext } from '../../userContext';
import AccountsideNav from './sidenav';
import Navigation from './navigation';
import TopNav from './topnav';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import './accountfiles.css';
import '../navbar.css';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

//handle multitsep form
function getSteps() {
  return ['Select where you want to upload your product', 'Fill Details', 'Select Images & Upload'];
}

function UploadProductsForm(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <FormControl className="mb-2" style={{ width: "97%" }}>
        <InputLabel className="text-danger" htmlFor="component-simple"><h5>Select Shop where to upload</h5></InputLabel>
        <NativeSelect onChange={getshopsn}>
        <option aria-label="None" value={shoptype} />
        {
         shops.map((shop,index) => (
          <option value={shop.SN} key={index}>
            {shop.Name}
            </option>
        )
         )
        }
        </NativeSelect>
      </FormControl>;
      case 1: 
        if (shoptype === "Farm Produce") {
          return <div>
            <FormControl className="mb-2" style={{ width: '97%' }}>
            <InputLabel><h5 className="text-info">Enter the Product Name</h5></InputLabel>
            <FilledInput value={prodname} onChange={(e) => setFarmProdName(e.target.value)} type="text"/>
            </FormControl>
            <FormControl className="mb-2" style={{ width: '97%' }}>
              <InputLabel><h5 className="text-info">Select the Produce type</h5></InputLabel>
              <NativeSelect onChange={(e) =>setFarmprodType(e.target.value)}>
              <option aria-label="None" value="" />
              <option value="animal">Animals and Animal Produce</option>
              <option value="cropproduce">Crop Produce</option>
              </NativeSelect>
            </FormControl>
            <FormControl className="mb-2" style={{ width: '100%' }}>
            <InputLabel><h5 className="text-info">Select or Type the product type</h5></InputLabel>
          <FilledInput value={actualfarmprod} onChange={(e) => setActaulFarmProd(e.target.value)} list="farmproducetype" name="farmproducetype" id="farmproduce" class="form-control"/>
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
        </FormControl>
        <div className="form-group mb-3">
            <label><h5 className="text-info">Description(More details not covered)</h5></label>
            <textarea onChange={(e) => setDescription(e.target.value)} rows="6" cols="6" className="form-control" name="description" placeholder="Describe any more details">
            {description}
            </textarea>
            </div>
            <FormControl className="mb-2" style={{ width: '97%' }}>
              <InputLabel><h5 className="text-info">Price</h5></InputLabel>
              <FilledInput value={price} onChange={(e) => setPrice(e.target.value)} type="number"/>
            </FormControl>
        </div>
        } else if(shoptype === "Agricultural services"){
          return <div>
          <FormControl className="" style={{ width: '100%' }}>
          <InputLabel><h5 className="text-info">Enter the type of service</h5></InputLabel>
          <FilledInput value={service} onChange={(e) => setService(e.target.value)} type="text"/>
          </FormControl>
          <div className="form-group mb-3">
          <label><h5 className="text-info">Description(More details not covered)</h5></label>
          <textarea onChange={(e) => setDescription(e.target.value)} rows="6" cols="6" className="form-control" name="description" placeholder="Give more details of your service">
          {description}
          </textarea>
          </div>
          <FormControl className="mb-2" style={{ width: '97%' }}>
            <InputLabel><h5 className="text-info">Price</h5></InputLabel>
            <FilledInput value={price} onChange={(e) => setPrice(e.target.value)} type="number"/>
          </FormControl>
          </div>
        } else if(shoptype === "Farm Inputs"){
          return <div>
          <FormControl className="mb-2" style={{ width: '97%' }}>
          <InputLabel><h5 className="text-info">Enter the Product Name</h5></InputLabel>
          <FilledInput value={prodname} onChange={(e) => setFarmProdName(e.target.value)} type="text"/>
          </FormControl>
          <FormControl className="mb-2" style={{ width: '97%' }}>
            <InputLabel><h5 className="text-info">Select the Farm Supply Type</h5></InputLabel>
            <NativeSelect onChange={(e) =>setFarmprodType(e.target.value)}>
            <option value="Farm Tools">Farm Tools</option>
            <option value="Farm Machinery">Farm Machinery</option>
            <option value="AgroChemicals">AgroChemicals</option>
            <option value="Fertilizers">Fertilizers</option>
            <option value="Animal Feeds">Animal Feeds</option>
            <option value="Piece of Land">FarmLand</option>
            </NativeSelect>
          </FormControl>
          <FormControl className="mb-2" style={{ width: '97%' }}>
            <InputLabel><h5 className="text-info">Enter the Brand (Where Applicable)</h5></InputLabel>
            <FilledInput value={brand} onChange={(e) => setBrand(e.target.value)} type="text"/>
          </FormControl>
          <FormControl className="mb-2" style={{ width: '97%' }}>
            <InputLabel><h5 className="text-info">Enter the Model (Where Applicable)</h5></InputLabel>
            <FilledInput value={model} onChange={(e) => setModel(e.target.value)} type="text"/>
          </FormControl>
          <FormControl className="mb-2" style={{ width: '97%' }}>
          <InputLabel><h5 className="text-info">Select the Condition (Where Applicable)</h5></InputLabel>
          <NativeSelect onChange={(e) => setCondition(e.target.value)}>
          <option aria-label="None" value={condition} />
            <option value="Brand New">Brand New</option>
            <option value="Fairly Used">Fairly Used</option>
            <option value="Refurbished">Refurbished</option>
            <option value="Old">Old</option>
          </NativeSelect>
      </FormControl>
      <div className="form-group mb-3">
          <label><h5 className="text-info">Description(More details not covered)</h5></label>
          <textarea onChange={(e) => setDescription(e.target.value)} rows="6" cols="6" className="form-control" name="description" placeholder="Describe any more details">
          {description}
          </textarea>
          </div>
          <FormControl className="mb-2" style={{ width: '97%' }}>
            <InputLabel><h5 className="text-info">Price</h5></InputLabel>
            <FilledInput value={price} onChange={(e) => setPrice(e.target.value)} type=""/>
          </FormControl>
      </div>
        };
      case 2:
        return <div className="form-group mb-2">
        <input hidden value={props.userid} type="number"/>
        <div className="formgroup mb-3">
        <label htmlFor="file" className="text-bold" style={{ width: '100%', cursor: 'pointer' }}><h6 href="#" style={{ display: 'flex', justifyContent: 
          'center', alignItems: 'center',background: 'green', borderRadius: '25px',
          padding: '10px',width: '100%',fontWeight: 'bold' }}>Select Product Images</h6></label>
          <input hidden onChange={handleimages} id="file" type="file" multiple/>
        </div>
        <div>
          <div className="mb-2 d-flex align-items-center justify-content-center" style={{ width: '100%',height: '200px',overflowX: 'auto' }}>
          {
            srcs.length == 0 ? '' : 
            srcs.map((src) =>( 
              <img style={{ padding: '10px' }} className="img-thumbnail img-fluid" src={src}/>
            ))
          }
        </div>
        </div>
        <div className="form-group" style={{ width: '100%',textAlign: 'center' }}>
        <Button type="submit" onClick={handlesubmit} className="btn btn-block" color="primary" variant="contained" type="submit">Upload Product</Button>
        </div>
        <hr/>
        </div>
        
        
      default:
        return 'Unknown stepIndex';
    }
  }

//update form fields
const [shopsn,setShopsn] = useState("");
const [shoptype,setShoptype] = useState('');
const [cshopname,setCshopName] = useState('');
const getshopsn = (e) => {
  const shopty = e.target.value;
  setShopsn(shopty);
}
//select shoptype
useEffect(() =>{
  if (isMounted.current) {
    axios({
      method: 'POST',
      url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/shoptype.php',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        userid: props.userid,
        sid: shopsn
      }
    })
    .then((response) => {
      const shopdetails = response.data;
      setShoptype(shopdetails.shoptype);
      setCshopName(shopdetails.Name);
    })
    .catch((error) => {
    })
  }
   isMounted.current = true; 
},[shopsn])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

//registerbusiness fields start
/* const [{files,srcs},setFiles] = useState({
    files: null,
    srcs: []
}); */
const [files,setFiles] = useState("");
const [srcs,setSrcs] = useState([]);
const [shopname,setShopName] = useState("");
const [shops,setShops] = useState([]);
const [shopdescription,setShopDescription] = useState("");
const [businesstype,setBusinesstype] = useState("");
const [{shopcoverphoto,shopsrc},setShopCoverPhoto] = useState({
  shopcoverphoto : '',
  shopsrc : ''
}); 

const handleshopimage = (e) => {
  if(e.target.files[0]) {
    setShopCoverPhoto({
      shopcoverphoto: e.target.files[0],
      shopsrc: URL.createObjectURL(e.target.files[0])
    })
  }
}
//handle product image
const handleimages = (e) => {
  const urls = [];
  setFiles(e.target.files);
  //const images = [];
  for (let i = 0; i < e.target.files.length; i++) {
    //images.push(e.target.files[i]);
    urls.push(URL.createObjectURL(e.target.files[i]))
  }
  setSrcs(urls);
/*  setFiles({
    files: images,
    srcs: urls
  }); */
}
//print number of images
useEffect(() =>{
console.log(files)
console.log(srcs)
},[files,srcs])
//fetch number of shops
const fetchnumberofshops = () => {
  axios({
    method: 'POST',
      url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/fetchshops.php',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id: props.userid
      }
  })
  .then((response) => {
    console.log(props.userid)
    console.log(response.data)
    
    if (response.data === "NoData") {
      displayshops(shops);
    } else {
      setShops(response.data);
      displayshops(shops);
      //console.log(props.shops)
    }
    
  })
  .catch((error) => {
     console.log(error) 
  })
}
//run the parent shops class
useEffect(() => {
  if (isMounted.current) {
    fetchnumberofshops()
    displayshops(shops);
  } else {
    isMounted.current = true;
  } 
},[props.userid])
//display shops
 const displayshops = (shops) => {
  return shops.length == 0 ? "" :
  shops.map((shop,index) => (
    <div key={index}>
      <div style={{ padding: '5px' }}>
    <img style={{ borderRadius: '50%', height: '70px',width: '70px' }} className="img-fluid img-thumbnail" src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${shop.profile}`}/>
    <p>{shop.Name}</p>
    </div>
    </div>
  )
  )

  
} 

//submit shop data
const handleshopsubmit = (e) => {
  e.preventDefault();
  const formdata = new FormData();
  formdata.append('owner',props.userid);
  formdata.append('shopname',shopname);
  formdata.append('shoptype',businesstype);
  formdata.append('description',shopdescription);
  formdata.append('shopcoverphoto',shopcoverphoto);
  axios({
    method: 'POST',
      url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/registershop.php',
      headers: {
        'Content-Type': 'application/json',
      },
      data: formdata
  })
  .then((res) => {
     if(res.data.status === "success") {
      handleClose1();
      setResponse(res.data);
      setRegResponse(res.data.message);
      setResponseVisibility(true);
      fetchnumberofshops();
      displayshops(shops);
      setShopName("");
      setShopDescription("");
      setShoptype("");
      setShopCoverPhoto({
        shopcoverphoto : '',
        shopsrc : ''
      });
    } else {
      fetchnumberofshops();
      displayshops(shops);
      handleClose1();
      setRegResponse(res.data.message);
      setResponse(res.data);
      setRegResponse(res.data.message);
      setResponseVisibility(true);
    } 
  })
  .catch((error) => {
    handleClose1();
    setRegResponse("Sorry! RThe server is unreachable.Please try again Later");
    setResponseVisibility(true);
    displayshops(shops);
  })
}
//registerbusiness end
//form fields start
const [resdivvis,setResponseVisibility] = useState(false);
const [regresponse,setRegResponse] = useState("");
const [response,setResponse] = useState([]);
const [userid,setUserid] = useState(props.userid);
const [producttype,setType] = useState("noform");
const [prodname,setFarmProdName] = useState('');
const [farmprodtype,setFarmprodType] = useState('');
const [actualfarmprod,setActaulFarmProd] = useState('');
const [service,setService] = useState('');

const [actualfarminput,setActaulfarmInput] = useState('');
const [farminputtype,setFarmInputType] = useState('');
const [brand,setBrand] = useState('');
const [model,setModel] = useState('');
const [condition,setCondition] = useState('');
const [description,setDescription] = useState('');
const [price,setPrice] = useState('');

const [{coverphoto,src},setCoverPhoto] = useState({
  coverphoto : '',
  src : ''
});
//form fieleds end

//check whether there are shops
useEffect(() => {
  if (isMounted.current) {
    fetchnumberofshops();
  } else {
    isMounted.current = true;
  }
    
},[props.userid])
//handleimage preview 
const handleimage = (e) => {
  if(e.target.files[0]) {
    setCoverPhoto({
      coverphoto: e.target.files[0],
      src: URL.createObjectURL(e.target.files[0])
    })
  }
}
//Get number of products
const productsnumber = () => {
  axios({
    method: 'POST',
      url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/productsnumber.php',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id: props.userid
      }
  })
  .then((response) => {
    console.log(response.data)
    props.setNumberofProducts(response.data)
  })
  .catch((error) => {
     console.log(error) 
  })
}

//products modal
const isMounted = useRef(false);
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

//shops modal
const [show1, setShow1] = useState(false);
const handleClose1= () => setShow1(false);
const handleShow1 = () => setShow1(true);

const [activesubmit,setActiveSubmit] = useState("disabled");

//load more form fields
const handlemoreform = (e) => {
    if(e.target.value){
        setType(e.target.value);
    }
}
//Hide response text
const hideresponsetext = (e) => {
  e.preventDefault();
  setResponseVisibility(false);

}
//handle form submission
const handlesubmit = (e) =>{
  e.preventDefault();
    if (files.length == 0) {
      alert("Please select some images of the product to upload");
    } else {
    const formdata = new FormData();
    formdata.append('owner',props.userid);
    formdata.append('shopid',shopsn);
    formdata.append('shoptype',shoptype);
    formdata.append('account',cshopname);
    formdata.append('productname',prodname);
    formdata.append('farmproducttype',farmprodtype);
    formdata.append('actualfarmproduct',actualfarmprod);
    formdata.append('description',description);
    formdata.append('price',price);
    formdata.append('service',service);
    formdata.append('brand',brand);
    formdata.append('model',model);
    formdata.append('condition',condition);

    for (let i = 0; i < files.length; i++) {
      formdata.append('images[]',files[i]);
    }

    axios({
      method: 'POST',
        url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/uploadproduct.php',
        headers: {
          'Content-Type': 'application/json',
        },
      data: formdata
    })
    .then((res) => {
      if (res.data.status === "success") {
        setResponse(res.data.message);
        setRegResponse(res.data.message);
        handleClose();
        productsnumber();
        setResponseVisibility(true);
        setShopsn("");
        setShoptype("");
        setCshopName("");
        setFarmProdName("");
        setFarmprodType("");
        setActaulFarmProd("");
        setDescription("");
        setPrice("");
        setService("");
        setBrand("");
        setModel("");
        setCondition("");
        setFiles("");
        setSrcs([]);
      } else {
        setResponse(res.data.essage);
        productsnumber();
        setRegResponse(res.data.message);
        setResponseVisibility(true);
      }
      
    })
    .catch((error) => {
      setRegResponse("Sorry! The server is unreachable");
      handleClose();
    })
  }
  }
  //Handle nest step
  useEffect(() => {
    if (isMounted.current) {
      console.log(typeof(response));
    } else {
      isMounted.current = true;
    }
    
  },[response]) 

//display shops

  return (    
  <div className="mt-2"> 
     {
      shops.length == 0 ? <h6 className="text-center text-info">Please Click the 
      "ADD A SHOP" Button Below to create atleast one shop where you will upload products</h6> : ""
    }
      <div className="mb-2" style={{ overflowX: 'auto',display: 'flex',justifyContent:'center',alignItems:'center'  }} >
        {
          displayshops(shops)
        }
      </div>

      <div className={ resdivvis ? 'responsetext' : 'hiddendiv' }>
            <p className="text-center" style={{ backgroundColor: '#ff8080',
        padding: '10px' }}>{regresponse}<span><a style={{ marginLeft: '10px' }} href="#" onClick={hideresponsetext}><FaTimes/></a></span></p>
        </div>

      <Button variant="contained" color="primary" onClick={handleShow1} style={{ float: 'left' }}><span><AddCircle/></span>&nbsp;Add A Shop</Button>
      <Button disabled={ shops.length == 0 ? 'disabled' : '' } variant="contained" color="secondary"  onClick={handleShow} style={{ float: 'right' }}><span><AddCircle/></span>&nbsp;Add A Product</Button>
      <Modal size="md" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Upload Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <form action="#" method="POST" encType="multipart/form-data">

         <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
                color="secondary"
                variant="contained"
              >
                Back
              </Button>
              {
                activeStep === steps.length - 1 ? '' : <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
              }

            </div>
          </div>
        )}
      </div>
    </div>

         </form> 
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal> 

      
      <Modal size="md" show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <h4 className="text-center text-info">Create A shop</h4>
        </Modal.Header>
        <Modal.Body>
         <form action="#" method="POST" encType="multipart/form-data">
           <input hidden type="number" value={props.userid}/>
            <FormControl className="mb-2" style={{ width: '100%' }}>
              <InputLabel className="text-danger"><h5>Shop Name</h5></InputLabel>
              <FilledInput onChange={(e) => setShopName(e.target.value)} type="text"/>
            </FormControl>
            <FormControl className="mb-2" style={{ width: '97%' }}>
              <InputLabel className="text-danger" htmlFor="component-simple"><h5>Type of Business</h5></InputLabel>
              <NativeSelect onChange={(e) => setBusinesstype(e.target.value)}>
              <option aria-label="None" value="" />
              <option value="Agricultural services">Agricultural Services</option>
              <option value="Farm Produce">Farm Produce</option>
              <option value="Farm Inputs">Farm Inputs</option>
              </NativeSelect>
            </FormControl>
            <div className="form-group mb-3">
            <InputLabel className="text-danger" htmlFor="component-simple"><h5>Describe your Business</h5></InputLabel>
            <textarea onChange={(e) => setShopDescription(e.target.value)} rows="4" cols="4" className="form-control" name="description" placeholder="Describe any more details">
            
            </textarea>
            </div>
            <div className="formgroup mb-3">
            <label htmlFor="file" className="text-bold" style={{ width: '100%', cursor: 'pointer' }}><h6 href="#" style={{ display: 'flex', justifyContent: 
              'center', alignItems: 'center',background: 'green', borderRadius: '25px',
              padding: '10px',width: '100%',fontWeight: 'bold' }}>Select Shop Profile</h6></label>
              <input hidden onChange={handleshopimage} id="file" type="file" multiple/>
            </div>
            <div className="mb-2 d-flex align-items-center justify-content-center">
              {
                shopsrc === "" ? '' : <img className="img-thumbnail img-fluid" src={shopsrc} />
              }
            </div>
            <div className="form-group" style={{ width: '100%',textAlign: 'center' }}>
            <Button type="submit" onClick={handleshopsubmit} className="btn btn-block" color="primary" variant="contained" type="submit">Create Shop</Button>
            </div>
      
         </form>
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>

    </div> 
  )
} 

export default UploadProductsForm;
