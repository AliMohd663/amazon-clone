import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productURL } from '../../API/endpoint'
import ProductCard from '../../Components/Product/ProductCard'


function ProductDetails() {

  const { productId } = useParams()
  const [product, setProduct] = useState({})

  useEffect(() => {
    axios.get(`${productURL}/products/${productId}`)
      .then((res) => {
        setProduct(res.data)
      }).catch((err) => {
        console.log(err)
      })


  }, [])




  return (
    <LayOut>
      <ProductCard
      
      product={product}
      
      />
    </LayOut>
  )
}

export default ProductDetails
