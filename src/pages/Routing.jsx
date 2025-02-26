import React from 'react'
import { BrowserRouter as Router, Routes, Route, redirect } from "react-router-dom";
import Landing from './Landing/Landing'
import Payments from './Payment/Payment'
import Orders from './Orders/Orders'
import Cart from './Cart/Cart'
import Results from './Results/Results';
import ProductDetails from './ProductDetails/ProductDetails'
import Auth from './Auth/Auth';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRoute from '../Components/ProtectedRoute/ProtectedRoute';
const stripePromise = loadStripe('pk_test_51QtQ4FK5u6xqUGGrbbdfiYqoYr7JLZmiFKu9RmZ43J6RhIj5G2Xf7Okz7nsIFc1rtuz7r0KdEZnNabpHKmwlZ59E00tfqJleKV');

function Routing() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<Auth />} />

        <Route path='/payments' element={
          <ProtectedRoute msg={"you must login to pay"} redirect={"/payments"}>
            <Elements stripe={stripePromise}>
              <Payments />
            </Elements>
          </ProtectedRoute>
        } />


        <Route
          path='/orders'
          element={
            <ProtectedRoute
              msg={"you must login to see your orders"}
              redirect={"/orders"}>

              <Orders />

            </ProtectedRoute>

          } />



        <Route path='/category/:categoryName' element={<Results />} />

        <Route path='/products/:productId' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />

      </Routes>
    </Router>
  )
}

export default Routing
