import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productURL } from '../../API/endpoint'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'


function ProductDetails() {

  const { productId } = useParams()
  const [product, setProduct] = useState({})
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    setisLoading(true)
    axios.get(`${productURL}/products/${productId}`)
      .then((res) => {
        setProduct(res.data)
        setisLoading(false)
      }).catch((err) => {
        console.log(err)
        setisLoading(false)
      })


  }, [])




  return (
    <LayOut>

      {isLoading ? (<Loader />) : (<ProductCard

        product={product}
        
        flex = {true}
        renderDesc = {true}

      />)}

    </LayOut>
  )
}

export default ProductDetails
