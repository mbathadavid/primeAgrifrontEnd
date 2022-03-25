import React, { useState,useEffect,useContext } from 'react';
import { Button, Divider } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavBar from './navbar';
import NavBar2 from './navbar2';
import Footer from './footer';
import axios from 'axios';


function MarketPage() {
  const [products,setProducts] = useState([]);

  useEffect(() => {
    axios({
      method: 'POST',
        url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/fetchallproducts.php',
        headers : {
          'Content-Type': 'application/json',
        },
        data: {
          action : 'fetchall'
        }
    })
    .then((res) => {
      console.log(res.data);
      setProducts(res.data);
    })
    .catch((error) => {

    })
  },[])

  const fetchproducts = () => {
    axios({
      method: 'POST',
        url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/fetchallproducts.php',
        headers : {
          'Content-Type': 'application/json',
        },
        data: {
          action : 'fetchall'
        }
    })
    .then((res) => {
      setProducts(res.data);
    })
    .catch((error) => {

    })
  }

  setInterval(fetchproducts,5000)

  return (
   <div>
   <NavBar2/>
   <div className="maincontent">
     <h2 className="text-center text-info">The market Place</h2>
      <hr/>
      <div className="products">
      <div className="FarmProducts">
        <h3 className="text-center">Farm products</h3>
        <div style={{ display: 'flex',justifyContent: 'space-between',alignItems: 'center',flex: 'wrap',overflowX: 'auto' }}>
          {
            products.length == 0 ? '' :
            products.map((product,index) => (
              <div key={index} style={{ padding: '10px' }}>
                {
                  product.category === "Agricultural services" || product.category === "Farm Inputs" ? '' :
                  <div style={{ height: '150px',width: '100px' }}>
                  <h6>{product.productname}</h6>
                  <Link to=""><img className="img-fluid" src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${product.coverphoto}`}/></Link>
                  </div>
                }   
              </div>  
            )
            )
          }
        </div>
      </div>
      <div className="FarmInputs">
        <h3 className="text-center">Farm Supplies</h3>
        <div style={{ display: 'flex',justifyContent: 'space-between',alignItems: 'center',flex: 'wrap',overflowX: 'auto' }}>
          {
            products.length == 0 ? '' :
            products.map((product,index) => (
              <div key={index} style={{ padding: '10px' }}>
                {
                  product.category === "Agricultural services" || product.category === "Farm Produce" ? '' :
                  <div style={{ height: '150px',width: '100px' }}>
                  <h6>{product.productname}</h6>
                  <Link to=""><img className="img-fluid" src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${product.coverphoto}`}/></Link>
                  </div>
                }   
              </div>  
            )
            )
          }
        </div>
      </div>
      <div className="FarmServices">
        <h3 className="text-center">Agricultural services</h3>
        <div style={{ display: 'flex',justifyContent: 'space-between',alignItems: 'center',flex: 'wrap',overflowX: 'auto' }}>
          {
            products.length == 0 ? '' :
            products.map((product,index) => (
              <div key={index} style={{ padding: '10px' }}>
                {
                  product.category === "Farm Produce" || product.category === "Farm Inputs" ? '' :
                  <div style={{ height: '150px',width: '100px' }}>
                  <h6>{product.service}</h6>
                  <Link to=""><img className="img-fluid" src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${product.coverphoto}`}/></Link>
                  </div>
                }   
              </div>  
            )
            )
          }
        </div>
      </div>
      </div>
<Footer/>
</div>
   </div>
    
  );
} 

export default MarketPage;
