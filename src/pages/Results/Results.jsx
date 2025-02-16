import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productURL } from '../../API/endpoint'
import ProductCard from '../../Components/Product/ProductCard'
import styles from './results.module.css'


function Results() {
  const  [results, setResults] = useState([])
   const { categoryName } = useParams()
    
   useEffect(() =>{

    axios.get(`${productURL}/products/category/${categoryName}`)
    .then((response) =>{
      setResults(response.data)
      console.log(response.data)
    }).catch((error) =>{
      console.log(error)
    })
   }, [categoryName])

  
  return (
    <LayOut>
      
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>categoryName /{categoryName}</p>
        <hr />
        <div className={styles.products__container}>
          {results.map((product) => (
            <ProductCard
              key={product?.id}
              product={product}
            />
          ))}
        </div>
      </section>

    </LayOut>
  )
}

export default Results
