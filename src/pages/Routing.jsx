import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './Landing/Landing'
import Payments from './Payment/Payment'
import Orders from './Orders/Orders'
import Cart from './Cart/Cart'
import Results from './Results/Results';
import ProductDetails from './ProductDetails/ProductDetails'
import Auth from './Auth/Auth';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function Routing() {


  const stripePromise = loadStripe('pk_test_51QtQ4FK5u6xqUGGrbbdfiYqoYr7JLZmiFKu9RmZ43J6RhIj5G2Xf7Okz7nsIFc1rtuz7r0KdEZnNabpHKmwlZ59E00tfqJleKV');




  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<Auth />} />

        <Route path='/payments' element={



          <Elements stripe={stripePromise}>
            <Payments />
          </Elements>
        } />
        <Route path='/orders' element={<Orders />} />
        <Route path='/category/:categoryName' element={<Results />} />

        <Route path='/products/:productId' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />

      </Routes>
    </Router>
  )
}

export default Routing
