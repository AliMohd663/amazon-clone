import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import styles from './Product.module.css'
function Product() {
    const [products, setProducts] = useState([])

    useEffect(() => {

        axios.get('https://fakestoreapi.com/products')
            .then((response) => {
                // console.log(response)
                setProducts(response.data)
                // console.log(response.data)
            }).catch((Error)=>{
                console.log(Error)
            })
    }, [])

    return (
        <section className={styles.product__container}>

           {
            products.map((singleProduct)=>{
              return  <ProductCard product={singleProduct}  key={singleProduct.id}/>
            })
           }
        </section>
    )
}

export default Product
