import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './Landing/Landing'
import Signup from '../pages/Auth/Signup/'
import Payments from './Payment/Payment'
import Orders from './Orders/Orders'
import Cart from './Cart/Cart'
import Results from './Results/Results';

function Routing() {
  return (
    <Router>
      <Routes>
        
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<Signup />} />
        <Route path='/payments' element={<Payments />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/category/:categoryName' element={<Results/>}/>
      </Routes>
    </Router>
  )
}

export default Routing
