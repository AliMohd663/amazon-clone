import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import styles from './Product.module.css'
import Loader from '../Loader/Loader'


function Product() {
    const [products, setProducts] = useState([])
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
        // setisLoading(true)
        axios.get('https://fakestoreapi.com/products')
            .then((response) => {
                setProducts(response.data)
                setisLoading(false)
            }).catch((Error) => {
                console.log(Error)
                setisLoading(false)
            })
    }, [])

    return (

        <>

            {
                isLoading ? (<Loader />) : (<section className={styles.product__container}>

                    {
                        products.map((singleProduct) => {
                            return <ProductCard product={singleProduct} key={singleProduct.id} />
                        })
                    }
                </section>)
            }






        </>

    )
}

export default Product
